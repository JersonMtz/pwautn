import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BillInterface } from '@models/bill.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AfPurchaseService {

  private purchaseCollection: AngularFirestoreCollection<BillInterface>;
  private purchaseList: Observable<BillInterface[]>;

  constructor(private afs: AngularFirestore) { 
    this.initCollection();
  }

  private initCollection() {
    this.purchaseCollection = this.afs.collection<BillInterface>('purchases');
    this.purchaseList = this.purchaseCollection.snapshotChanges().pipe(
      map(res => res.map(item => {
        let id = item.payload.doc.id;
        let { ...data } = item.payload.doc.data();
        return { id, ...data }
      })));
  }

  list(): Observable<BillInterface[]> {
    return this.purchaseList;
  }
}
