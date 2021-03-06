import Dexie from 'dexie';


export class TransactionAppDB extends Dexie{
    transactions : Dexie.Table<ITransaction,number>;
    wallets : Dexie.Table<IWallet, number>;
    constructor(){
        super("MoneyMapAppDB");

        this.version(1).stores({
            transactions: '++id,amount,lat,lng,title,imageUrl',
        });
        this.version(2).stores({
            transactions: '++id,amount,lat,lng,title,imageUrl',
            wallets : '++id, amount, name'
        });
        this.version(3).stores({
            transactions: '++id,amount,lat,lng,title,imageUrl,walletId',
            wallets : '++id, amount, name'
        });
        //convierte todos los registros query a una clase de su tipo.
        this.transactions.mapToClass(Transaction);
        this.wallets.mapToClass(Wallet);
    }
}

export interface ICategory{

}

export interface IWallet{
    id?: number;
    amount: number;
    name : string;
}

export interface ITransaction{
    id?: number;
    amount: number;
    lat: number;
    lng: number;
    title: string;
    imageUrl: string;
    walletId: number;
}

export class Wallet implements IWallet{
    id?: number;
    amount: number;
    name : string;

    constructor(amount : number, name : string, id? : number){
        this.amount = amount;
        this.name = name;
        if(id) this.id = id;
    }

    save(){
        return db.wallets.add(this);
    }

    static first(){
        return db.wallets.orderBy("id").limit(1).first();
    }

    static createFirst(){
        let wallet = new Wallet(0,"Mi primera cartera");

        return wallet.save();
    }

    static all(){
        return db.wallets.orderBy("id").toArray();
    }
}

export class Transaction implements ITransaction{
    id?: number;
    amount: number;
    lat: number;
    lng: number;
    title: string;
    imageUrl: string;
    walletId: number;

    constructor(amount:number, title:string, lat?: number, lng?:number,
                id?:number, imageUrl?: string, walletId?: number){
        this.amount = amount;
        this.title = title;

        if(lat) this.lat = lat;
        if (lng) this.lng = lng;
        if(imageUrl) this.imageUrl = imageUrl;
        if(id) this.id = id;
        if(walletId) this.walletId = walletId;
    }
    //Guarda transaccion
    save(){
        return db.transactions.add(this);
    }

    setCoords(coords){
        this.lat = coords.latitude;
        this.lng = coords.longitude;
    }

    getImage():string{
        if(this.imageUrl)
            return this.imageUrl;
        return "blue";
    }

    hasLocation():boolean{
        return !!(this.lat && this.lng);
    }

    cleanCoords(){
        this.lat = null;
        this.lng = null;
    }

    //Devuelve todas las transacciones
    //Retorna un Promise
    static all(walletID){
        console.log("titulais");
        return db.transactions
                 .where("walletId")
                 .equals(walletID)
                 .reverse()
                 .toArray();
    }
}

export let db = new TransactionAppDB();

//Wallet.createFirst();