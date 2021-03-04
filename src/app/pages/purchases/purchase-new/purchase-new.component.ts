import { Component, OnDestroy } from '@angular/core';
import { BillInterface } from '@models/bill.interface';
import { ProductInterface } from 'src/app/models/product.interface';
import { ProviderInterface } from '@models/provider.interface';
import { WarehouseInterface } from '@models/warehouse.interface';

@Component({
  selector: 'purchase-new',
  templateUrl: './purchase-new.component.html'
})
export class PurchaseNewComponent implements OnDestroy {

  change:boolean = true;
  
  objDate:Date = new Date();
  day:string = (this.objDate.getDate() < 10)? `0${ this.objDate.getDate() }` : this.objDate.getDate().toString();
  month:string = (this.objDate.getMonth() < 10)? `0${ this.objDate.getMonth() + 1 }` : this.objDate.getMonth().toString();
  date:string = `${ this.objDate.getFullYear()}-${ this.month }-${ this.day }`;

  /* Producto que se pasara al compoente hijo */
  product:ProductInterface;

  /* Lista de Provedores */
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

  /* Lista de Sucursales activas */
  warehouseList:WarehouseInterface[] = [
    {
      id: 'A',
      name: 'Sucursal 1',
      phone: 2345567,
      status: true
    },
    {
      id: 'B',
      name: 'Sucursal 2',
      phone: 2345567,
      status: true
    },
    {
      id: 'C',
      name: 'Sucursal 3',
      phone: 2345567,
      status: true
    }
  ];

  /* Encabezado de la factura */
  headBill:BillInterface = {
    user: 'Jerson', //USUARIO LOGUEADO
    date: this.date,
    warehouse: '',
    provider: '',
    tax: 0,
    subTotal: 0
  }
  
  constructor() { 
    document.getElementById('a-purchase').classList.toggle('active');
  }

  ngOnDestroy() {
    document.getElementById('a-purchase').classList.toggle('active');
  }

  updateDate(value:string) {
    this.headBill.date = value;
  }

  updateProvider(value:string) {
    this.headBill.provider = value;
  }

  updateWarehouse(value:string) {
    this.headBill.warehouse = value;
  }
}
