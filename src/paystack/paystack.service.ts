import { Injectable } from '@nestjs/common';
import { InitFundWalletDto } from 'src/wallets/dto/initfund.wallet.dto';

@Injectable()
export class PaystackService {

    constructor(){}

    init(){}

    verifyPaymentReference(reference: string){
        return true
    }

    chargeCard(){}
    
    callbackGateway(){}

    generatePaymentUrl(initFund: InitFundWalletDto){

        // generate paystack url

        return `https://checkout.paystack.com/8uy2vevquw6osyi`
    }
}
