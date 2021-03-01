import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ProductInterface } from '../../../models/product.interface';
import { BillInterface } from '../../../models/bill.interface';
import { TaxInterface } from '../../../models/tax.interface';
import { MessagesService } from '../../../shared/services/messages.service';

@Component({
  selector: 'bill-check',
  templateUrl: './bill-check.component.html'
})
export class BillCheckComponent implements OnChanges{

  @Input('head') headBill:BillInterface;
  @Input('add') product:ProductInterface;
  @Output() delete:EventEmitter<ProductInterface> = new EventEmitter(); 

  //TODO: Obtener informacion de la bd
  taxList:TaxInterface[] = [
    {
      id: 'tax1',
      name: 'Compra',
      value: 10,
      status: true
    },
    {
      id: 'tax1',
      name: 'Venta',
      value: 13,
      status: true
    }
  ];

  listProduct:ProductInterface[] = [];

  constructor(private popup:MessagesService) { 
    // TODO: CONSULTA DE LOS IMPUESTOS A FIREBASE
  }

  ngOnChanges() {
    this.addProductList();
  }

  deleteProduct(index:number, product:ProductInterface) {
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

  private verifyProduct():boolean {
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
    let result:number = 0;
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

  onChangeTax(value:number) {
    this.headBill.tax = Number(value);
    this.calculeSubTotal();
  }

  calculeTotal():number {
    return this.headBill.subTotal + (this.headBill.subTotal *(this.headBill.tax / 100));
  }

  billValid():boolean {
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
