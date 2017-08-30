import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewWalletPage } from './new-wallet';

@NgModule({
  declarations: [
    NewWalletPage,
  ],
  imports: [
    IonicPageModule.forChild(NewWalletPage),
  ],
})
export class NewWalletPageModule {}
