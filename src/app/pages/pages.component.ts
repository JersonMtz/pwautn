import { Component } from '@angular/core';
declare function ready();

@Component({
  selector: 'pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent {

  constructor() { 
    ready();
  }

  ngOnInit(): void {
  }

}
