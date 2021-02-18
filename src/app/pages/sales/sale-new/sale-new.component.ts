import { Component } from '@angular/core';

@Component({
  selector: 'sale-new',
  templateUrl: './sale-new.component.html'
})
export class SaleNewComponent {
  objDate:Date = new Date();
  day:string = (this.objDate.getDate() < 10)? `0${ this.objDate.getDate() }` : this.objDate.getDate().toString();
  month:string = (this.objDate.getMonth() < 10)? `0${ this.objDate.getMonth() + 1 }` : this.objDate.getMonth().toString();
  date:string = `${ this.objDate.getFullYear()}-${ this.month }-${ this.day }`;
  num:number = this.objDate.getTime();

  constructor() { }

}
