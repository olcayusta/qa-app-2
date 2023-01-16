import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Type,
  ElementRef,
  ChangeDetectorRef,
  Injectable
} from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NotificationService } from '@shared/services/notification.service';
import { OverlayModule, ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';

import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AsyncPipe, NgComponentOutlet } from '@angular/common';
import { PopupContainerComponent } from '@components/popup-container/popup-container.component';
import { NotificationListPopupComponent } from '@popups/notification-list-popup/notification-list-popup.component';
import { IconComponent } from '@components/icon/icon.component';
import { MatIconModule } from '@angular/material/icon';

@Injectable()
export class Greeter {
  suffix = '!';
}

@Component({
  selector: 'app-notification-button',
  standalone: true,
  imports: [OverlayModule, MatButtonModule, MatBadgeModule, MatTooltipModule, AsyncPipe, NgComponentOutlet, IconComponent, PopupContainerComponent, MatIconModule],
  templateUrl: './notification-button.component.html',
  styleUrls: ['./notification-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationButtonComponent implements OnInit {
  notificationCount$!: Observable<number>;

  popupOpened = false;

  scrollStrategy: ScrollStrategy = this.sso.block();
  NotificationListPopupComponent!: Type<NotificationListPopupComponent>;

  constructor(
    private notificationService: NotificationService,
    private sso: ScrollStrategyOptions,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.notificationCount$ = this.notificationService.getUnseenCount().pipe(
      map((notification) => notification.unseenCount),
      shareReplay()
    );
  }

  async togglePopup(): Promise<void> {
    if (this.popupOpened) {
      this.popupOpened = false;
    } else {
      await this.loadComponent();
      this.popupOpened = true;
      this.cdr.markForCheck();
    }
  }

  async loadComponent() {
    const { NotificationListPopupComponent } = await import('@popups/notification-list-popup/notification-list-popup.component')
    this.NotificationListPopupComponent = NotificationListPopupComponent;
  }

  /**
   * Close the popup when the user clicks outside it.
   * @param $event
   */
  closePopupOnOutsideClicked($event: MouseEvent) {
    if (!$event.composedPath().includes(this.elementRef.nativeElement)) {
      this.popupOpened = false;
    }
  }
}
