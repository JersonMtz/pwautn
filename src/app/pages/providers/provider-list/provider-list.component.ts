import { Component, OnDestroy } from '@angular/core';
import { ProviderInterface } from '@models/provider.interface';
import { MessagesService } from '@shared/services/messages.service';
import { Subscription } from 'rxjs';
import { AfProviderService } from '@pages/providers/services/afProvider.service';

@Component({
  selector: 'provider-list',
  templateUrl: './provider-list.component.html'
})
export class ProviderListComponent implements OnDestroy {

  edit: boolean = false;
  show: boolean = true;
  providerEdit: ProviderInterface;
  providerList: ProviderInterface[] = [];
  private suscription$: Subscription;

  constructor(private afProvider: AfProviderService, private popup: MessagesService) {
    this.suscription$ = this.afProvider.list().subscribe(list => this.providerList = list);
  }

  ngOnDestroy() {
    this.suscription$.unsubscribe();
  }

  editProvider(provider: ProviderInterface) {
    this.edit = true;
    this.show = false;
    this.providerEdit = provider;
  }

  deleteProvider(provider: ProviderInterface) {
    this.popup.smsDelete(provider.name).then(resp => {
      if (resp.isConfirmed) {
        this.afProvider.delete(provider);
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
