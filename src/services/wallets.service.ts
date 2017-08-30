import { Injectable } from "@angular/core";
import { Wallet } from "../database";
import { Storage } from '@ionic/storage';

//Declaramos el identificador para LocalStorage
export const StorageKey = "walletID";

@Injectable()

export class WalletService{

    constructor(private storage: Storage) { }

    setID(walletID){
        localStorage.setItem(StorageKey, walletID);
    }
    
    getID() : number{
        
        return parseInt(localStorage.getItem(StorageKey));
    }

    empty() : boolean {
        return !localStorage.getItem(StorageKey);
    }

    validateFirstWallet(){
        //Promesa que se retornara
        return new Promise((resolve, reject)=>{
            //Busqueda de la primera cartera
            Wallet.first().then((wallet)=>{
                //Se cumple la promesa de buscar la 1er cartera
                if(!wallet){
                    //crear primera cartera
                    Wallet.createFirst().then((resultado)=>{
                        //Promesa de crear la 1er cartera se cumpla
                        console.log("Creamos la 1er cartera");
                        //Guardamos el reusltado obtenido
                        this.setID(resultado);
                        resolve();
                    })
                }else{
                    console.log("Ya habia una cartera");
                    //Guardamos el Id del wallet en Local
                    this.setID(wallet.id);
                    resolve();
                }
            });
        })
    }
}
