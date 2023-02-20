import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  inject,
  Input,
  Renderer2
} from '@angular/core';
import { LazyImgDirective } from '@shared/directives/lazy-img.directive';

@Component({
  selector: 'app-img-shadow',
  standalone: true,
  templateUrl: './img-shadow.component.html',
  styleUrls: ['./img-shadow.component.scss'],
  imports: [LazyImgDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImgShadowComponent {
  @Input() src!: string;
  @Input() alt!: string;
  @Input() itemprop = false;

  @HostBinding('style.width.px') @Input() width: number | string = 40;
  @HostBinding('style.height.px') @Input() height: number | string = 40;

  private elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  private renderer = inject(Renderer2);

  /**
   * Host component set attribute loaded if image is loaded
   */
  onLoad(): void {
    // this.renderer.setAttribute(this.elementRef.nativeElement, 'loaded', '');
    this.elementRef.nativeElement.setAttribute('loaded', '');
  }
}
