import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IconComponent } from '@components/icon/icon.component';

@Component({
  selector: 'app-mini-guide-renderer',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    IconComponent
  ],
  templateUrl: './mini-guide-renderer.component.html',
  styleUrls: ['./mini-guide-renderer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MiniGuideRendererComponent {}
