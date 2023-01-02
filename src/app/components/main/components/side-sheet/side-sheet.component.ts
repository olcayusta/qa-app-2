import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-side-sheet',
  standalone: true,
  imports: [MatToolbarModule, MatCheckboxModule, MatRadioModule],
  templateUrl: './side-sheet.component.html',
  styleUrls: ['./side-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideSheetComponent {
}
