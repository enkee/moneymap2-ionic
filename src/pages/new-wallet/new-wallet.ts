import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Wallet } from '../../database';

/**
 * Generated class for the NewWalletPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-wallet',
  templateUrl: 'new-wallet.html',
})
export class NewWalletPage {

  model : Wallet = new Wallet(null,"");

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewWalletPage');
  }

  save(){
    this.model.save().then(()=>{
      this.navCtrl.pop();
    });
  }
}
