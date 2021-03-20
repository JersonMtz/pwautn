import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'notpagefound',
  templateUrl: './notpagefound.component.html',
  styleUrls: ['./notpagefound.component.css']
})
export class NotpagefoundComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
    document.getElementById('color').setAttribute('content','#ffff');
  }

}
