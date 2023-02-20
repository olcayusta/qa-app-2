import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '@components/icon/icon.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-drawer-compose',
  standalone: true,
  imports: [CommonModule, IconComponent, MatButtonModule, RouterLink],
  templateUrl: './nav-drawer-compose.component.html',
  styleUrls: ['./nav-drawer-compose.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavDrawerComposeComponent {}
