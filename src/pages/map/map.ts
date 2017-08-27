import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent, LatLng, GoogleMapOptions, MarkerOptions } from '@ionic-native/google-maps';
import { GeolocationService } from '../../services/geolocation.service';
import { Transaction } from '../../database';
/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  // Se crea una instancia del mapa vacio
  map: GoogleMap = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocator : GeolocationService) {
  }

  ionViewDidEnter() {
    //Encontrar ubicacion del usuario para centrar ahi el mapa.
    this.geolocator.get().then((result)=>{
      // Cargar mapa.
      this.loadMap(result.coords.latitude, result.coords.longitude);
    }).catch((err) => console.log(err));
  }

  loadMarkers(){
    //se consiguen todas las transacciones y luego se pasa a otra funcion para crear las marcas.
    Transaction.all().then((results) => this.loadTransactionMarkers(results));
  }

  loadTransactionMarkers(transactions){
    //Se crean las marcas de google de cada transaccion
    for(var i = 0; i< transactions.length; ++i){
      let transaction = transactions[i];

     if(!transaction.hasLocation()) continue;

      let markerLocation : LatLng = new LatLng(transaction.lat, transaction.lng);

      let markerOptions : MarkerOptions = {
        position: markerLocation,
        title: transaction.title,
        icon: transaction.getImage()
      }
      //Agrega el marcador al mapa
      this.map.addMarker( markerOptions ).then((marker: MarkerOptions) => {
        marker.infoWindowAnchor
      }).catch(err => console.log(err));
    }
  }

  loadMap(lat, lng){
    let location : LatLng = new LatLng(lat, lng);

    this.map = new GoogleMap("map",{
      'controls':{
        'compass': true,
        'myLocationButton': true,
        'indoorPicker': true,
        //'mapToolbar': true
      },
      'gestures': {
        'scroll': true,
        'tilt': true,
        'rotate': true,
        'zoom': true
      },
      'camera': {
        'target': location,
        'tilt': 30,
        'zoom': 50,
        'bearing': 50
      }
    });
    //Luego que el mapa termino de cargare entonces recien cargar los marcadores
    this.map.on( GoogleMapsEvent.MAP_READY ).subscribe(() => this.loadMarkers())
  }
}
