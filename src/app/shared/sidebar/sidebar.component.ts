import { Component } from '@angular/core';
import { afAuthService } from '@auth/services/afAuth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  avatar:string;
  private sub$:Subscription;
  constructor(private afAuth:afAuthService, private router:Router) { 
    this.sub$ = afAuth.user$.subscribe(res => this.avatar = res.photo.url);
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }

  onLogOut() {
    this.afAuth.logOut().then(() => this.router.navigateByUrl('/auth/login'));
  }
}
