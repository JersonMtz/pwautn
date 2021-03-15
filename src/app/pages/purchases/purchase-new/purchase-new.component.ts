import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { BillInterface } from '@models/bill.interface';
import { ProductInterface } from '@models/product.interface';
import { ProviderInterface } from '@models/provider.interface';
import { WarehouseInterface } from '@models/warehouse.interface';
import { AfWarehouseService } from '@pages/warehouses/services/afWarehouse.service';
import { afAuthService } from '@auth/services/afAuth.service';
import { AfProviderService } from '@pages/providers/services/afProvider.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'purchase-new',
  templateUrl: './purchase-new.component.html',
  providers: [DatePipe]
})
export class PurchaseNewComponent implements  AfterViewInit,OnDestroy {

  private itemHtml: any;
  private sub$: Subscription[] = [];
  @ViewChild('date_bill', { static: true }) dateHTML: ElementRef;
  change: boolean = true;
  product: ProductInterface;
  providerList: ProviderInterface[] = [];
  warehouseList: WarehouseInterface[] = [];
  headBill: BillInterface = {
    user: '',
    date: 0,
    status: false,
    warehouse: '',
    provider: '',
    tax: 0,
    subTotal: 0
  }

  constructor(private afAuth: afAuthService,
    private datepipe: DatePipe,
    private afWarehouse: AfWarehouseService,
    private afProvider: AfProviderService) {
    this.sub$.push(this.afAuth.user$.subscribe(user => this.headBill.user = user.name));
    this.sub$.push(this.afWarehouse.onWarehouse().subscribe(list => this.warehouseList = list));
    this.sub$.push(this.afProvider.list().subscribe(list => this.providerList = list));
  }

  ngOnInit() {
    this.initBill();
  }

  ngAfterViewInit() {
    this.itemHtml = document.getElementById('a-purchase');
    if (this.itemHtml) {
      this.itemHtml.classList.add('active');
    }
  }

  ngOnDestroy() {
    if (this.itemHtml) {
      this.itemHtml.classList.remove('active');
    }
    this.sub$.forEach(item => item.unsubscribe());
  }

  /*** Listenner change option ***/
  updateDate(value: string) {
    let date = new Date(value).getTime() + 21600000 + (new Date().getHours() * 3600000) + (new Date().getMinutes() * 60000) + (new Date().getSeconds() * 1000)
    this.headBill.date = date;
  }

  updateProvider(value: string) {
    this.headBill.provider = value;
  }

  updateWarehouse(value: string) {
    this.headBill.warehouse = value;
  }

  updateStatus(value: boolean) {
    this.headBill.status = value;
  }

  initBill() {
    this.dateHTML.nativeElement.value = this.datepipe.transform(Date.now(), 'yyyy-MM-dd');
    this.headBill.date = Date.now();
    this.headBill.tax = 0;
    this.headBill.subTotal = 0;
  }
}
