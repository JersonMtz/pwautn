import { Injectable } from '@angular/core';
import { CanActivateChild, Router,} from '@angular/router';
import { afAuthService } from '../auth/services/afAuth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {

  constructor(private auth:afAuthService, private router:Router) {}

  async canActivateChild() {
    let user = await this.auth.getCurrentUser();
    if (user) {
      return true;
    } else {
      this.router.navigateByUrl('/auth/login');
      return false;
    }
  }
  
}
