import { Component, EventEmitter, Input, OnChanges, Output, OnDestroy } from '@angular/core';
import { ProductInterface } from '@models/product.interface';
import { BillInterface } from '@models/bill.interface';
import { TaxInterface } from '@models/tax.interface';
import { MessagesService } from '@shared/services/messages.service';
import { AfTaxService } from '../../taxes/services/afTax.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bill-check',
  templateUrl: './bill-check.component.html'
})
export class BillCheckComponent implements OnChanges, OnDestroy {

  sub$: Subscription;
  @Input('head') headBill: BillInterface;
  @Input('add') product: ProductInterface;
  @Output() delete: EventEmitter<ProductInterface> = new EventEmitter();

  taxList: TaxInterface[] = [];
  listProduct: ProductInterface[] = [];

  constructor(private afTax: AfTaxService, private popup: MessagesService) {
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
    this.headBill.subTotal = result;
  }

  onSave() {
    this.headBill.products = this.listProduct;
    console.log(this.headBill);
  }

  onChangeTax(value: number) {
    this.headBill.tax = Number(value);
    this.calculeSubTotal();
  }

  calculeTotal(): number {
    return this.headBill.subTotal + (this.headBill.subTotal * (this.headBill.tax / 100));
  }

  billValid(): boolean {
    if (this.listProduct.length > 0 && this.headBill.date) {
      if (this.headBill.client) {
        return true;
      }
      if (this.headBill.warehouse && this.headBill.provider) {
        return true;
      }
    }
    return false;
  }

}
