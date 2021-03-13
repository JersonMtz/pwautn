import { Component, OnDestroy } from '@angular/core';
import { BillInterface } from '@models/bill.interface';
import { ClientInterface } from '@models/client.interface';
import { ProductInterface } from '@models/product.interface';
import { Subscription } from 'rxjs';
import { afAuthService } from '../../../auth/services/afAuth.service';
import { AfClientService } from '../../clients/services/afClient.service';

@Component({
  selector: 'sale-new',
  templateUrl: './sale-new.component.html'
})
export class SaleNewComponent implements OnDestroy {

  private sub$: Subscription[] = [];
  change: boolean = true;
  dateNow: number = Date.now();
  product: ProductInterface;
  deleteProduct: ProductInterface;
  listClient: ClientInterface[] = [];
  headBill: BillInterface = {
    user: '',
    date: this.dateNow,
    client: '',
    tax: 0,
    subTotal: 0
  }

  constructor(private afAuth: afAuthService, private afClient: AfClientService) {
    document.getElementById('a-sale').classList.toggle('active');
    this.sub$.push(this.afAuth.user$.subscribe(user => this.headBill.user = user.name));
    this.sub$.push(this.afClient.list().subscribe(list => this.listClient = list));
  }

  ngOnDestroy() {
    document.getElementById('a-sale').classList.toggle('active');
    this.sub$.forEach(item => item.unsubscribe());
  }

  /*** Listenner change option ***/
  updateDate(value: string) {
    let date = new Date(value).getTime()+21600000+(new Date().getHours()*3600000)+(new Date().getMinutes()*60000)+(new Date().getSeconds()*1000);        
    this.headBill.date = date;
  }

  clientSelect(cliente: ClientInterface) {
    this.headBill.client = `${cliente.name} ${cliente.surname}`;
  }

  dateInit(value:number) {
    this.headBill.date = value;
    this.dateNow = value;
  }
}
