import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject
} from '@angular/core';

@Component({
  selector: 'app-keyboard-icon',
  standalone: true,
  templateUrl: 'keyboard_FILL0_wght400_GRAD0_opsz24.svg',
  styles: [
    `
      :host {
        width: 24px;
        height: 24px;
        display: flex;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeyboardIconComponent {
  constructor() {
    inject(ChangeDetectorRef).detach();
  }
}
