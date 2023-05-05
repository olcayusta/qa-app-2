import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DrawerService } from '../../services/drawer.service';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { IconComponent } from '@components/icon/icon.component';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { NavDrawerComposeComponent } from '@components/nav-drawer-compose/nav-drawer-compose.component';
import { HomeIconComponent } from '../../../home-icon/home-icon.component';

@Component({
  selector: 'app-nav-drawer',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule,
    RouterLinkActive,
    IconComponent,
    RouterLink,
    MatIconModule,
    HomeIconComponent,
    NgIf,
    NavDrawerComposeComponent
  ],
  templateUrl: './nav-drawer.component.html',
  styleUrls: ['./nav-drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavDrawerComponent {
  private pages = [
    { label: 'Ana sayfa', link: '/' },
    { label: 'Kullanıcılar', link: '/users' },
    { label: 'Etiketler', link: '/tags' }
  ];

  private dialog = inject(MatDialog);
  private drawerService = inject(DrawerService);

  onClicked(): void {
    this.drawerService.toggle();
  }

  async experimentalOpenDialog() {
    /*    const { AbcComponent, AbcModule } = await import('./abc/abc.component');
    const ngModuleRef = createNgModuleRef(AbcModule, this.injector);
    this.vcr.createComponent(AbcComponent, {
      ngModuleRef: ngModuleRef
    });
    this.vcr.clear();*/
  }

  async openFeedbackDialog() {
    const { FeedbackDialogComponent } = await import(
      '@dialogs/feedback-dialog/feedback-dialog.component'
    );
    this.dialog.open(FeedbackDialogComponent, {
      autoFocus: 'dialog',
      minWidth: 312,
      maxWidth: 540
    });
  }

  async openWatchedTagsDialog() {
    const { WatchedTagListDialogComponent } = await import(
      '@dialogs/watched-tag-list-dialog/watched-tag-list-dialog.component'
    );
    this.dialog.open(WatchedTagListDialogComponent, {
      minWidth: 512,
      autoFocus: false
    });
  }

  closeSidenav() {
    this.drawerService.toggle().then((value) => {
      console.log('Mat Sidenav Bileseni Kapatildi.');
    });
  }
}
