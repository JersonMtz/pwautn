import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BillInterface } from '@models/bill.interface';
import { MessagesService } from '@shared/services/messages.service';
import { AfProductService } from '@pages/products/services/afProduct.service';

@Injectable({
  providedIn: 'root'
})
export class AfInventoryService {

  private purchasesCollection: AngularFirestoreCollection<BillInterface>;
  private salesCollection: AngularFirestoreCollection<BillInterface>;
  private purchasesList: Observable<BillInterface[]>;
  private salesList: Observable<BillInterface[]>;

  constructor(private afs: AngularFirestore, 
    private afProduct: AfProductService,
    private popup: MessagesService) { }

  collectionPurchase() {
    this.purchasesCollection = this.afs.collection<BillInterface>('purchases', ref => ref.orderBy('date','desc'));
    this.purchasesList = this.purchasesCollection.snapshotChanges().pipe(
      map(res => res.map(item => {
        let id = item.payload.doc.id;
        let { ...data } = item.payload.doc.data();
        return { id, ...data }
      })));
  }

  collectionSale() {
    this.salesCollection = this.afs.collection<BillInterface>('sales', ref => ref.orderBy('date','desc'));
    this.salesList = this.salesCollection.snapshotChanges().pipe(
      map(res => res.map(item => {
        let id = item.payload.doc.id;
        let { ...data } = item.payload.doc.data();
        return { id, ...data }
      })));
  }

  listPurchase(): Observable<BillInterface[]> {
    return this.purchasesList;
  }

  listSale(): Observable<BillInterface[]> {
    return this.salesList;
  }

  addPurchase(bill: BillInterface) {
    this.purchasesCollection = this.afs.collection<BillInterface>('purchases');
    this.purchasesCollection.add(bill).then(() => {
      this.popup.notification('success', '<span class="text-white">Pedido registrado con éxito</span>', '#52B256');
      this.afProduct.updateStock(bill.products);
    }).catch(this.error);
  }

  addSale(bill: BillInterface) {
    this.salesCollection = this.afs.collection<BillInterface>('sales');
    this.salesCollection.add(bill).then(() => {
      this.popup.notification('success', '<span class="text-white">Venta registrada con éxito</span>', '#52B256');
      this.afProduct.updateStock(bill.products, true);
    }).catch(this.error);
  }

  private error(value: string) {
    this.popup.notification('error', `<span class="text-white">Ha ocurrido un error. ${value}</span>`, '#E6242B');
  }
}
