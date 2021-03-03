import { Component } from '@angular/core';
import { ClientInterface } from '../../../models/client.interface';
import { MessagesService } from '../../../shared/services/messages.service';
import { AfClientService } from '../services/afClient.service';

@Component({
  selector: 'client-list',
  templateUrl: './client-list.component.html'
})
export class ClientListComponent {

  edit:boolean = false;
  show:boolean = true;
  clientEdit:ClientInterface;

  listClient:ClientInterface[] = [];

  constructor(private afClient:AfClientService, private popup:MessagesService) {
    this.afClient.list().subscribe(list => this.listClient = list );
  }

  editClient(person:ClientInterface) {
    this.edit = true;
    this.show = false;
    this.clientEdit = person;
  }

  deleteClient(person:ClientInterface) {
    this.popup.smsDelete(person.name).then(resp => {
      if (resp.isConfirmed) {
        this.afClient.delete(person);
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
