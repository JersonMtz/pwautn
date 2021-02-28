import { first } from "rxjs/operators";
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth:AngularFireAuth) { }

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

  async resetPassword(mail:string) {
    try {
      return await this.afAuth.sendPasswordResetEmail(mail);
    } catch (e) {
      return e;
    }
  }

  async registerUser(mail:string, password:string) {
    try {
      return await this.afAuth.createUserWithEmailAndPassword(mail, password);
      // TODO: guardar datos en bd
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
}
