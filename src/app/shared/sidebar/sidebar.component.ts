import { Component, EventEmitter, Output } from '@angular/core';
import { afAuthService } from '@auth/services/afAuth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  avatar: string;
  private sub$: Subscription;
  @Output('logOut') exit: EventEmitter<boolean> = new EventEmitter();
  
  constructor(public afAuth: afAuthService) {
    this.sub$ = this.afAuth.user$.subscribe(user => this.avatar = user ? user.photo.url : '');
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }

  onLogOut() {
    this.exit.emit(true);
    this.afAuth.logOut().then(() => window.location.reload());
  }
}
