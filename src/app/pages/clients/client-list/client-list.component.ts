import { Component, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { ClientInterface } from '@models/client.interface';
import { MessagesService } from '@shared/services/messages.service';
import { AfClientService } from '@pages/clients/services/afClient.service';
import { afAuthService } from '@auth/services/afAuth.service';

@Component({
  selector: 'client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['../../products/product-list/product-list.component.scss']
})
export class ClientListComponent implements OnDestroy {

  cols: any;
  edit: boolean = false;
  show: boolean = true;
  clientEdit: ClientInterface;
  clientList: ClientInterface[] = [];
  private sub$: Subscription;

  constructor(public afAuth: afAuthService,
    private afClient: AfClientService,
    private popup: MessagesService) {
    this.sub$ = this.afClient.list().subscribe(list => this.clientList = list);
    this.header();
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }

  editClient(person: ClientInterface) {
    this.edit = true;
    this.show = false;
    this.clientEdit = person;
  }

  deleteClient(person: ClientInterface) {
    this.popup.smsDelete(person.name).then(resp => {
      if (resp.isConfirmed) {
        this.afClient.delete(person);
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

  private header() {
    this.cols = [
      { field: 'idCard', header: 'Cédula' },
      { field: 'name', header: 'Nombre' },
      { field: 'surname', header: 'Apellidos' },
      { field: 'contact', header: 'Contacto' }
    ];
  }
}
