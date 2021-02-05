import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styles: [
  ]
})
export class ProductListComponent implements OnInit {
  productTable:any;
  @ViewChild('productsList',{ static: true }) htmlTable: ElementRef;

  constructor() { }

  ngOnInit(): void {
    /* this.productTable = $(this.htmlTable.nativeElement);
    this.productTable.dataTable({ 
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.22/i18n/Spanish.json'
      },
      responsive: {
        details: false
      }
    }); */

  }
}