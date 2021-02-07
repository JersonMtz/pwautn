import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'purchase-new',
  templateUrl: './purchase-new.component.html'
})
export class PurchaseNewComponent implements OnInit {
  objDate:Date = new Date();
  day:string = (this.objDate.getDate() < 10)? `0${ this.objDate.getDate() }` : this.objDate.getDate().toString();
  month:string = (this.objDate.getMonth() < 10)? `0${ this.objDate.getMonth() + 1 }` : this.objDate.getMonth().toString();
  date:string = `${ this.objDate.getFullYear()}-${ this.month }-${ this.day }`;
  constructor() { }

  ngOnInit(): void {
  }

}
