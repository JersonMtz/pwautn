import { first, switchMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from '@models/user.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { MessagesService } from '@shared/services/messages.service';
import firebase from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class afAuthService {

  user$: Observable<UserInterface>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router, private popup: MessagesService) {
    this.getUser();
  }

  reauthentication(passwordOld: string, passwordNew: string) {
    this.afAuth.currentUser.then(user => {
      const credentials = firebase.auth.EmailAuthProvider.credential(user.email, passwordOld);
      user.reauthenticateWithCredential(credentials).then(res => {
        if (res) {
          user.updatePassword(passwordNew)
            .then(() => {
              this.popup.logOutMessage().then(res => {
                if (res) {
                  this.logOut().then(() => {
                    window.location.reload();
                    this.router.navigateByUrl('/auth/login');
                  });
                }
              })
            }).catch(this.error);
        }
      })
        .catch(() => {
          this.popup.beatPopup();
          this.popup.notification('error', '<span class="text-white">Contraseña incorrecta</span>', '#E6272E', 'bottom');
        });
    });

  }

  private getUser() {
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

  updatePhoto(id: string, path: string = "", url: string = "") {
    this.afs.doc(`users/${id}`).update({ "photo": { "path": path, "url": url } }).then(() =>
      this.popup.notification('success', 'Se actualizo imágen de perfil')).catch(this.error);
  }

  private error(value: string) {
    this.popup.notification('error', `<span class="text-white">Ha ocurrido un error. ${value}</span>`, '#E6242B');
  }

  async createUser(mail: string, password: string) {
    try {
      return await this.afAuth.createUserWithEmailAndPassword(mail, password);
    } catch (e) {
      return e;
    }
  }

  async login(mail: string, password: string) {
    try {
      return await this.afAuth.signInWithEmailAndPassword(mail, password);
    } catch (e) {
      return e;
    }
  }

  async logOut() {
    try {
      return await this.afAuth.signOut();
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
