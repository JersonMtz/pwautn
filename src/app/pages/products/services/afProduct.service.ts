import { Injectable } from '@angular/core';
import { ProductInterface } from '../../../models/product.interface';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MessagesService } from '../../../shared/services/messages.service';
import { map } from 'rxjs/operators';
import { CategoryInterface } from '../../../models/category.interface';

@Injectable({
  providedIn: 'root'
})
export class AfProductService {

  private productCollection: AngularFirestoreCollection<ProductInterface>;
  private productList: Observable<ProductInterface[]>;

  private product:ProductInterface;

  constructor(private afs:AngularFirestore, private popup:MessagesService) { 
    this.initCollection();
  }

  private initCollection() {
    this.productCollection = this.afs.collection<ProductInterface>('products');
    this.productList = this.productCollection.snapshotChanges().pipe(
      map(res => res.map(item => {
        let id = item.payload.doc.id;
        let { category, ...data} = item.payload.doc.data();
        return { id, category: category.id, ...data }
      })));
  }

  dataExist(field:string, value:string) {
    return this.afs.collection<ProductInterface>('products', ref => ref.where(field, '==', value)).snapshotChanges();
  }

  findCategory(id:string) {
    return this.afs.collection('categories').doc(id).snapshotChanges().pipe(
      map(res => {
        if (res) {
          let data:CategoryInterface = res.payload.data();
          return { id, ...data }
        } else {
          return {}
        }
      })
    );
  }

  add(product:ProductInterface) {
    this.productCollection.add(product).then(() => {
      this.popup.notification('success', `<span class="text-white">Se agregó al producto ${ product.name } con éxito</span>`,'#52B256');
    }).catch(this.error);
  }

  update(product:ProductInterface) {
    let { id, ...data } = product;
    this.productCollection.doc(id).update(data).then(() => {
      this.popup.notification('success', `<span class="text-white">Se actualizo el producto ${ data.name } con éxito</span>`,'#52B256');
    }).catch(this.error);
  }

  delete(product:ProductInterface) {
    this.productCollection.doc(product.id).delete().then(() => {
      this.popup.notification('success', `<span class="text-white">Se elimino el producto ${ product.name } con éxito</span>`,'#52B256');
    }).catch(this.error);
  }

  list(): Observable<ProductInterface[]> {
    return this.productList;
  }

  private error(value:string) {
    this.popup.notification('error', `<span class="text-white">Ha ocurrido un error. ${value}</span>`, '#E6242B');
  } 

  /** TRANSFER DATA VIEW <-> VIEW **/
  set setProduct(product:ProductInterface) {
    this.product = product;
  }

  get getProduct():ProductInterface {
    return this.product;
  }
}