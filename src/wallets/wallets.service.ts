import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosResponse } from 'axios';
import { firstValueFrom, Observable } from 'rxjs';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { FundWalletDto } from './dto/fund.wallet.dto';
import { WalletDto } from './dto/wallet.dto';
import { Wallet } from './entity/wallet.entity';

@Injectable()
export class WalletsService {

    constructor(
        @InjectRepository(Wallet)
        private walletRepository: Repository<Wallet>,
        
        // private userRepository: Repository<User>,
        private readonly httpService: HttpService
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


            let walletDetails =await this.findWalletById(walletDto.walletId)
            if (!walletDetails) {
                throw new BadRequestException("Wallet not found.");
            }




            return {status: true, message:"Pending.", data:walletDto}
            
            
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message)
            }else throw new InternalServerErrorException("An error occur, try again.");
            
        }
    }

    async initFunding(initFund:{amount: number, walletId: number}, userInfo: User){
        try {


            console.log({initFund, userInfo});

            let walletDetails =await this.findWalletById(initFund.walletId)
            if (!walletDetails) {
                throw new BadRequestException("Wallet not found.");
            }

            // Generate link from paystack


            
            return {status: true, message:"Success.", data:initFund}
            
            
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message)
            }else throw new InternalServerErrorException("An error occur, try again.");
            
        }
    }

    async findWalletById(id: number){
      return await this.walletRepository.findOne({where:{id}})
    }
}
