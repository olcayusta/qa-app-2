import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { User } from '@models/user.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [MatExpansionModule, MatInputModule, MatButtonModule, MatSlideToggleModule, MatDialogModule, NgIf],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
  user!: User;

  private activatedRoute = inject(ActivatedRoute);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.user = this.activatedRoute.snapshot.data['user'];
  }

  async openProfilePictureDialog() {
    const { ProfilePictureDialogComponent } = await import('./components/profile-picture-dialog/profile-picture-dialog.component');
    this.dialog.open(ProfilePictureDialogComponent, {
      autoFocus: false,
      minWidth: 560
    });
  }
}
