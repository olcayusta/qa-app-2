import {
  ApplicationRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  EnvironmentInjector,
  inject,
  Input,
  ViewContainerRef
} from '@angular/core';
import { CopyCodeComponent } from '../../site-code/copy-code.component';

@Directive({
  selector: '[appHeroDelay]',
  standalone: true
})
export class HeroDelayDirective {
  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  fakeDiv: HTMLDivElement = document.createElement('div');

  private viewContainerRef = inject(ViewContainerRef);
  private elementRef: HTMLElement = inject(ElementRef).nativeElement;

  @Input()
  set appHeroDelay(value: string) {
    console.log('triggered.');
    this.fakeDiv.innerHTML = value;

    Array.from(this.fakeDiv.children).forEach((el) => {
      if (el.nodeName === 'PRE') {
        // FIXME (Fragment ile cevaba scroll edilince, PRE etiketi margin-padding algilanmiyor.)
        // this.viewContainerRef.clear();
        const comp = this.viewContainerRef.createComponent(CopyCodeComponent);

        // comp.instance.htmlPreElement = el as HTMLPreElement;

        const codeElement = el.querySelector('code');

        if (codeElement?.className) {
          // @ts-ignore
          comp.instance.language = codeElement?.className
            ?.split('-')[1]
            .toLocaleUpperCase();
          /*     const codeElement = value.querySelector('code') as HTMLElement;
               const lang = codeElement?.className.split('language-')[1];
               const language = hljs.getLanguage(lang);*/
        }

        const { rootNodes } =
          comp.hostView as EmbeddedViewRef<CopyCodeComponent>;
        el.replaceWith(rootNodes[0]);
      }
    });
    // this.elementRef.nativeElement.replaceWith(this.fakeDiv);
    // @ts-ignore

    this.elementRef.appendChild(this.fakeDiv);

    // @ts-ignore
    // this.elementRef.nativeElement.parentNode.appendChild(this.fakeDiv);
  }
}
