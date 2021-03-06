import { Component, OnDestroy } from '@angular/core';
import { afAuthService } from '@auth/services/afAuth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnDestroy {

  avatar:string;
  private subscription$:Subscription;
  constructor(private afAuth:afAuthService, private router:Router) { 
    this.subscription$ = afAuth.user$.subscribe(res => this.avatar = res.photo.url);
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  onLogOut() {
    this.afAuth.logOut().then(res => this.router.navigateByUrl('/auth/login'));
  }
}
