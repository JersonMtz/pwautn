import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AfUploadService {

  percent$: Observable<number>;
  url$: Observable<string>;

  constructor(private afs:AngularFireStorage) { }

  fileUpload(file:any, path:string) {
    let ref:AngularFireStorageReference = this.afs.ref(path);
    let task:AngularFireUploadTask = ref.put(file);
    this.percent$ = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.url$ = ref.getDownloadURL())).subscribe();
  }

  fileDelete(path:string): Promise<any> {
    return this.afs.storage.ref(path).delete();
  }
  
}
