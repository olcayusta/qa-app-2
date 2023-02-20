import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject
} from '@angular/core';
import { Question } from '@models/question.model';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { AuthService } from '@auth/auth.service';
import { ListService } from './list.service';
import { RelativeTimeFormatPipe } from '@shared/pipes/relative-time-format.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    RelativeTimeFormatPipe,
    MatIconModule,
    MatDividerModule,
    NgForOf,
    AsyncPipe,
    NgIf,
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  questions$!: Observable<Question[]>;

  isLoggedIn$!: Observable<boolean>;

  private readonly listService = inject(ListService);
  private readonly authService = inject(AuthService);

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    if (this.authService.userValue) {
      this.questions$ = this.listService.getMyQuestions().pipe(shareReplay());
    }
  }
}
