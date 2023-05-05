import {
  Directive,
  ElementRef,
  EmbeddedViewRef,
  inject,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core';

import { CopyCodeComponent } from '../../site-code/copy-code.component';

@Directive({
  selector: '[appHerov2]',
  standalone: true
})
export class Herov2Directive implements OnChanges {
  @Input() text!: string;

  private vcr = inject(ViewContainerRef);
  private elementRef: HTMLElement = inject(ElementRef).nativeElement;
  private renderer = inject(Renderer2);

  divElement: HTMLDivElement = this.renderer.createElement('div');

  ngOnChanges(changes: SimpleChanges) {
    this.divElement.innerHTML = this.text;

    const htmlCollection = this.divElement.children;

    Array.from(htmlCollection).forEach((el) => {
      if (el.nodeName === 'PRE') {
        // FIXME (Fragment ile cevaba scroll edilince, PRE etiketi margin-padding algilanmiyor.)
        // this.viewContainerRef.clear();
        const comp = this.vcr.createComponent(CopyCodeComponent);

        comp.setInput('htmlPreElement1', el);

        comp.instance.htmlPreElement1 = el as HTMLPreElement;
        const { rootNodes } =
          comp.hostView as EmbeddedViewRef<CopyCodeComponent>;
        el.replaceWith(rootNodes[0]);
      }
    });

    this.elementRef.appendChild(this.divElement);
  }
}
