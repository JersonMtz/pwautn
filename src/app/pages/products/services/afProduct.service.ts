import { Injectable } from '@angular/core';
import { ProductInterface } from '@models/product.interface';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { MessagesService } from '@shared/services/messages.service';
import { map, first } from 'rxjs/operators';
import { AfUploadService } from '@shared/services/afUpload.service';

@Injectable({
  providedIn: 'root'
})
export class AfProductService {

  private productCollection: AngularFirestoreCollection<ProductInterface>;
  private productDoc: AngularFirestoreDocument<ProductInterface>;
  private productList: Observable<ProductInterface[]>;
  private product: ProductInterface;
  private sub$: Subscription;

  constructor(private afs: AngularFirestore, private file: AfUploadService, private popup: MessagesService) {
    this.initCollection();
  }

  private initCollection() {
    this.productCollection = this.afs.collection<ProductInterface>('products');
    this.productList = this.productCollection.snapshotChanges().pipe(
      map(res => res.map(item => {
        let id = item.payload.doc.id;
        let { category, ...data } = item.payload.doc.data();
        return { id, category: category.id, ...data }
      })));
  }

  dataExist(field: string, value: string) {
    return this.afs.collection<ProductInterface>('products', ref => ref.where(field, '==', value)).snapshotChanges();
  }

  add(product: ProductInterface) {
    product.category = this.afs.doc(`products/${product.category}`).ref;
    this.productCollection.add(product).then(() => {
      this.popup.notification('success', `<span class="text-white">Se agregó al producto ${product.name} con éxito</span>`, '#52B256');
    }).catch(this.error);
  }

  update(product: ProductInterface) {
    product.category = this.afs.doc(`products/${product.category}`).ref;
    let { id, ...data } = product;
    this.productCollection.doc(id).update(data).then(() => {
      this.popup.notification('success', `<span class="text-white">Se actualizo el producto ${data.name} con éxito</span>`, '#52B256');
    }).catch(this.error);
  }

  //UPDATE LIST PRODUCT STOCK
  updateStock(products: ProductInterface[], sale: boolean = false) {
    products.forEach(item => {
      this.sub$ = this.getProductStock(item.id).pipe(first()).subscribe(res => {
        let stock: number = 0;
        if (sale) {
          stock = res.stock - item.amount;
          if (stock === 0) {
            this.productCollection.doc(res.id).update({ status: false, stock }).catch(console.log);
          } else {
            this.productCollection.doc(res.id).update({ stock }).catch(console.log);
          }
        } else {
          stock = res.stock + item.amount;
          if (res.stock === 0) {
            this.productCollection.doc(res.id).update({ status: true, stock }).catch(console.log);
          } else {
            this.productCollection.doc(res.id).update({ stock }).catch(console.log);
          }
        }
      });
    });
  }

  private getProductStock(id: string) {
    this.productDoc = this.afs.doc<ProductInterface>(`products/${id}`);
    return this.productDoc.snapshotChanges().pipe(map(res => {
      if (res.payload.exists === false) {
        return null;
      } else {
        let data = res.payload.data() as ProductInterface;
        data.id = res.payload.id;
        return data;
      }
    }));
  }

  updatePhoto(id: string) {
    this.productCollection.doc(id).update({ "photo": { "path": "", "url": "" } }).then(() =>
      this.popup.notification('success', 'Se elimino la imágen correctamente')).catch(this.error);
  }

  private deleteCollection(product: ProductInterface) {
    this.productCollection.doc(product.id).delete().then(() => {
      this.popup.notification('success', `<span class="text-white">Se elimino el producto ${product.name} con éxito</span>`, '#52B256');
    }).catch(this.error);
  }

  delete(product: ProductInterface) {
    if (product.photo.path) {
      this.file.fileDelete(product.photo.path).then(() => this.deleteCollection(product)).catch(this.error);
    } else {
      this.deleteCollection(product);
    }
  }

  list(): Observable<ProductInterface[]> {
    return this.productList;
  }

  private error(value: string) {
    this.popup.notification('error', `<span class="text-white">Ha ocurrido un error. ${value}</span>`, '#E6242B');
  }

  /** TRANSFER DATA VIEW <-> VIEW **/
  set setProduct(product: ProductInterface) {
    this.product = product;
  }

  get getProduct(): ProductInterface {
    return this.product;
  }
}
