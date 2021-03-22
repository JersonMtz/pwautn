import { Component, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { afAuthService } from '@auth/services/afAuth.service';
import { BillInterface } from '@models/bill.interface';
import { Subscription } from 'rxjs';
import { UserInterface } from '../../models/user.interface';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnDestroy {

  private collection: AngularFirestoreCollection<BillInterface>;
  private sub$: Subscription[] = [];
  bill: any = { size: 0 };
  admin: UserInterface = { role: false };

  constructor(private router: Router,
    public auth: afAuthService,
    private afs: AngularFirestore) {
    this.auth.user$.subscribe(res => this.admin = res);
    this.initColletion();
  }

  outPath(url: string) {
    this.router.navigateByUrl(url);
  }

  initColletion() {
    this.collection = this.afs.collection<BillInterface>('purchases', ref => ref.where('status', '==', false));
    this.sub$.push(this.collection.get().subscribe(res => this.bill = res));
  }

  ngOnDestroy() {
    this.sub$.forEach(item => {
      item.unsubscribe();
    });
  }

}
