import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosResponse } from 'axios';
import { time } from 'console';
import { firstValueFrom, Observable } from 'rxjs';
import { PaystackService } from 'src/paystack/paystack.service';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { FundWalletDto } from './dto/fund.wallet.dto';
import { InitFundWalletDto } from './dto/initfund.wallet.dto';
import { WalletDto } from './dto/wallet.dto';
import { Wallet } from './entity/wallet.entity';
import { TransactionStatus, TransactionType, WalletTransaction } from './entity/wallet.transaction.entity';

@Injectable()
export class WalletsService {

    constructor(
        @InjectRepository(Wallet)
        private walletRepository: Repository<Wallet>,
        @InjectRepository(WalletTransaction)
        private walletTrsansactionRepository: Repository<WalletTransaction>,
        private readonly httpService: HttpService,
        private readonly paystackService: PaystackService
        ){}

    async createWallet(walletDto: WalletDto, userInfo: User){

        try {

            let checkWallet=await this.walletRepository.find({ where: { currency:walletDto.currency, user:{id:userInfo.id} } })

            console.log({checkWallet});

            if(checkWallet && checkWallet.length>0){
                throw new BadRequestException("Wallet already exist.");        
            }
            
            let walletObject= new Wallet();
            walletObject.currency=walletDto.currency;
            
            walletObject.userId=userInfo.id;

            let wallet=await this.walletRepository.save(walletObject)
            
            return {
                status:true,
                message: "success.",
                data:wallet
            }
        } catch (error) {
            console.log("error", error);
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message)
            }else throw new InternalServerErrorException("An error occur, try again.");
            
        }
    }
  async  getWallets(userInfo:User){
        let wallets=await this.walletRepository.find({ where: { user:{id:userInfo.id} } })
        return {
            status: true,
            message: "Wallets",
            data: wallets
        }
    }
    async getCurrencyList(): Promise<any>{
        try {
            let {data}=await firstValueFrom (this.httpService.get(`${process.env.OPEN_EXCHANGE_RATES_URL}currencies.json`));
            console.log({currencies: data});

            let newData=[];
            for (const [key, value] of Object.entries(data)) {
                newData.push({
                    key:key,
                    name:value
                })
              }
            return {status: true, statusCode: 200, message: "success", data:newData}
            
        } catch (error) {
            console.log(error); 
        }
    }
    getWallet(){}

    async fundWallet(walletDto: FundWalletDto, userInfo: User){
        try {


            console.log({walletDto, userInfo});
            // Validate paystack payment reference


            let walletDetails =await this.findUserWalletById(walletDto.walletId, userInfo.id)
            if (!walletDetails) {
                throw new BadRequestException("Wallet not found.");
            }

            let transaction =await this.walletTrsansactionRepository.findOne({where:{
                paymentReference:walletDto.poyment_reference
            }})
            if (!transaction) {
                throw new BadRequestException("Transaction does not exist found.");
            }

            if (transaction.status===TransactionStatus.PENDING) {
                // check paystack
                // if   trnx  not exist success on paystack
                throw new BadRequestException("Invalid payment reference.");

            }


            // this.walletTrsansactionRepository.save()



            return {status: true, message:"Pending.", data:walletDto}
            
            
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message)
            }else throw new InternalServerErrorException("An error occur, try again.");
            
        }
    }

    async initFunding(initFund:InitFundWalletDto, userInfo: User){
        try {

            let walletDetails =await this.findUserWalletById(initFund.walletId, userInfo.id)
            if (!walletDetails) {
                throw new BadRequestException("Wallet not found.");
            }

            let transactionRef=`FUNDWALLET_${(Math.random() + 1).toString(36)}`;

            let walletTransaction= new WalletTransaction();
            walletTransaction.amount=initFund.amount;
            walletTransaction.userId=userInfo.id;
            walletTransaction.wallerId=initFund.walletId;
            walletTransaction.paymentReference=transactionRef;
            walletTransaction.transactionType=TransactionType.CREDIT;

            
            // Generate link from paystack
            let url= this.paystackService.generatePaymentUrl(initFund)
            
            this.walletTrsansactionRepository.save(walletTransaction)
            
            let response={
                status: true, message:"Success.",
                data:{
                    ...initFund,
                    transactionRef,
                    authorised_payment_url:url

                }
            }

            return response
            
            
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message)
            }else throw new InternalServerErrorException("An error occur, try again.");
            
        }
    }

    async findUserWalletById(id: number, userId: number){
      return await this.walletRepository.findOne({where:{id, user:{ id: userId}}})
    }
}
