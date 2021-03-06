import { Injectable } from '@angular/core';
import { WarehouseInterface } from '../../../models/warehouse.interface';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { MessagesService } from '../../../shared/services/messages.service';

@Injectable({
    providedIn: 'root'
})
export class AfWarehouseService {

    private warehouseCollection: AngularFirestoreCollection<WarehouseInterface>;
    private warehouseList: Observable<WarehouseInterface[]>;

    constructor(private afs: AngularFirestore, private popup:MessagesService) {
        this.initCollection();
    }

    private initCollection() {
        this.warehouseCollection = this.afs.collection<WarehouseInterface>('warehouses');
        this.warehouseList = this.warehouseCollection.snapshotChanges().pipe(
            map(res => res.map(item => {
                let data = item.payload.doc.data() as WarehouseInterface;
                let id = item.payload.doc.id
                return { id, ...data };
            }))
        );
    }

    add(warehouse: WarehouseInterface) {
        this.warehouseCollection.add(warehouse).then(() => {
            this.popup.notification('success', `<span class="text-white">Se agregó la sucursal ${warehouse.name} con éxito</span>`, '#52B256');
        }).catch(this.error);
    }

    update(warehouse: WarehouseInterface) {
        let { id, ...data } = warehouse;
        this.warehouseCollection.doc(id).update(data).then(() => {
            this.popup.notification('success', `<span class="text-white">Se actualizo la sucursal ${data.name} con éxito</span>`, '#52B256');
        }).catch(this.error);
    }

    delete(warehouse: WarehouseInterface) {
        this.warehouseCollection.doc(warehouse.id).delete().then(() => {
            this.popup.notification('success', `<span class="text-white">Se elimino la sucursal ${warehouse.name} con éxito</span>`, '#52B256');
        }).catch(this.error);
    }

    list(): Observable<WarehouseInterface[]> {
        return this.warehouseList;
    }

    private error(value: string) {
        this.popup.notification('error', `<span class="text-white">Ha ocurrido un error. ${value}</span>`, '#E6242B');
    }
}
