import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaxInterface } from '@models/tax.interface';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { MessagesService } from '@shared/services/messages.service';

@Injectable({
    providedIn: 'root'
})
export class AfTaxService {

    private taxCollection: AngularFirestoreCollection<TaxInterface>;
    private taxList: Observable<TaxInterface[]>;

    constructor(private afs: AngularFirestore, private popup:MessagesService) {
        this.initCollection();
    }

    private initCollection() {
        this.taxCollection = this.afs.collection<TaxInterface>('taxes');
        this.taxList = this.taxCollection.snapshotChanges().pipe(
            map(res => res.map(item => {
                let data = item.payload.doc.data() as TaxInterface;
                let id = item.payload.doc.id
                return { id, ...data };
            }))
        );
    }

    add(tax: TaxInterface) {
        this.taxCollection.add(tax).then(() => {
            this.popup.notification('success', `<span class="text-white">Se agregó el impuesto ${tax.name} con éxito</span>`, '#52B256');
        }).catch(this.error);
    }

    update(tax: TaxInterface) {
        let { id, ...data } = tax;
        this.taxCollection.doc(id).update(data).then(() => {
            this.popup.notification('success', `<span class="text-white">Se actualizo el impuesto ${data.name} con éxito</span>`, '#52B256');
        }).catch(this.error);
    }

    delete(tax: TaxInterface) {
        this.taxCollection.doc(tax.id).delete().then(() => {
            this.popup.notification('success', `<span class="text-white">Se elimino el tax ${tax.name} con éxito</span>`, '#52B256');
        }).catch(this.error);
    }

    list(): Observable<TaxInterface[]> {
        return this.taxList;
    }

    onTaxes () {
        return this.afs.collection<TaxInterface>('taxes', ref => ref.where('status', '==', true))
            .snapshotChanges().pipe(map(res => res.map(item => {
                    let data = item.payload.doc.data() as TaxInterface;
                    let id = item.payload.doc.id
                    return { id, ...data };
                })))
    }

    private error(value: string) {
        this.popup.notification('error', `<span class="text-white">Ha ocurrido un error. ${value}</span>`, '#E6242B');
    }
}
