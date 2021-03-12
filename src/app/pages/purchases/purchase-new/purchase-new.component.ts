import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BillInterface } from '@models/bill.interface';
import { ProductInterface } from '@models/product.interface';
import { ProviderInterface } from '@models/provider.interface';
import { WarehouseInterface } from '@models/warehouse.interface';
import { AfWarehouseService } from '@pages/warehouses/services/afWarehouse.service';
import { afAuthService } from '@auth/services/afAuth.service';
import { AfProviderService } from '@pages/providers/services/afProvider.service';
import { AfInventoryService } from '../../components/services/afInventory.service';

@Component({
  selector: 'purchase-new',
  templateUrl: './purchase-new.component.html'
})
export class PurchaseNewComponent implements OnDestroy {

  private sub$: Subscription[] = [];
  change: boolean = true;
  dateNow: number = Date.now();
  product: ProductInterface;
  providerList: ProviderInterface[] = [];
  warehouseList: WarehouseInterface[] = [];
  headBill: BillInterface = {
    user: '',
    date: this.dateNow,
    status: false,
    warehouse: '',
    provider: '',
    tax: 0,
    subTotal: 0
  }

  constructor(private afAuth: afAuthService,
    private afWarehouse: AfWarehouseService,
    private afProvider: AfProviderService) {
    document.getElementById('a-purchase').classList.toggle('active');
    this.sub$.push(this.afAuth.user$.subscribe(user => this.headBill.user = user.name));
    this.sub$.push(this.afWarehouse.onWarehouse().subscribe(list => this.warehouseList = list));
    this.sub$.push(this.afProvider.list().subscribe(list => this.providerList = list));
  }

  ngOnDestroy() {
    document.getElementById('a-purchase').classList.toggle('active');
    this.sub$.forEach(item => item.unsubscribe());
  }

  /*** Listenner change option ***/
  updateDate(value: string) {
    let date = new Date(value).getTime() + 21600000 + (new Date().getHours() * 3600000) + (new Date().getMinutes() * 60000) + (new Date().getSeconds() * 1000);
    this.headBill.date = date;
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
