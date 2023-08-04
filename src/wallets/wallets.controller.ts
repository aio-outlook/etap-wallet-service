import { Body, Controller, Get, Param, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FundWalletDto } from './dto/fund.wallet.dto';
import { WalletDto } from './dto/wallet.dto';
import { WalletsService } from './wallets.service';

@ApiTags('Wallet')
@ApiBearerAuth('access-token')
@Controller('wallets')
export class WalletsController {

    constructor(private readonly walletService: WalletsService ){}
    

    @UseGuards(AuthGuard("jwt"))
    @Post('create')
    async createWallet(@Body() walletDto:WalletDto, @Request() req){
       return this.walletService.createWallet(walletDto, req.user)
    }

    @UseGuards(AuthGuard("jwt"))
    @Get()
    getWallets(@Request() req){
        return this.walletService.getWallets(req.user)
    }

    @UseGuards(AuthGuard("jwt"))
    @Post("fund")
    fundWalet(@Body() walletDto:FundWalletDto,  @Request() req){
        return this.walletService.fundWallet(walletDto, req.user)
    }
    @UseGuards(AuthGuard("jwt"))
    @Get()
    walletToWalletTransfer(){
        return "Wallets!"
    }

    @Get("currencies")
    getCurrencies(){
        return this.walletService.getCurrencyList()
    }


    @UseGuards(AuthGuard("jwt"))
    @Get(':id')
    getWallet(@Param("id") id: string){
        return "Wallet!"
    }


}
