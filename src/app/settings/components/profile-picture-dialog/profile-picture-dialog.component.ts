import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { AuthService } from '@auth/auth.service';
import { User } from '@models/user.model';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

@Component({
  selector: 'app-profile-picture-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './profile-picture-dialog.component.html',
  styleUrls: ['./profile-picture-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePictureDialogComponent implements OnInit {
  user!: User;

  private authService = inject(AuthService);

  ngOnInit(): void {
    this.user = this.authService.userValue;
  }
}
