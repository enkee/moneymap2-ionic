import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Transaction } from '../../database';
import { GeolocationService } from '../../services/geolocation.service'

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
  shouldGeolocate : boolean = false;
  shouldSend : boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocator: GeolocationService) {
  }

  ionViewCanEnter() {
    this.model = new Transaction(null, "");
    console.log("About to get location");
  }

  getPhoto(){
    console.log("vamos a tomar una foto");
  }

  getLocation(){
    if(this.shouldGeolocate){
      this.shouldSend = false;
      this.geolocator.get().then((resultado)=>{
        this.model.setCoords(resultado.coords);
        console.log(this.model);
        this.shouldSend = true;
      }).catch((err) => console.log(err));
    }else{
      this.model.cleanCoords();
      console.log(this.model);
    }
  }

  save(){
    if(this.shouldSend = true){
      this.model.save().then(result => {
      //this.model = new Transaction(null,"");   //ya no es necesario por pop
      this.navCtrl.pop();
    });
    }
  }

}
