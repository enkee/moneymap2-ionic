import { Component } from '@angular/core';

import { MapPage } from '../map/map';
import { ContactPage } from '../contact/contact';
import { TransactionsPage } from '../transactions/transactions';
import { WalletsPage } from '../wallets/wallets';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = TransactionsPage;
  tab2Root = MapPage;
  tab3Root = WalletsPage;

  constructor() {

  }
}
