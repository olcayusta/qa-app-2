import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [MatListModule, NgForOf, MatIconModule, NgIf],
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpComponent {
  folders = [
    {
      name: 'Oyunlar',
      updated: 'Bugün'
    },
    {
      name: 'Müzikler',
      updated: 'Evvelsi gün'
    }
  ];
  notes = [
    {
      name: 'Market Alışverişi',
      updated: 'Bugün'
    }
  ];
}
