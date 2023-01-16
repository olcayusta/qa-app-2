import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { AuthService } from '@auth/auth.service';
import { User } from '@models/user.model';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

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
