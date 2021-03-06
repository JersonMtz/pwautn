import { Component, OnDestroy } from '@angular/core';
import { TaxInterface } from '@models/tax.interface';
import { MessagesService } from '@shared/services/messages.service';
import { Subscription } from 'rxjs';
import { AfTaxService } from '@pages/taxes/services/afTax.service';

@Component({
  selector: 'tax-list',
  templateUrl: './tax-list.component.html'
})
export class TaxListComponent implements OnDestroy {

  edit: boolean = false;
  show: boolean = true;
  taxEdit: TaxInterface;
  taxList: TaxInterface[] = [];
  private suscription$: Subscription;

  constructor(private afTax: AfTaxService, private popup: MessagesService) { 
    this.suscription$ = this.afTax.list().subscribe(list => this.taxList = list);
  }

  ngOnDestroy() {
    this.suscription$.unsubscribe();
  }

  editTax(tax: TaxInterface) {
    this.edit = true;
    this.show = false;
    this.taxEdit = tax;
  }

  deleteTax(tax: TaxInterface) {
    this.popup.smsDelete(tax.name).then(resp => {
      if (resp.isConfirmed) {
        this.afTax.delete(tax);
      }
    });
  }

  showTab() {
    this.show = true;
    if (this.edit) {
      setTimeout(() => {
        this.edit = false;
      }, 500);
    }
  }

}
