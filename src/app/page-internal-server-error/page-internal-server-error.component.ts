import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'apps-page-internal-server-error',
  standalone: true,
  templateUrl: './page-internal-server-error.component.html',
  styleUrls: ['./page-internal-server-error.component.scss'],
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageInternalServerErrorComponent {}
