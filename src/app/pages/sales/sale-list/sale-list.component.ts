import { CurrencyPipe, DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { afAuthService } from '@auth/services/afAuth.service';
import { BillInterface } from '@models/bill.interface';
import { AfInventoryService } from '@pages/components/services/afInventory.service';
import { MessagesService } from '@shared/services/messages.service';
import { ReportPDFService } from '@shared/services/reportPDF.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.scss'],
  providers: [DatePipe, CurrencyPipe]
})
export class SaleListComponent implements AfterViewInit, OnDestroy {

  cols: any;
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
    private popup: MessagesService,
    private pdf: ReportPDFService,
    private currency: CurrencyPipe,
    private datePipe: DatePipe,
    private primeng: PrimeNGConfig) {
    this.afSale.collectionSale();
    this.header();
    this.primeng.ripple = true;
  }

  private header() {
    this.cols = [
      { field: 'number', header: 'Factura N°' },
      { field: 'client', header: 'Cliente' },
      { field: 'date', header: 'Fecha' },
      { field: 'buyerman', header: 'Vendedor' },
      { field: 'total', header: 'Total' },
    ];
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

  PDF() {
    const data = this.transform();
    this.pdf.createPDF(data, true);
  }

  ticket() {
    const data = this.transform();
    this.pdf.createTicket(data);
  }

  /* FORMAT FOR CONVERT BILL FOR JSON -> PDF */
  private transform(): {} {
    let obj = {
      num: this.billView.date,
      buyer: this.billView.user,
      client: this.billView.client,
      ...this.formatDateCurrency(),
      tax: this.billView.tax,
      products: this.formatProducts()
    } as any;
    return obj;
  }

  private formatDateCurrency(): {} {
    let obj = {
      date: this.datePipe.transform(this.billView.date, 'dd MMMM YYYY'),
      hour: this.datePipe.transform(this.billView.date, 'h:mm a'),
      sub: this.currency.transform(this.billView.subTotal, ' '),
      total: this.currency.transform(this.calculeTotal(this.billView.subTotal, this.billView.tax), ' ')
    } as any;
    return obj;
  }

  private formatProducts(): [] {
    let list: any = JSON.parse(JSON.stringify(this.billView.products))
    list.forEach(element => {
      element.total = this.currency.transform(element.price * element.amount, ' ');
      element.price = this.currency.transform(element.price, ' ');
      delete element.code;
      delete element.id;
    });

    return list;
  }

}
