import { Component, OnDestroy } from '@angular/core';
import { BillInterface } from '@models/bill.interface';
import { ClientInterface } from '@models/client.interface';
import { ProductInterface } from '@models/product.interface';

@Component({
  selector: 'sale-new',
  templateUrl: './sale-new.component.html'
})
export class SaleNewComponent implements OnDestroy {
  change:boolean = true;
  
  objDate:Date = new Date();
  day:string = (this.objDate.getDate() < 10)? `0${ this.objDate.getDate() }` : this.objDate.getDate().toString();
  month:string = (this.objDate.getMonth() < 10)? `0${ this.objDate.getMonth() + 1 }` : this.objDate.getMonth().toString();
  date:string = `${ this.objDate.getFullYear()}-${ this.month }-${ this.day }`;
  num:number = this.objDate.getTime();
  
  product:ProductInterface;
  deleteProduct:ProductInterface;

  /* Encabezado de la factura */
  headBill:BillInterface = {
    user: 'Jerson', //TODO: USUARIO LOGUEADO
    date: this.date,
    client: '',
    tax: 0,
    subTotal: 0
  }
  
  /* TODO:Listado de Clientes */
  listClient:ClientInterface[] = [
    {
      idCard: 2345,
      name: 'Fulano1',
      surname: 'Mengano1'
    },
    {
      idCard: 2345,
      name: 'Fulano1',
      surname: 'Mengano1'
    },
    {
      idCard: 2345,
      name: 'Fulano2',
      surname: 'Mengano2'
    },
    {
      idCard: 2345,
      name: 'Fulano3',
      surname: 'Mengano3'
    },
    {
      idCard: 2345,
      name: 'Fulano4',
      surname: 'Mengano4'
    },
    {
      idCard: 2345,
      name: 'Fulano5',
      surname: 'Mengano5'
    }
  ];

  constructor() {
    document.getElementById('a-sale').classList.toggle('active');
  }

  ngOnDestroy() {
    document.getElementById('a-sale').classList.toggle('active');
  }

  updateDate(value:string) {
    this.headBill.date = value;
  }

  clientSelect(cliente:ClientInterface) {
    this.headBill.client = `${cliente.name} ${cliente.surname}`;
  }
}
