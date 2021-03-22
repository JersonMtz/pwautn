import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[NotImage]'
})
export class NotImageDirective {

  constructor(private html: ElementRef) { }

  @HostListener('error')
  onError() {
    this.html.nativeElement.src = '../assets/img/notImage.jpg';
  }
}
