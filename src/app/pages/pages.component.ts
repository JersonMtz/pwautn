import { Component } from '@angular/core';
import { afAuthService } from '../services/afAuth.service';
declare function ready();

@Component({
  selector: 'pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent {

  constructor(private auth:afAuthService) {
    document.title = 'Gestión de Inventario';
    ready(); 
  }

  


}
