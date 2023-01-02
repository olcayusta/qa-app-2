import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';

@Component({
  selector: 'app-watched-tag-list-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatChipsModule, MatIconModule],
  templateUrl: './watched-tag-list-dialog.component.html',
  styleUrls: ['./watched-tag-list-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WatchedTagListDialogComponent {

}
