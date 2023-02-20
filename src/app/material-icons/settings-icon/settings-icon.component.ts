import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-settings-icon',
  standalone: true,
  templateUrl: 'settings_FILL0_wght400_GRAD0_opsz24.svg',
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
export class SettingsIconComponent {}
