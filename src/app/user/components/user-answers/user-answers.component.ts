import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Answer } from '@models/answer.model';
import { RouterLink } from '@angular/router';
import { RelativeTimeFormatPipe } from '@shared/pipes/relative-time-format.pipe';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-user-answers',
  standalone: true,
  imports: [RelativeTimeFormatPipe, NgForOf, RouterLink],
  templateUrl: './user-answers.component.html',
  styleUrls: ['./user-answers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class UserAnswersComponent {
  @Input() answers!: Answer[];
}
