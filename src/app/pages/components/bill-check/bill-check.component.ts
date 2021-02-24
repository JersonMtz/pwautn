import { Component, Input } from '@angular/core';
import { ProductInterface } from '../../../models/product.interface';
import { HeadBillInterface } from '../../../models/headBill.interface';
import { TaxInterface } from '../../../models/tax.interface';

@Component({
  selector: 'bill-check',
  templateUrl: './bill-check.component.html'
})
export class BillCheckComponent {

  @Input('info') head:HeadBillInterface;
  @Input('add') product:ProductInterface;

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

  listProduct:ProductInterface[] = [
    {
      code: 'ABCD',
      name: 'Arroz',
      amount: 3,
      cost: 1000,
      total:  3000
    },
    {
      code: 'EFGH',
      name: 'Frijoles',
      amount: 3,
      cost: 1000,
      total:  3000
    },
    {
      code: 'IJKL',
      name: 'Jabon',
      amount: 3,
      cost: 1000,
      total:  3000
    }
  ]

  constructor() { }


  addProductList() {
    this.product.total = this.product.cost * this.product.amount;
    this.listProduct.push(this.product);
  }

  
  onChangeTax(value:number) {
    this.head.tax = Number(value);
    this.calculeTotal();
  }

  calculeSubTotal():number {
    let result:number = 0;
    this.listProduct.forEach(item => {
      result += item.total;
    });
    this.head.subTotal = result;
    return result;
  }

  //TODO: Realizar los calculos por cada precio y cantidad
  private calculeAmountTotal() {
    this.listProduct.forEach(item => {
      item.total = item.cost * item.amount;
    });
  }

  calculeTotal() {
    let sub:number = this.calculeSubTotal();
    let total:number = 0;
    total = sub + (sub*(this.head.tax / 100));
    return total;
  }

  show() {
    console.log(this.head);
  }

}
