import { Component } from '@angular/core';
import { PurchaseInterface } from '../../../models/purchase.interface';
import { ProductBillInterface } from '../../../models/product.bill.interface';
import { ProviderInterface } from '../../../models/provider.interface';

@Component({
  selector: 'purchase-new',
  templateUrl: './purchase-new.component.html'
})
export class PurchaseNewComponent {

  objDate:Date = new Date();
  day:string = (this.objDate.getDate() < 10)? `0${ this.objDate.getDate() }` : this.objDate.getDate().toString();
  month:string = (this.objDate.getMonth() < 10)? `0${ this.objDate.getMonth() + 1 }` : this.objDate.getMonth().toString();
  date:string = `${ this.objDate.getFullYear()}-${ this.month }-${ this.day }`;

  product:ProductBillInterface;
  providerList:ProviderInterface[] = [
    {
      id: 'A1',
      name: 'Proveedor 1',
    },
    {
      id: 'A2',
      name: 'Proveedor 2',
    },
    {
      id: 'A3',
      name: 'Proveedor 3',
    }
  ]

  headBill:PurchaseInterface = {
    salesman: 'Jerson', //USUARIO LOGUEADO
    date: this.date,
    provider: '',
    tax: 0,
    subTotal: 0
  }
  
  constructor() { }

  updateDate(value:string) {
    this.headBill.date = value;
  }

  updateProvider(value:string) {
    this.headBill.provider = value;
  }

}
