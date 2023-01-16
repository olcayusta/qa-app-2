import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { User } from '@models/user.model';
import { AuthService } from '@auth/auth.service';
import { SocketService } from '@shared/services/socket.service';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { IconComponent } from '@components/icon/icon.component';

@Component({
  selector: 'app-user-profile-popup',
  standalone: true,
  imports: [MatListModule, RouterLink, IconComponent],
  templateUrl: './user-profile-popup.component.html',
  styleUrls: ['./user-profile-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfilePopupComponent implements OnInit {
  user!: User;

  constructor(private authService: AuthService, private socketService: SocketService) {
  }

  ngOnInit(): void {
    this.user = this.authService.userValue;
  }

  logout(): void {
    this.authService.logout();
    this.socketService.disconnect();
    window.location.reload();
  }
}
