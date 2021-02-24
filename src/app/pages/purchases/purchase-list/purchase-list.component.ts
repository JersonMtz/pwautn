import { Component } from '@angular/core';
import { HeadBillInterface } from '../../../models/headBill.interface';

@Component({
  selector: 'purchase-list',
  templateUrl: './purchase-list.component.html'
})
export class PurchaseListComponent {

  purchaseLIst:HeadBillInterface[] = [
    {
      id: 'A1',
      salesman: 'User 1',
      date: '2021-02-02',
      provider: 'Proveedor 1',
      tax: 10,
      subTotal: 3000
    },
    {
      id: 'B2',
      salesman: 'User 2',
      date: '2021-02-02',
      provider: 'Proveedor 2',
      tax: 13,
      subTotal: 3002
    },
    {
      id: 'C3',
      salesman: 'User 2',
      date: '2021-02-02',
      provider: 'Proveedor 3',
      tax: 13,
      subTotal: 3003
    }
  ]

  constructor() { }

}
