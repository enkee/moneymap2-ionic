import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Transaction } from '../../database';

/**
 * Generated class for the AddingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adding',
  templateUrl: 'adding.html',
})
export class AddingPage {
  model : Transaction;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewCanEnter() {
    this.model = new Transaction(null, "");
  }

  save(){
    //Salva y luego Limpia
    this.model.save().then(result => {
      //Restablece formulario
      this.model = new Transaction(null, "");
    //Usamos el metodo pop del servicio navCtrl 
    this.navCtrl.pop();
    });
  }

}
