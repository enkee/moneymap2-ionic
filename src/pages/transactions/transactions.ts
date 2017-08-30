import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {Transaction} from '../../database';
import {AddingPage} from '../adding/adding';
import {WalletService} from '../../services/wallets.service';
import {TransactionService} from '../../services/transactions.service';
/**
 * Generated class for the TransactionsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class TransactionsPage {

  title : string = "Movimientos";
  transactions : any;
  addingPage = AddingPage;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private walletService : WalletService, private transactionService : TransactionService) {
  }
//Refesca la vista y se muestra las nuevas transacciones
  ionViewWillEnter() {
   if(this.walletService.empty()){
     this.walletService.validateFirstWallet();
   }

    //this.walletService.validateFirstWallet();
    console.log(this.walletService.getID());

    //let transaction = new Transaction(20,"Primera Transaccion");

    //transaction.save();
    this.loadTransactions();
  }

  loadTransactions(){
    this.transactionService.all()
               .then((resultados) => {
                 this.transactions = resultados
                 console.log(this.transactions);
                });
  }

}
