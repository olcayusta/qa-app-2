import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
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
