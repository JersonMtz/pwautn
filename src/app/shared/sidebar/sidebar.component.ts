import { Component } from '@angular/core';
import { afAuthService } from '../../auth/services/afAuth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  constructor(private afAuth:afAuthService, private router:Router) { }

  onLogOut() {
    this.afAuth.logOut().then(res => this.router.navigateByUrl('/auth/login'));
  }
}
