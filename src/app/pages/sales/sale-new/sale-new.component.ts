import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { BillInterface } from '@models/bill.interface';
import { ClientInterface } from '@models/client.interface';
import { ProductInterface } from '@models/product.interface';
import { Subscription } from 'rxjs';
import { afAuthService } from '@auth/services/afAuth.service';
import { AfClientService } from '@pages/clients/services/afClient.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'sale-new',
  templateUrl: './sale-new.component.html',
  providers: [DatePipe]
})
export class SaleNewComponent implements OnDestroy {

  private itemHtml: any;
  private sub$: Subscription[] = [];
  @ViewChild('date_bill', { static: true }) dateHTML: ElementRef;
  change: boolean = true;
  product: ProductInterface;
  deleteProduct: ProductInterface;
  listClient: ClientInterface[] = [];
  headBill: BillInterface = {
    user: '',
    date: 0,
    client: '',
    tax: 0,
    subTotal: 0
  }

  constructor(private afAuth: afAuthService,
    private datepipe: DatePipe,
    private afClient: AfClientService) {
    this.sub$.push(this.afAuth.user$.subscribe(user => this.headBill.user = user.name));
    this.sub$.push(this.afClient.list().subscribe(list => this.listClient = list));
  }

  ngOnInit() {
    this.initBill();
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
    this.sub$.forEach(item => item.unsubscribe());
  }

  /*** Listenner change option ***/
  updateDate(value: string) {
    let date = new Date(value).getTime() + 21600000 + (new Date().getHours() * 3600000) + (new Date().getMinutes() * 60000) + (new Date().getSeconds() * 1000);
    this.headBill.date = date;
  }

  clientSelect(cliente: ClientInterface) {
    this.headBill.client = `${cliente.name} ${cliente.surname}`;
  }

  initBill() {
    this.dateHTML.nativeElement.value = this.datepipe.transform(Date.now(), 'yyyy-MM-dd');
    this.headBill.date = Date.now();
    this.headBill.subTotal = 0;
    this.headBill.client = '';
  }
}
