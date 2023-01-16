import { ChangeDetectionStrategy, Component } from '@angular/core';
import { User } from '@models/user.model';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgForOf } from '@angular/common';
import { RelativeTimeFormatPipe } from '@shared/pipes/relative-time-format.pipe';
import { MyDatePipe } from '@shared/pipes/my-date.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ImgShadowComponent } from '@shared/components/img-shadow/img-shadow.component';
import { getSnapshotData } from '../core/router.utils';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatIconModule,
    MatTabsModule,
    MyDatePipe,
    RelativeTimeFormatPipe,
    ImgShadowComponent,
    RouterOutlet,
    NgForOf,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {
  user: User = <User>getSnapshotData('user');

  links = [
    {
      path: '/',
      label: 'Ana Sayfa'
    },
    {
      path: '/questions',
      label: 'Sorular'
    },
    {
      path: '/answers',
      label: 'Cevaplar'
    },
    {
      path: '/tags',
      label: 'Etiketler'
    },
    {
      path: '/bookmarks',
      label: 'Bookmarks'
    }
  ];

}
