import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  OnInit,
  Type
} from '@angular/core';
import {
  OverlayModule,
  ScrollStrategy,
  ScrollStrategyOptions
} from '@angular/cdk/overlay';
import { User } from '@models/user.model';
import { AuthService } from '@auth/auth.service';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgComponentOutlet } from '@angular/common';
import { UserProfilePopupComponent } from '@popups/user-profile-popup/user-profile-popup.component';
import { ImgShadowComponent } from '@shared/components/img-shadow/img-shadow.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { PopupContainerComponent } from '../../../../../popup-container/popup-container.component';

@Component({
  selector: 'app-avatar-button',
  standalone: true,
  imports: [
    NgComponentOutlet,
    ImgShadowComponent,
    PopupContainerComponent,
    OverlayModule,
    MatTooltipModule,
    MatRippleModule
  ],
  templateUrl: './avatar-button.component.html',
  styleUrls: ['./avatar-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarButtonComponent implements OnInit {
  user!: User;
  popupOpened = false;
  UserProfilePopupComponent!: Type<UserProfilePopupComponent>;
  isHandset$!: Observable<boolean>;

  private authService = inject(AuthService);
  private elementRef = inject(ElementRef);
  private cdr = inject(ChangeDetectorRef);
  private sso = inject(ScrollStrategyOptions);
  private breakpointObserver = inject(BreakpointObserver);

  scrollStrategy: ScrollStrategy = this.sso.block();

  ngOnInit(): void {
    this.user = this.authService.userValue;
    this.isHandset$ = this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(map(({ matches }) => matches));
  }

  /**
   * Toggles the popup.
   */
  async togglePopup(): Promise<void> {
    if (this.popupOpened) {
      this.popupOpened = false;
    } else {
      await this.loadComponent();
      this.popupOpened = true;
      this.cdr.markForCheck();
    }
  }

  /**
   * Loads the user profile popup component.
   */
  async loadComponent(): Promise<void> {
    const { UserProfilePopupComponent } = await import(
      '@popups/user-profile-popup/user-profile-popup.component'
    );
    this.UserProfilePopupComponent = UserProfilePopupComponent;
  }

  /**
   * Closes the popup if outside the popup is clicked.
   * @param $event
   */
  closePopupOnOutsideClicked($event: MouseEvent) {
    if (!$event.composedPath().includes(this.elementRef.nativeElement)) {
      this.popupOpened = false;
    }
  }
}
