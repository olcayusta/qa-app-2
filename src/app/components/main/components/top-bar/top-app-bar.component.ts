import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
  Type
} from '@angular/core';
import { User } from '@models/user.model';
import { AuthService } from '@auth/auth.service';
import { Observable } from 'rxjs';
import { StateService } from '@shared/services/state.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { NotificationButtonComponent } from './components/notification-button/notification-button.component';
import { AvatarButtonComponent } from './components/avatar-button/avatar-button.component';
import { DrawerService } from '../../services/drawer.service';
import { map } from 'rxjs/operators';
import { Event, NavigationStart, Router, RouterLink } from '@angular/router';
import { TopAppBarLogoComponent } from './components/top-app-bar-logo/top-app-bar-logo.component';
import { AsyncPipe, NgComponentOutlet, NgIf } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { IconComponent } from '@components/icon/icon.component';

@Component({
  selector: 'app-top-app-bar',
  standalone: true,
  imports: [
    SearchFormComponent,
    TopAppBarLogoComponent,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    NgComponentOutlet,
    NgIf,
    AsyncPipe,
    MatTooltipModule,
    RouterLink,
    MatBadgeModule,
    MatIconModule,
    IconComponent
  ],
  templateUrl: './top-app-bar.component.html',
  styleUrls: ['./top-app-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopAppBarComponent implements OnInit {
  @Output() openSheet = new EventEmitter();

  isLoggedIn$!: Observable<boolean>;
  user!: User;

  isHandset$!: Observable<boolean>;

  isWeb$!: Observable<boolean>;

  componentsLoaded = false;

  searchFormComponentOutlet!: Type<SearchFormComponent>;
  NotificationButtonComponent!: Type<NotificationButtonComponent>;
  AvatarButtonComponent!: Type<AvatarButtonComponent>;

  constructor(
    private authService: AuthService,
    private stateService: StateService,
    private breakpointObserver: BreakpointObserver,
    private changeDetectorRef: ChangeDetectorRef,
    private drawerService: DrawerService,
    private router: Router
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.isLoggedIn$ = this.authService.isLoggedIn$;

    if (this.authService.userValue) {
      const [{ NotificationButtonComponent }, { AvatarButtonComponent }] = await Promise.all([
        this.loadNotificationButtonComponent(),
        this.loadAvatarButtonComponent()
      ]);

      this.AvatarButtonComponent = AvatarButtonComponent;
      this.NotificationButtonComponent = NotificationButtonComponent;

      this.componentsLoaded = true;
      this.changeDetectorRef.markForCheck();
    }

    /**
     * Load components if breakpoint is wider than handset.
     */
    this.breakpointObserver.observe(Breakpoints.Web).subscribe(async ({ matches }) => {
      if (matches) {
        await this.loadSearchFormComponent();
      }
    });

    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(({ matches }) => matches));

    this.isWeb$ = this.breakpointObserver.observe(Breakpoints.Web).pipe(map(({ matches }) => matches));

    this.router.events.subscribe((value: Event) => {
      if (value instanceof NavigationStart) {
        if (value.url.includes('question')) {
        }
      }
    });
  }

  async loadAvatarButtonComponent() {
    return await import('./components/avatar-button/avatar-button.component');
  }

  async loadNotificationButtonComponent() {
    return await import('./components/notification-button/notification-button.component');
  }

  /**
   * Search Form Bileşenini desktop ise yükle...
   */
  async loadSearchFormComponent() {
    const { SearchFormComponent } = await import('./components/search-form/search-form.component');
    this.searchFormComponentOutlet = SearchFormComponent;
    this.changeDetectorRef.markForCheck();
  }

  async toggleSidenav() {
    await this.drawerService.toggle();
  }

  signInButtonClicked() {
    this.authService.redirectUrl = this.router.url;
  }
}
