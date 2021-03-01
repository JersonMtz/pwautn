import { Component } from '@angular/core';
import { Router  } from "@angular/router";
import { afAuthService } from '../services/afAuth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  constructor(private afAuth:afAuthService, private router:Router) { 
    this.redirectDasboard();
  }
  
  async redirectDasboard() {
    let user = await this.afAuth.getCurrentUser();
    if (user) {
      this.router.navigateByUrl('/dashboard');
    } else {
      this.router.navigateByUrl('/auth/login');
    }
  }
}
