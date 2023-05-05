import {
  Component,
  ChangeDetectionStrategy,
  Input,
  inject
} from '@angular/core';
import { Answer } from '@models/answer.model';
import { AnswerService } from '@shared/services/answer.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnswerItemCommentListComponent } from './answer-item-comment-list/answer-item-comment-list.component';
import { HeroDelayDirective } from '../../../directives/hero-delay.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RelativeTimeFormatPipe } from '@shared/pipes/relative-time-format.pipe';
import { ImgShadowComponent } from '@shared/components/img-shadow/img-shadow.component';
import { MatMenuModule } from '@angular/material/menu';
import { IconComponent } from '@components/icon/icon.component';
import { Herov2Directive } from '@shared/directives/herov2.directive';

@Component({
  selector: 'app-answer-item',
  standalone: true,
  imports: [
    AnswerItemCommentListComponent,
    HeroDelayDirective,
    MatButtonModule,
    MatIconModule,
    ImgShadowComponent,
    RelativeTimeFormatPipe,
    RouterLink,
    MatMenuModule,
    IconComponent,
    Herov2Directive
  ],
  templateUrl: './answer-item.component.html',
  styleUrls: ['./answer-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnswerItemComponent {
  @Input() answer!: Answer;
  @Input() acceptedAnswer!: boolean;
  @Input() questionId!: number;

  private answerService = inject(AnswerService);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  acceptAnswer() {
    const questionId = Number(this.route.snapshot.paramMap.get('questionId'));
    this.answerService
      .acceptAnswer(this.answer.id, questionId)
      .subscribe((value) => {
        this.snackBar.open('Doğru cevap olarak işaretlendi');
      });
  }
}
