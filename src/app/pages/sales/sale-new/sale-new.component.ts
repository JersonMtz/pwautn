import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sale-new',
  templateUrl: './sale-new.component.html',
  styleUrls: ['./sale-new.component.css']
})
export class SaleNewComponent implements OnInit {
  objDate:Date = new Date();
  day:string = (this.objDate.getDay() < 10)? `0${ this.objDate.getDay() }` : this.objDate.getDay().toString();
  month:string = (this.objDate.getMonth() < 10)? `0${ this.objDate.getMonth() + 1 }` : this.objDate.getMonth().toString();
  date:string = `${ this.objDate.getFullYear()}-${ this.month }-${ this.day }`;
  num:number = this.objDate.getTime();

  constructor() { }

  ngOnInit(): void {
  }

}
