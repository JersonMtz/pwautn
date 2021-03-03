import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ClientInterface } from '../../../models/client.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessagesService } from '../../../shared/services/messages.service';

@Injectable({
  providedIn: 'root'
})
export class AfClientService {

  private clientCollection: AngularFirestoreCollection<ClientInterface>;
  private clientList: Observable<ClientInterface[]>;

  constructor(private afs:AngularFirestore, private popup:MessagesService) {
    this.initCollection();
  }

  private initCollection() {
    this.clientCollection = this.afs.collection<ClientInterface>('clients');
    this.clientList = this.clientCollection.snapshotChanges().pipe(
      map(res => res.map(item => {
        let data = item.payload.doc.data() as ClientInterface;
        let id = item.payload.doc.id
        return { id, ...data };
      }))
    );
  }

  checkIdCard(value:number) {
    return this.afs.collection<ClientInterface>('clients', ref => ref.where('idCard', '==', value)).snapshotChanges();
  }

  add(client:ClientInterface) {
    this.clientCollection.add(client).then(() => {
      this.popup.notification('success', `<span class="text-white">Se agregá a ${ client.name } con éxito</span>`,'#52B256');
    }).catch((error) => {
      this.popup.notification('error', `<span class="text-white">Ha ocurrido un error. ${ error }</span>`,'#52B256');
    });
  }

  update(client:ClientInterface) {
    this.clientCollection.doc(client.id).update(client).then(() => {
      this.popup.notification('success', `<span class="text-white">Se actualizo a ${ client.name } con éxito</span>`,'#52B256');
    }).catch((error) => {
      this.popup.notification('error', `<span class="text-white">Ha ocurrido un error. ${ error }</span>`,'#52B256');
    });
  }

  delete(client:ClientInterface) {
    this.clientCollection.doc(client.id).delete().then(() => {
      this.popup.notification('success', `<span class="text-white">Se elimino a ${ client.name } con éxito</span>`,'#52B256');
    }).catch((error) => {
      this.popup.notification('error', `<span class="text-white">Ha ocurrido un error. ${ error }</span>`,'#52B256');
    });
  }

  list(): Observable<ClientInterface[]> {
    return this.clientList;
  }
}
