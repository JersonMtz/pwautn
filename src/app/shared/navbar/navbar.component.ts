import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  constructor(private afAuth:AuthService) { }

  onLogOut() {
    this.afAuth.logOut().then(console.log);
  }
}
