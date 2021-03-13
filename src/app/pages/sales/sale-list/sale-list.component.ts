import { Component, OnDestroy } from '@angular/core';
import { BillInterface } from '@models/bill.interface';
import { AfInventoryService } from '@pages/components/services/afInventory.service';
import { MessagesService } from '@shared/services/messages.service';

@Component({
  selector: 'sale-list',
  templateUrl: './sale-list.component.html'
})
export class SaleListComponent implements OnDestroy {

  billView: BillInterface = {
    date: 0,
    client: '',
    tax: 0,
    subTotal: 0,
    products: []
  }

  constructor(public afSale: AfInventoryService,
    private popup: MessagesService) {
    document.getElementById('a-sale').classList.toggle('active');
    this.afSale.collectionSale();
  }

  ngOnDestroy() {
    document.getElementById('a-sale').classList.toggle('active');
  }

  total(bill: BillInterface): number {
    return bill.subTotal + (bill.subTotal * (bill.tax / 100));
  }

  showBill(bill: BillInterface) {
    this.billView = bill;
  }

}
