import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { NotificationService } from '@shared/services/notification.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { Notification } from '@models/notification.model';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { RelativeTimeFormatPipe } from '@shared/pipes/relative-time-format.pipe';

@Component({
  selector: 'app-notification-list-popup',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatListModule, NgIf, AsyncPipe, NgForOf, RelativeTimeFormatPipe],
  templateUrl: './notification-list-popup.component.html',
  styleUrls: ['./notification-list-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationListPopupComponent implements OnInit {
  notifications$!: Observable<Notification[]>;

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.notifications$ = this.notificationService.getAllNotifications();
  }
}
