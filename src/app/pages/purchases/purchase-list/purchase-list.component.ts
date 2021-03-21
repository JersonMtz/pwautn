import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { BillInterface } from '@models/bill.interface';
import { AfInventoryService } from '@pages/components/services/afInventory.service';
import { MessagesService } from '@shared/services/messages.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { afAuthService } from '@auth/services/afAuth.service';
import { AfProductService } from '@pages/products/services/afProduct.service';
import { ReportPDFService } from '@shared/services/reportPDF.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.scss'],
  providers: [CurrencyPipe, DatePipe]
})
export class PurchaseListComponent implements AfterViewInit, OnDestroy {

  cols: any;
  private itemHtml: any;
  form: FormGroup;
  billView: BillInterface = {
    date: 0,
    warehouse: '',
    provider: '',
    status: false,
    tax: 0,
    subTotal: 0,
    products: []
  }

  constructor(public afAuth: afAuthService,
    public afPurchase: AfInventoryService,
    private primeng: PrimeNGConfig,
    private afProduct: AfProductService,
    private fb: FormBuilder,
    private popup: MessagesService,
    private pdf: ReportPDFService,
    private currency: CurrencyPipe,
    private datePipe: DatePipe) {
    this.afPurchase.collectionPurchase();
    this.form = this.fb.group({ id: [''], status: [false, Validators.required] });
    this.primeng.ripple = true;
    this.header();
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
  }

  private header() {
    this.cols = [
      { field: 'number', header: 'Factura N°' },
      { field: 'status', header: 'Estado' },
      { field: 'provider', header: 'Proveedor' },
      { field: 'date', header: 'Fecha' },
      { field: 'admin', header: 'Administrador' },
      { field: 'total', header: 'Total' },
    ];
  }

  showBill(bill: BillInterface) {
    this.billView = JSON.parse(JSON.stringify(bill));
    this.form.get('id').setValue(this.billView.id);
    this.form.get('status').setValue(this.billView.status);
  }

  deleteBill(bill: BillInterface) {
    this.popup.smsDelete('registro de compra', 'Recuerde mantener actualizado el stock de productos').then(res => {
      if (res.isConfirmed) {
        this.afPurchase.deletePurchase(bill);
      }
    })
  }

  updateBill() {
    this.popup.smsConfirm('Atención', '¿Desea actualizar el estado del pedido de compra?').then(res => {
      if (res.isConfirmed) {
        this.afPurchase.updatePurchase(this.form.get('id').value, this.form.get('status').value);
        const list = JSON.parse(JSON.stringify(this.billView.products));
        this.afProduct.updateStock(list);
        this.billView.status = true;
      }
    })
  }

  PDF() {
    const data = this.transform();
    this.pdf.createPDF(data);
  }

  ticket() {
    const data = this.transform();
    this.pdf.createTicket(data);
  }

  message(): string {
    if (!this.form.get('status').value) {
      return '<span class="alert-warning p-2 rounded animate__animated animate__fadeIn">Pedido pendiente</span>'
    } else {
      return '<span class="alert-success p-2 rounded animate__animated animate__fadeIn">Pedido procesado</span>'
    }
  }

  calculeTotal(sub: number, tax: number): number {
    return sub + (sub * (tax / 100));
  }

  /* FORMAT FOR CONVERT BILL FOR JSON -> PDF */
  private transform(): {} {
    let obj = {
      num: this.billView.date,
      buyer: this.billView.user,
      warehouse: this.billView.warehouse,
      provider: this.billView.provider,
      status: this.billView.status,
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
