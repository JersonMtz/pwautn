import {Component } from '@angular/core';
import { WarehouseInterface } from '../../../models/warehouse.interface';
import { MessagesService } from '../../../services/messages.service';

@Component({
  selector: 'warehouse-list',
  templateUrl: './warehouse-list.component.html'
})
export class WarehouseListComponent {
  
  edit:boolean = false;
  warehouseEdit:WarehouseInterface;

  warehouses:WarehouseInterface[] = [
    {
      id: '1A',
      name: 'Sucursal 1',
      phone: 85218439,
      status: true,
      direction: 'Alajuela, Upala'
    },
    {
      id: '2B',
      name: 'Sucursal 2',
      phone: 85218439,
      status: true,
      direction: 'Guanacaste, Liberia'
    },
    {
      id: '3C',
      name: 'Sucursal 3',
      phone: 85218439,
      status: false,
      direction: 'San José, San José'
    }
  ];

  constructor(private popup:MessagesService) { }

  editWarehouse(warehouse:WarehouseInterface) {
    this.edit = true;
    this.warehouseEdit = warehouse;
  }

  deleteWarehouse(warehouse:WarehouseInterface) {
    this.popup.smsDelete(warehouse.name).then(resp => {
      if (resp.isConfirmed) {
        //TODO: LÓGICA ELIMINAR EN FIREBASE 
        this.popup.notification('success', `Se elimino a ${ warehouse.name } con éxito`);
      }
    });
  }

  reload() {
    if (this.edit){ 
      setTimeout(() => this.edit = false, 500);
    }
  }
}
