import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { UserInterface } from '@models/user.interface';
import { MessagesService } from '@shared/services/messages.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AfUploadService } from '@shared/services/afUpload.service';

@Injectable({
  providedIn: 'root'
})
export class AfUserService {

  private userCollection: AngularFirestoreCollection<UserInterface>;
  private userList: Observable<UserInterface[]>;
  private user: UserInterface;

  constructor(private auth: AngularFireAuth,
    private afs: AngularFirestore, private file: AfUploadService,
    private popup: MessagesService) {
    this.initCollection();
  }

  private initCollection() {
    this.auth.currentUser.then(res => {
      this.userCollection = this.afs.collection<UserInterface>('users', ref => ref.where('mail', '!=', res.email));
      this.userList = this.userCollection.snapshotChanges().pipe(
        map(res => res.map(item => {
          let data = item.payload.doc.data() as UserInterface;
          let id = item.payload.doc.id
          return { id, ...data };
        }))
      );
    });
  }

  dataExist(value: string) {
    return this.afs.collection<UserInterface>('users', ref => ref.where('mail', '==', value)).snapshotChanges();
  }

  add(user: UserInterface) {
    let { id, password, ...data } = user;
    this.userCollection.doc(id).set(data).then(() => {
      this.auth.signOut().then(() => {
        this.popup.logOutMessage().then(() => window.location.reload());
      });
    }).catch(this.error);
  }

  update(user: UserInterface) {
    let { id, status, role } = user;
    this.userCollection.doc(id).update({ status, role }).then(() => {
      this.popup.notification('success', `<span class="text-white">Se actualizo el usuario ${user.name} con éxito</span>`, '#52B256');
    }).catch(this.error);
  }

  private deleteCollection(user: UserInterface) {
    this.userCollection.doc(user.id).delete().then(() => {
      this.popup.notification('success', `<span class="text-white">Se elimino el usuario ${user.name} con éxito</span>`, '#52B256');
    }).catch(this.error);
  }

  delete(user: UserInterface) {
    if (user.photo.path) {
      this.file.fileDelete(user.photo.path).then(() => this.deleteCollection(user)).catch(this.error);
    } else {
      this.deleteCollection(user);
    }
  }

  list(): Observable<UserInterface[]> {
    return this.userList;
  }

  private error(value: string) {
    this.popup.notification('error', `<span class="text-white">Ha ocurrido un error. ${value}</span>`, '#E6242B');
  }

  /** TRANSFER DATA VIEW <-> VIEW **/
  set setUser(user: UserInterface) {
    this.user = user;
  }

  get getUser(): UserInterface {
    return this.user;
  }
}
