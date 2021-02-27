import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(private router:Router) { }

  outPath(url:string) {
    this.router.navigateByUrl(url);
  }
}
