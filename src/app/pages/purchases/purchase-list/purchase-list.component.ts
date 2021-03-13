import { Component, OnDestroy } from '@angular/core';
import { BillInterface } from '@models/bill.interface';
import { AfInventoryService } from '@pages/components/services/afInventory.service';
import { MessagesService } from '@shared/services/messages.service';

@Component({
  selector: 'purchase-list',
  templateUrl: './purchase-list.component.html'
})
export class PurchaseListComponent implements OnDestroy {

  billView:BillInterface = {
    date: 0,
    warehouse: '',
    provider: '',
    status: false,
    tax: 0,
    subTotal: 0,
    products: []
  }

  constructor(public afPurchase: AfInventoryService, 
    private popup:MessagesService) {
    document.getElementById('a-purchase').classList.toggle('active');
    this.afPurchase.collectionPurchase();
  }

  ngOnDestroy() {
    document.getElementById('a-purchase').classList.toggle('active');
  }

  showBill(bill :BillInterface) {
    this.billView = bill;
  }

}
