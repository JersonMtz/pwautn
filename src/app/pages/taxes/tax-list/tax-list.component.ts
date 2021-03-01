import { Component } from '@angular/core';
import { MessagesService } from '../../../shared/services/messages.service';
import { TaxInterface } from '../../../models/tax.interface';

@Component({
  selector: 'tax-list',
  templateUrl: './tax-list.component.html'
})
export class TaxListComponent {

  edit:boolean = false;
  taxEdit:TaxInterface;

  taxList:TaxInterface[] = [
    {
      id: '1A',
      name: 'Impuesto 1',
      value: 19,
      status: true
    },
    {
      id: '2B',
      name: 'Impuesto 2',
      value: 9,
      status: false
    },
    {
      id: '3C',
      name: 'Impuesto 3',
      value: 13,
      status: false
    }
  ];

  constructor(private popup:MessagesService) { }

  editTax(tax:TaxInterface) {
    this.edit = true;
    this.taxEdit = tax;
  }

  deleteTax(tax:TaxInterface) {
    this.popup.smsDelete(tax.name).then(resp => {
      if (resp.isConfirmed) {
        //TODO: LÓGICA ELIMINAR EN FIREBASE 
        this.popup.notification('success', `Se elimino a ${ tax.name } con éxito`);
      }
    });
  }

  reload() {
    if (this.edit){ 
      setTimeout(() => this.edit = false, 500);
    }
  }

}
