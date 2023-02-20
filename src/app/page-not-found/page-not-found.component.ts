import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNotFoundComponent {
  imgURL = 'https://i.giphy.com/media/KGTEppMWKRVvsCB0pw/giphy.webp';
}
