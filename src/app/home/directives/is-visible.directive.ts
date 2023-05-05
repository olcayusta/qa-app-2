import { AfterViewInit, Directive, ElementRef, EventEmitter, OnDestroy, Output } from '@angular/core';

@Directive({
  selector: '[appIsVisible]',
  standalone: true
})
export class IsVisibleDirective implements AfterViewInit, OnDestroy {
  @Output() intersected = new EventEmitter<boolean>();

  observer!: IntersectionObserver;

  constructor(private elementRef: ElementRef<HTMLDivElement>) {
  }

  /**
   * Create an intersection observer and emit an event when the element is visible
   */
  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(([{ isIntersecting }]) => {
      isIntersecting && this.intersected.emit(true);
    });
    this.observer.observe(this.elementRef.nativeElement);
  }

  /**
   * Destroy the intersection observer if component is destroyed
   */
  ngOnDestroy() {
    this.observer.unobserve(this.elementRef.nativeElement);
  }
}
