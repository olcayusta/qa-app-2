import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '@components/icon/icon.component';

@Component({
  selector: 'app-home-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './home-icon.component.html',
  styleUrls: ['./home-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeIconComponent {
  @Input() isActive = false;
}
