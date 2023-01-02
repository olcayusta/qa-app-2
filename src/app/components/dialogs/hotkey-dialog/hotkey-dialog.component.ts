import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

@Component({
  selector: 'app-hotkey-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './hotkey-dialog.component.html',
  styleUrls: ['./hotkey-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotkeyDialogComponent {
}
