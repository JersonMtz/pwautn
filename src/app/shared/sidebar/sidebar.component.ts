import { Component } from '@angular/core';
import { afAuthService } from '@auth/services/afAuth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  avatar: string;
  private sub$: Subscription;
  constructor(private afAuth: afAuthService) {
    this.sub$ = this.afAuth.user$.subscribe(user => this.avatar = user ? user.photo.url : '');
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }

  onLogOut() {
    this.afAuth.logOut().then(() => window.location.reload());
  }
}
