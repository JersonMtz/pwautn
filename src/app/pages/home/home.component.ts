import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { afAuthService } from '../../services/afAuth.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(private router:Router, public auth:afAuthService) { }

  outPath(url:string) {
    this.router.navigateByUrl(url);
  }
}
