import { Component, Input } from '@angular/core';
import { BreadcrumbInterface } from 'src/app/models/breadcrumb.interface';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent {

  @Input('items') listUrls:BreadcrumbInterface[] = [];
  constructor() { }

}
