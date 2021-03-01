import { first, switchMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from '../models/user.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class afAuthService {

  user$: Observable<UserInterface>;

  constructor(private afAuth: AngularFireAuth, private afs:AngularFirestore) { 
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<UserInterface>(`users/${user.uid}`).valueChanges().pipe(map(res => {
            return {
              id: user.uid,
              ...res
            }
          }));
        }
        return of(null);
      })
    );
  }

  async login(mail:string, password:string) {
    try {
      return this.afAuth.signInWithEmailAndPassword(mail, password);
    } catch (e) {
      return e;
    }
  }

  async logOut() {
    try {
      return this.afAuth.signOut();
    } catch (e) {
      return e;
    }
  }

  async resetPassword(mail: string) {
    try {
      return await this.afAuth.sendPasswordResetEmail(mail);
    } catch (e) {
      return e;
    }
  }

  async registerUser(mail: string, password: string) {
    try {
      return await this.afAuth.createUserWithEmailAndPassword(mail, password);
    } catch (e) {
      return e;
    }
  }

  async getCurrentUser() {
    try {
      return await this.afAuth.authState.pipe(first()).toPromise();
    } catch (e) {
      return e;
    }
  }

  async verifyMail() {
    return (await this.afAuth.currentUser).sendEmailVerification();
  }
}