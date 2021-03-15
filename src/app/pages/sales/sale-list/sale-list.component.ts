import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { afAuthService } from '@auth/services/afAuth.service';
import { BillInterface } from '@models/bill.interface';
import { AfInventoryService } from '@pages/components/services/afInventory.service';
import { MessagesService } from '@shared/services/messages.service';

@Component({
  selector: 'sale-list',
  templateUrl: './sale-list.component.html'
})
export class SaleListComponent implements AfterViewInit, OnDestroy {

  private itemHtml: any;
  billView: BillInterface = {
    date: 0,
    client: '',
    tax: 0,
    subTotal: 0,
    products: []
  }

  constructor(public afAuth: afAuthService,
    public afSale: AfInventoryService,
    private popup: MessagesService) {
    this.afSale.collectionSale();
  }

  ngAfterViewInit() {
    this.itemHtml = document.getElementById('a-sale');
    if (this.itemHtml) {
      this.itemHtml.classList.add('active');
    }
  }

  ngOnDestroy() {
    if (this.itemHtml) {
      this.itemHtml.classList.remove('active');
    }
  }

  total(bill: BillInterface): number {
    return bill.subTotal + (bill.subTotal * (bill.tax / 100));
  }

  showBill(bill: BillInterface) {
    this.billView = JSON.parse(JSON.stringify(bill));
  }

  deleteBill(bill: BillInterface) {
    this.popup.smsDelete('registro de venta', 'Recuerde mantener actualizado el stock de productos').then(res => {
      if (res.isConfirmed) {
        this.afSale.deleteSale(bill);
      }
    })
  }

  calculeTotal(sub: number, tax: number): number {
    return sub + (sub * (tax / 100));
  }

}
