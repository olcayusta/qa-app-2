import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject
} from '@angular/core';

@Component({
  selector: 'app-dark-mode-icon',
  standalone: true,
  templateUrl: 'dark_mode_FILL0_wght400_GRAD0_opsz24.svg',
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
export class DarkModeIconComponent {
  private cdr = inject(ChangeDetectorRef);

  constructor() {
    this.cdr.detach();
  }
}
