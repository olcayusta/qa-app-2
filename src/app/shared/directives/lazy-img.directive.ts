import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  OnDestroy,
  OnInit
} from '@angular/core';

@Directive({
  selector: '[appLazyImg]',
  standalone: true
})
export class LazyImgDirective implements OnInit, OnDestroy, AfterViewInit {
  // @HostBinding('attr.src') src = null;
  imgSrc!: string;

  intersectionObserver!: IntersectionObserver;

  private elementRef = inject(ElementRef<HTMLImageElement>);

  ngAfterViewInit() {}

  init() {
    const { nativeElement } = this.elementRef;
    this.imgSrc = nativeElement.src;

    this.intersectionObserver = new IntersectionObserver(
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          nativeElement.src = this.imgSrc;
          this.intersectionObserver.unobserve(nativeElement);
        }
      }
    );
    this.intersectionObserver.observe(nativeElement);
  }

  ngOnInit(): void {
    /*    if ('loading' in HTMLImageElement.prototype) {
      console.log('Lazy loading supported!');
      this.elementRef.nativeElement.decoding = 'async';
      /!*     const { nativeElement: img } = this.elementRef;
      img.loading = 'lazy';
      img.decoding = 'async';*!/
    }*/
    // this.init();
  }

  ngOnDestroy() {
    // this.intersectionObserver.unobserve(this.elementRef.nativeElement);
  }
}
