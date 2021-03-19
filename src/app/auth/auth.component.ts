import { AfterViewInit, Component } from '@angular/core';
import { Router  } from "@angular/router";
import { afAuthService } from './services/afAuth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements AfterViewInit {

  constructor(private afAuth:afAuthService, private router:Router) { 
    this.redirectDasboard();
  }

  ngAfterViewInit() {
    document.getElementById('color').setAttribute('content','#2B79AC');
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
