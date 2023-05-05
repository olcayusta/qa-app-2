import { Directive, ElementRef, inject, OnInit } from '@angular/core';

@Directive({
  standalone: true,
  selector: 'code'
})
export class PenguinDirective implements OnInit {
  private elementRef = inject(ElementRef);

  ngOnInit() {}
}
