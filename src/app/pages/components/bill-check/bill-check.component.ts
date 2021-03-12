import { Component, EventEmitter, Input, OnChanges, Output, OnDestroy } from '@angular/core';
import { ProductInterface } from '@models/product.interface';
import { BillInterface } from '@models/bill.interface';
import { TaxInterface } from '@models/tax.interface';
import { MessagesService } from '@shared/services/messages.service';
import { AfTaxService } from '@pages/taxes/services/afTax.service';
import { Subscription } from 'rxjs';
import { AfInventoryService } from '../services/afInventory.service';

@Component({
  selector: 'bill-check',
  templateUrl: './bill-check.component.html'
})
export class BillCheckComponent implements OnChanges, OnDestroy {

  sub$: Subscription;
  @Input('head') bill: BillInterface;
  @Input('add') product: ProductInterface;
  @Output() delete: EventEmitter<ProductInterface> = new EventEmitter();

  taxList: TaxInterface[] = [];
  listProduct: ProductInterface[] = [];

  constructor(private afTax: AfTaxService,
    private afInventary: AfInventoryService,
    private popup: MessagesService) {
    this.sub$ = this.afTax.onTaxes().subscribe(list => this.taxList = list);
  }

  ngOnChanges() {
    this.addProductList();
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }

  deleteProduct(index: number, product: ProductInterface) {
    this.popup.deleteProductBill(product.name).then(resp => {
      if (resp.isConfirmed) {
        this.delete.emit(product);
        this.listProduct.splice(index, 1);
        this.calculeSubTotal();
      }
    })
  }

  private addProductList() {
    if (this.product) {
      if (!this.verifyProduct()) {
        this.listProduct.push(this.product);
      }
      this.calculeSubTotal();
    }
  }

  private verifyProduct(): boolean {
    if (this.listProduct.length > 0) {
      for (let item of this.listProduct) {
        if (item.id === this.product.id && item.price === this.product.price) {
          item.amount += this.product.amount;
          item.total += this.product.total;
          return true;
        }
      }
    }
    return false;
  }

  private calculeSubTotal() {
    let result: number = 0;
    if (this.listProduct) {
      this.listProduct.forEach(item => {
        result += item.total;
      });
    }
    this.bill.subTotal = result;
  }

  onChangeTax(value: number) {
    this.bill.tax = Number(value);
    this.calculeSubTotal();
  }

  calculeTotal(): number {
    return this.bill.subTotal + (this.bill.subTotal * (this.bill.tax / 100));
  }

  billValid(): boolean {
    if (this.listProduct.length > 0 && this.bill.date) {
      if (this.bill.client) {
        return true;
      }
      if (this.bill.warehouse && this.bill.provider) {
        return true;
      }
    }
    return false;
  }

  onSave() {
    if (this.billValid()) {
      this.popup.smsConfirm('Atención', '¿Desea formalizar el pedido?').then(res => {
        if (res.isConfirmed) {
          this.bill.products = this.listProduct;
          if (this.bill.client) {
            console.log('GUARDAR EN SALES');
            this.afInventary.addSale(this.bill);
          } else {
            console.log('GUARDAR EN PURCHASE');
            this.afInventary.addPurchase(this.bill);
          }
        }
      })
    }
  }

}
