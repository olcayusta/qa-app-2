import { AfterViewInit, Directive, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { fromEvent, Subscription, throttleTime } from 'rxjs';
import { distinctUntilChanged, map, pairwise, startWith } from 'rxjs/operators';

@Directive({
  selector: '[appSticky]',
  standalone: true
})
export class StickyDirective implements AfterViewInit, OnDestroy {
  THRESHOLD = 56;
  subscription!: Subscription;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef<HTMLElement>,
    private breakpointObserver: BreakpointObserver
  ) {
  }

  ngAfterViewInit() {
    const isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)');

    if (isSmallScreen) {
      this.subscription = fromEvent(window, 'scroll')
        .pipe(
          throttleTime(100),
          map(() => window.scrollY),
          pairwise(),
          map(([y1, y2]) => y2 < this.THRESHOLD || y2 < y1),
          distinctUntilChanged(),
          startWith(true)
        )
        .subscribe((stuck) => {
          this.renderer.setAttribute(this.elementRef.nativeElement, 'data-stuck', String(stuck));
        });
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
