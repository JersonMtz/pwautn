import { Component, OnDestroy } from '@angular/core';
import { BillInterface } from 'src/app/models/bill.interface';

@Component({
  selector: 'sale-list',
  templateUrl: './sale-list.component.html'
})
export class SaleListComponent implements OnDestroy {

  saleList:BillInterface[] = [
    {
      id: 'A1',
      user: 'User 1',
      date: '2021-02-02',
      client: 'Cliente 1',
      tax: 10,
      subTotal: 2345
    },
    {
      id: 'B2',
      user: 'User 2',
      date: '2021-02-02',
      client: 'Cliente 2',
      tax: 13,
      subTotal: 3234
    },
    {
      id: 'C3',
      user: 'User 3',
      date: '2021-02-02',
      client: 'Cliente 3',
      tax: 13,
      subTotal: 3034
    }
  ]

  constructor() {
    document.getElementById('a-sale').classList.toggle('active');
  }

  ngOnDestroy() {
    document.getElementById('a-sale').classList.toggle('active');
  }

}
