import { AfterViewInit, Directive, ElementRef, OnInit, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[inekDeepLazy]',
  standalone: true
})
export class DeepLazyDirective implements OnInit, AfterViewInit {
  imgSrc!: string;

  constructor(private elementRef: ElementRef<HTMLDivElement>, private vcr: ViewContainerRef) {
  }

  ngAfterViewInit() {
    if (this.elementRef.nativeElement.querySelector('img')) {
      // @ts-ignore
      this.elementRef.nativeElement.querySelector('img').src = '';
    }
  }

  ngOnInit() {
    this.imgSrc = this.elementRef.nativeElement.querySelector('img')?.src!;
    if (this.elementRef.nativeElement.querySelector('img')) {
      const intersectionObserver = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          // @ts-ignore
          this.elementRef.nativeElement.querySelector('img').src = this.imgSrc;
          intersectionObserver.unobserve(this.elementRef.nativeElement.querySelector('img')!);
        }
      });
      intersectionObserver.observe(this.elementRef.nativeElement.querySelector('img')!);
    }
  }
}
