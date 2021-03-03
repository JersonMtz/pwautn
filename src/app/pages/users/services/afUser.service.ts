import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AfUserService {

  constructor(private db:AngularFirestore) { }

  getUser(id:string) {
    return this.db.collection('users').doc(id).snapshotChanges();
  }
}
