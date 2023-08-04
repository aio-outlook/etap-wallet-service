import { Injectable } from '@nestjs/common';

@Injectable()
export class PaystackService {

    constructor(){}

    init(){}

    verifyPaymentReference(reference: string){
        return true
    }

    chargeCard(){}

    generatePaymentUrl(){}
}
