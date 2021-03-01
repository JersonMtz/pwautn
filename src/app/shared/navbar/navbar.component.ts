import { Component } from '@angular/core';
import { afAuthService } from '../../services/afAuth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  constructor(private afAuth:afAuthService, private router:Router) { }

  onLogOut() {
    this.afAuth.logOut().then(res => this.router.navigateByUrl('/auth/login'));
  }
}
