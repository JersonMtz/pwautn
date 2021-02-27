import { Component, OnDestroy } from '@angular/core';
import { BillInterface } from '../../../models/bill.interface';

@Component({
  selector: 'purchase-list',
  templateUrl: './purchase-list.component.html'
})
export class PurchaseListComponent implements OnDestroy {

  purchaseLIst:BillInterface[] = [
    {
      id: 'A1',
      user: 'User 1',
      date: '2021-02-02',
      provider: 'Proveedor 1',
      tax: 10,
      subTotal: 3000
    },
    {
      id: 'B2',
      user: 'User 2',
      date: '2021-02-02',
      provider: 'Proveedor 2',
      tax: 13,
      subTotal: 3002
    },
    {
      id: 'C3',
      user: 'User 2',
      date: '2021-02-02',
      provider: 'Proveedor 3',
      tax: 13,
      subTotal: 3003
    }
  ]

  constructor() { 
    document.getElementById('a-purchase').classList.toggle('active');
  }

  ngOnDestroy() {
    document.getElementById('a-purchase').classList.toggle('active');
  }

}
