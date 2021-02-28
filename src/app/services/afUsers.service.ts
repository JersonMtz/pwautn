import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AfUsersService {

  constructor(private db:AngularFirestore) { }

  getUser(id:string) {
    return this.db.collection('users').doc(id).snapshotChanges();
  }
}
