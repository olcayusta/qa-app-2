import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { UserListComponent } from './user-list/user-list.component';
import { User } from '@models/user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UserListComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {
  @Input() users!: User[];
}
