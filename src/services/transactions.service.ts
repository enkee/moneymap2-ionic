import { Injectable } from "@angular/core";
import { Transaction } from "../database";
import { WalletService } from "./wallets.service";

@Injectable()

export class TransactionService{
    constructor(private walletService : WalletService){

    }

    all() : any{
        //console.log(this.walletService.getID());
        return Transaction.all(this.walletService.getID());
    }
    
}
