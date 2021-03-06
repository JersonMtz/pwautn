import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WarehouseInterface } from '@models/warehouse.interface';
import { MessagesService } from '@shared/services/messages.service';
import { AfWarehouseService } from '@pages/warehouses/services/afWarehouse.service';

@Component({
  selector: 'warehouse-list',
  templateUrl: './warehouse-list.component.html'
})
export class WarehouseListComponent implements OnDestroy {
  
  edit:boolean = false;
  show:boolean = true;
  warehouseEdit:WarehouseInterface;
  warehouseList:WarehouseInterface[] = [];
  private suscription$:Subscription;


  constructor(private afWarehouse:AfWarehouseService, private popup:MessagesService) { 
    this.suscription$ = this.afWarehouse.list().subscribe(list => this.warehouseList = list);
  }

  ngOnDestroy() {
    this.suscription$.unsubscribe();
  }

  editWarehouse(warehouse:WarehouseInterface) {
    this.edit = true;
    this.show = false;
    this.warehouseEdit = warehouse;
  }

  deleteWarehouse(warehouse:WarehouseInterface) {
    this.popup.smsDelete(warehouse.name).then(resp => {
      if (resp.isConfirmed) {
        this.afWarehouse.delete(warehouse);
      }
    });
  }

  showTab() {
    this.show = true;
    if (this.edit){ 
      setTimeout(() => { 
        this.edit = false;
      }, 500);
    }
  }
}
