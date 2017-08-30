import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Wallet,IWallet } from '../../database';
import { NewWalletPage } from '../new-wallet/new-wallet';
import { WalletService } from '../../services/wallets.service'

/**
 * Generated class for the WalletsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallets',
  templateUrl: 'wallets.html',
})
export class WalletsPage {

  wallets : IWallet[];
  addingPage = NewWalletPage;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              private walletService : WalletService) {
  }

  ionViewWillEnter() {
    console.log(this.walletService.getID());
    Wallet.all().then(results => this.wallets = results);
  }

  set(wallet : Wallet){
    this.walletService.setID(wallet.id);
    console.log(this.walletService.getID());
  }

}
