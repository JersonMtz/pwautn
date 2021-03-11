import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BillInterface } from '@models/bill.interface';
import { ProductInterface } from '@models/product.interface';
import { ProviderInterface } from '@models/provider.interface';
import { WarehouseInterface } from '@models/warehouse.interface';
import { AfWarehouseService } from '@pages/warehouses/services/afWarehouse.service';
import { afAuthService } from '@auth/services/afAuth.service';
import { AfProviderService } from '@pages/providers/services/afProvider.service';

@Component({
  selector: 'purchase-new',
  templateUrl: './purchase-new.component.html'
})
export class PurchaseNewComponent implements OnDestroy {

  private sub$: Subscription[] = [];
  change: boolean = true;

  product: ProductInterface;
  providerList: ProviderInterface[] = [];
  warehouseList: WarehouseInterface[] = [];

  headBill: BillInterface = {
    user: '',
    date: this.getDate(),
    status: false,
    warehouse: '',
    provider: '',
    tax: 0,
    subTotal: 0
  }
  
  constructor(private afAuth:afAuthService, private afWarehouse: AfWarehouseService, private afProvider:AfProviderService) {
    document.getElementById('a-purchase').classList.toggle('active');
    this.sub$.push(this.afAuth.user$.subscribe(user => this.headBill.user = user.name));
    this.sub$.push(this.afWarehouse.onWarehouse().subscribe(list => this.warehouseList = list));
    this.sub$.push(this.afProvider.list().subscribe(list => this.providerList = list));
  }

  ngOnDestroy() {
    document.getElementById('a-purchase').classList.toggle('active');
    this.sub$.forEach(item => item.unsubscribe());
  }


  getDate(): string {
    let objDate: Date = new Date();
    let day: string = (objDate.getDate() < 10) ? `0${objDate.getDate()}` : objDate.getDate().toString();
    let month: string = (objDate.getMonth() < 10) ? `0${objDate.getMonth() + 1}` : objDate.getMonth().toString();
    return `${objDate.getFullYear()}-${month}-${day}`;
  }

  /*** Listenner change option ***/
  updateDate(value: string) {
    this.headBill.date = value;
  }

  updateProvider(value: string) {
    this.headBill.provider = value;
  }

  updateWarehouse(value: string) {
    this.headBill.warehouse = value;
  }

  updateStatus(value: boolean) {
    this.headBill.status = value;
  }
}
