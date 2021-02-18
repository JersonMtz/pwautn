import { Component, ChangeDetectorRef } from '@angular/core';
import { ClientInterface } from '../../../models/client.interface';
import { MessagesService } from '../../../services/messages.service';

@Component({
  selector: 'client-list',
  templateUrl: './client-list.component.html'
})
export class ClientListComponent {

  edit:boolean = false;
  clientEdit:ClientInterface;

  clients:ClientInterface[] = [
    {
      id: '1A',
      idCard: 207390988,
      name: 'Jerson',
      surname: 'BM',
      phone: 85218439,
      mail: 'mail@gmail.com'
    },
    {
      id: '2B',
      idCard: 28800993,
      name: 'Thalia',
      surname: 'Es',
      phone: 234553,
      mail: 'mail@gmail.com'
    },
    {
      id: '3c',
      idCard: 23563323,
      name: 'Juanes',
      surname: 'XR',
      phone: 234553,
      mail: 'mail@gmail.com'
    }
  ];

  constructor(private dect:ChangeDetectorRef, private popup:MessagesService) { }

  ngAfterViewChecked() {
    this.dect.detectChanges();
  }

  editClient(person:ClientInterface) {
    this.edit = true;
    this.clientEdit = person;
  }

  deleteClient(person:ClientInterface) {
    this.popup.smsDelete(person.name).then(resp => {
      if (resp.isConfirmed) {
        //TODO: LÓGICA ELIMINAR EN FIREBASE 
        this.popup.notification('success', `<span class="text-white">Se elimino a ${ person.name } con éxito</span>`,'#52B256');
      }
    });
  }

  reload() {
    if (this.edit){ 
      setTimeout(() => this.edit = false, 500);
    }
  }
}
