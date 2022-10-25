import { AfterViewInit, Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[qaAutofocus]',
  standalone: true
})
export class AutofocusDirective implements AfterViewInit, OnInit {
  constructor(private el: ElementRef<HTMLInputElement>) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.el.nativeElement.focus();
    }, 0);
  }
}
