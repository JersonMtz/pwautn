import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  constructor(private afAuth:AuthService) { }

  onLogOut() {
    this.afAuth.logOut().then(console.log);
  }
}
