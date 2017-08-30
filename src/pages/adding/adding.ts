import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Transaction } from '../../database';
import { GeolocationService } from '../../services/geolocation.service'
import { Camera, CameraOptions } from '@ionic-native/camera';
import { WalletService } from '../../services/wallets.service'

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
  imageData : string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public geolocator: GeolocationService, private camera: Camera,
              private walletService: WalletService) {
  }

  ionViewCanEnter() {
    this.model = this.cleanTransaction();
    console.log("About to get location");
  }

  getPhoto(){
    let cameraOptions : CameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100
    }
    
    this.camera.getPicture(cameraOptions).then((imageData) => {
      //Imagen pero en base64
      let base64Image = 'data:image/jpeg;base64,'+imageData;
      
      this.imageData = base64Image;

      this.model.imageUrl = this.imageData;
      
    }).catch(err => console.log(err));
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
      this.model = this.cleanTransaction();
      this.navCtrl.pop();
    });
    }
  }

  cleanTransaction() : Transaction{
    let transaction = new Transaction(null,"");

    transaction.walletId = this.walletService.getID();

    return transaction;
  }

}
