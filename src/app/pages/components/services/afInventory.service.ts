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
    this.purchasesCollection = this.afs.collection<BillInterface>('purchases', ref => ref.orderBy('date', 'desc'));
    this.purchasesList = this.purchasesCollection.snapshotChanges().pipe(
      map(res => res.map(item => {
        let id = item.payload.doc.id;
        let { ...data } = item.payload.doc.data();
        return { id, ...data }
      })));
  }

  collectionSale() {
    this.salesCollection = this.afs.collection<BillInterface>('sales', ref => ref.orderBy('date', 'desc'));
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
    bill.products.forEach(item => delete item.total);
    this.purchasesCollection.add(bill).then(() => {
      this.popup.notification('success', '<span class="text-white">Pedido registrado con éxito</span>', '#52B256');
      if (bill.status) {
        this.afProduct.updateStock(bill.products);
      }
    }).catch(this.error);
  }

  addSale(bill: BillInterface) {
    this.salesCollection = this.afs.collection<BillInterface>('sales');
    bill.products.forEach(item => delete item.total);
    this.salesCollection.add(bill).then(() => {
      this.popup.notification('success', '<span class="text-white">Venta registrada con éxito</span>', '#52B256');
      this.afProduct.updateStock(bill.products, true);
    }).catch(this.error);
  }

  deletePurchase(bill: BillInterface) {
    this.afs.collection<BillInterface>('purchases').doc(bill.id).delete().then(() => {
      this.popup.notification('success', '<span class="text-white">Se elimino el registro con éxito</span>', '#52B256');
    }).catch(this.error);
  }

  deleteSale(bill: BillInterface) {
    this.afs.collection<BillInterface>('sales').doc(bill.id).delete().then(() => {
      this.popup.notification('success', '<span class="text-white">Se elimino el registro con éxito</span>', '#52B256');
    }).catch(this.error);
  }

  updatePurchase(id: string, value: boolean) {
    this.afs.collection<BillInterface>('purchases').doc(id).update({ status: value }).then(() => {
      this.popup.notification('success', '<span class="text-white">Estado del pedido actualizado</span>', '#52B256');
    }).catch(this.error);
  }

  private error(value: string) {
    this.popup.notification('error', `<span class="text-white">Ha ocurrido un error. ${value}</span>`, '#E6242B');
  }
}
