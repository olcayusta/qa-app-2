import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { User } from '@models/user.model';
import { MatButtonModule } from '@angular/material/button';
import { ImgShadowComponent } from '@shared/components/img-shadow/img-shadow.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list-item',
  standalone: true,
  imports: [MatButtonModule, ImgShadowComponent, RouterLink],
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListItemComponent {
  @Input() user!: User;
}
