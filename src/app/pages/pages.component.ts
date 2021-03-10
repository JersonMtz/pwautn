import { Component } from '@angular/core';
declare function ready();

@Component({
  selector: 'pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent {

  constructor() {
    document.title = 'Gestión de Inventario';
    ready(); 
  }

  


}
