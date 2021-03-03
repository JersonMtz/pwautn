import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { CategoryInterface } from '../../../models/category.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessagesService } from '../../../shared/services/messages.service';

@Injectable({
    providedIn: 'root'
})
export class AfCategoryService {

    private categoryCollection: AngularFirestoreCollection<CategoryInterface>;
    private categoryList: Observable<CategoryInterface[]>;

    constructor(private afs: AngularFirestore, private popup: MessagesService) {
        this.initCollection();
    }

    private initCollection() {
        this.categoryCollection = this.afs.collection<CategoryInterface>('categories');
        this.categoryList = this.categoryCollection.snapshotChanges().pipe(
            map(res => res.map(item => {
                let data = item.payload.doc.data() as CategoryInterface;
                let id = item.payload.doc.id
                return { id, ...data };
            }))
        );
    }

    add(category:CategoryInterface) {
        this.categoryCollection.add(category).then(() => {
            this.popup.notification('success', `<span class="text-white">Se agregó la categoría ${category.name} con éxito</span>`, '#52B256');
        }).catch(this.error);
    }

    update(category:CategoryInterface) {
        let { id, ...data } = category;
        this.categoryCollection.doc(id).update(data).then(() => {
            this.popup.notification('success', `<span class="text-white">Se actualizo la categoría ${data.name} con éxito</span>`, '#52B256');
        }).catch(this.error);
    }

    delete(category:CategoryInterface) {
        this.categoryCollection.doc(category.id).delete().then(() => {
            this.popup.notification('success', `<span class="text-white">Se elimino la categoría ${category.name} con éxito</span>`, '#52B256');
        }).catch(this.error);
    }

    list(): Observable<CategoryInterface[]> {
        return this.categoryList;
    }

    private error(value:string) {
        this.popup.notification('error', `<span class="text-white">Ha ocurrido un error. ${value}</span>`, '#E6242B');
    }
}
