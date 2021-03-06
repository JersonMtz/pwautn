import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProviderInterface } from '@models/provider.interface';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { MessagesService } from '@shared/services/messages.service';

@Injectable({
    providedIn: 'root'
})
export class AfProviderService {

    private providerCollection: AngularFirestoreCollection<ProviderInterface>;
    private providerList: Observable<ProviderInterface[]>;

    constructor(private afs: AngularFirestore, private popup:MessagesService) {
        this.initCollection();
    }

    private initCollection() {
        this.providerCollection = this.afs.collection<ProviderInterface>('providers');
        this.providerList = this.providerCollection.snapshotChanges().pipe(
            map(res => res.map(item => {
                let data = item.payload.doc.data() as ProviderInterface;
                let id = item.payload.doc.id
                return { id, ...data };
            }))
        );
    }

    add(provider: ProviderInterface) {
        this.providerCollection.add(provider).then(() => {
            this.popup.notification('success', `<span class="text-white">Se agregó el proveedor ${provider.name} con éxito</span>`, '#52B256');
        }).catch(this.error);
    }

    update(provider: ProviderInterface) {
        let { id, ...data } = provider;
        this.providerCollection.doc(id).update(data).then(() => {
            this.popup.notification('success', `<span class="text-white">Se actualizo el proveedor ${data.name} con éxito</span>`, '#52B256');
        }).catch(this.error);
    }

    delete(provider: ProviderInterface) {
        this.providerCollection.doc(provider.id).delete().then(() => {
            this.popup.notification('success', `<span class="text-white">Se elimino el proveedor ${provider.name} con éxito</span>`, '#52B256');
        }).catch(this.error);
    }

    list(): Observable<ProviderInterface[]> {
        return this.providerList;
    }

    private error(value: string) {
        this.popup.notification('error', `<span class="text-white">Ha ocurrido un error. ${value}</span>`, '#E6242B');
    }
}
