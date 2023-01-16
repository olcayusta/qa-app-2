import { ChangeDetectionStrategy, Component, HostListener, inject, NgZone, OnInit } from '@angular/core';
import { SwPush, SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { RouterOutlet } from '@angular/router';
import { PushNotificationService } from '@shared/services/push-notification.service';
import { ProgressBarComponent } from '@components/progress-bar/progress-bar.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { filter, map } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { BroadcastChannelService } from '@shared/services/broadcast-channel.service';
import { PUBLIC_VAPID_KEY_OF_SERVER } from '@environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProgressBarComponent, MatSnackBarModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  @HostListener('document:keydown', ['$event'])
  async ismetakey($event: KeyboardEvent) {
    const { metaKey, key, shiftKey } = $event;
    if ((metaKey && key === '/') || (shiftKey && key === '?')) {
      const { HotkeyDialogComponent } = await import('@components/dialogs/hotkey-dialog/hotkey-dialog.component');
      /*    this.dialog.open(HotkeyDialogComponent, {
        minWidth: 560
      });*/
    }
  }

  private document = inject(DOCUMENT);
  private snackBar = inject(MatSnackBar);
  private pushService = inject(PushNotificationService);
  private swPush = inject(SwPush);
  private swUpdate = inject(SwUpdate);

  constructor(
    private broadcastChannel: BroadcastChannelService,
    private zone: NgZone // private dialog: MatDialog
  ) {
    // THEME FIX
    // const storageKey = localStorage.getItem('theme-preference');
    // this.loadColorScheme(storageKey!);

    const updatesAvailable = this.swUpdate.versionUpdates.pipe(
      filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
      map((evt) => ({
        type: 'UPDATE_AVAILABLE',
        current: evt.currentVersion,
        available: evt.latestVersion
      }))
    );

    updatesAvailable.subscribe((value) => {
      this.snackBar
        .open('Available update!', 'TAMAM', {
          duration: 4000
        })
        .onAction()
        .subscribe((_) => {
          console.log('The snackbar action was triggered!');
          this.document.location.reload();
        });
    });
  }

  /**
   * Change the theme of the app based on the user's preference.
   * @param scheme The color scheme to use. Either 'light' or 'dark'.
   */
  loadColorScheme(scheme: string) {
    let head = this.document.getElementsByTagName('head')[0];
    let link = this.document.createElement('link');

    link.rel = 'stylesheet';
    link.href = `/${scheme}.css`;

    head.appendChild(link);
  }

  async unsubscribeToPush() {
    const sub = await this.swPush.requestSubscription({
      serverPublicKey: PUBLIC_VAPID_KEY_OF_SERVER
    });

    this.pushService.sendUnsubscriptionToTheServer(sub).subscribe((value) => {
      this.swPush.unsubscribe().then((value1) => {
        console.log('Unsubscribe push!');
      });
    });
  }

  async subscribeToPush() {
    if (this.swPush.isEnabled) {
      try {
        const sub = await this.swPush.requestSubscription({
          serverPublicKey: PUBLIC_VAPID_KEY_OF_SERVER
        });
        /*       const permission = Notification.permission;
        if (permission === 'granted') {
          console.log('Subscription object: ', sub);
        } else {
          console.log('Not subscribed to push service!');
          this.pushService.sendSubscriptionToTheServer(sub).subscribe();
        }*/
        this.pushService.sendSubscriptionToTheServer(sub).subscribe();
      } catch (e) {
        console.error(`Could not subscribe due to:`, e);
      }
    }
  }

  async listenSessionLogout() {
    /*this.broadcastChannel.getMessages().subscribe(async () => {
      const { SessionWarningDialogComponent } = await import(
        './dialogs/session-warning-dialog/session-warning-dialog.component'
      );
      this.zone.run(() => {
        this.dialog.open(SessionWarningDialogComponent, {
          autoFocus: false,
          minWidth: 560
        });
      });
    });*/
  }

  async ngOnInit() {
    await this.subscribeToPush();
  }
}
