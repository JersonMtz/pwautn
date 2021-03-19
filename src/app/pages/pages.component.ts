import { Component, AfterViewInit } from '@angular/core';
import { afAuthService } from '@auth/services/afAuth.service';
declare function ready();

@Component({
  selector: 'pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements AfterViewInit {

  exit:boolean = false;

  constructor(public afAuth:afAuthService) {
    document.title = 'Gestión de Inventario';
    ready(); 
  }

  ngAfterViewInit() {
    document.getElementById('color').setAttribute('content','#008D4C');
  }
}
