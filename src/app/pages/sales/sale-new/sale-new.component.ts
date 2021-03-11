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
  product: ProductInterface;
  deleteProduct: ProductInterface;
  headBill: BillInterface = {
    user: '',
    date: this.getDate(),
    client: '',
    tax: 0,
    subTotal: 0
  }
  listClient: ClientInterface[] = [];

  constructor(private afAuth: afAuthService, private afClient: AfClientService) {
    document.getElementById('a-sale').classList.toggle('active');
    this.sub$.push(this.afAuth.user$.subscribe(user => this.headBill.user = user.name));
    this.sub$.push(this.afClient.list().subscribe(list => this.listClient = list));
  }

  ngOnDestroy() {
    document.getElementById('a-sale').classList.toggle('active');
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

  clientSelect(cliente: ClientInterface) {
    this.headBill.client = `${cliente.name} ${cliente.surname}`;
  }
}
