import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Question } from '@models/question.model';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-user-questions',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './user-questions.component.html',
  styleUrls: ['./user-questions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class UserQuestionsComponent {
  @Input() questions!: Question[];
}
