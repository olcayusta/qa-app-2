import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

@Component({
  selector: 'app-flag-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './flag-dialog.component.html',
  styleUrls: ['./flag-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlagDialogComponent {
}
