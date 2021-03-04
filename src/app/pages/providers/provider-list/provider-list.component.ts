import { Component } from '@angular/core';
import { ProviderInterface } from '@models/provider.interface';
import { MessagesService } from '@shared/services/messages.service';

@Component({
  selector: 'provider-list',
  templateUrl: './provider-list.component.html'
})
export class ProviderListComponent {

  edit:boolean = false;
  providerEdit:ProviderInterface;

  providerList:ProviderInterface[] = [
    {
      id: 'A1',
      name: 'Proveedor 1',
      phone: 28447234,
      mail: 'provedor1@mail.com',
      direction: ''
    },
    {
      id: 'B2',
      name: 'Proveedor 2',
      phone: 28447232,
      mail: 'provedor2@mail.com',
      direction: 'Guanacaste, Liberia'
    },
    {
      id: 'C3',
      name: 'Proveedor 3',
      phone: 28447233,
      mail: 'provedor3@mail.com',
      direction: 'Guanacaste, Liberia'
    }
  ];

  constructor(private popup:MessagesService) { }

  editProvider(provider:ProviderInterface) {
    this.edit = true;
    this.providerEdit = provider;
  }

  deleteProvider(provider:ProviderInterface) {
    this.popup.smsDelete(provider.name).then(resp => {
      if (resp.isConfirmed) {
        //TODO: LÓGICA ELIMINAR EN FIREBASE 
        this.popup.notification('success', `Se elimino a ${ provider.name } con éxito`);
      }
    });
  }

  reload() {
    if (this.edit){ 
      setTimeout(() => this.edit = false, 500);
    }
  }
}
