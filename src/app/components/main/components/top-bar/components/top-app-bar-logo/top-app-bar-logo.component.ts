import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-top-app-bar-logo',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './top-app-bar-logo.component.html',
  styleUrls: ['./top-app-bar-logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopAppBarLogoComponent {}
