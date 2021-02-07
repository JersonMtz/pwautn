import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'warehouse-list',
  templateUrl: './warehouse-list.component.html'
})
export class WarehouseListComponent implements OnInit {

  edit:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  change(){
    this.edit = !this.edit;
  }
}
