import { Routes } from '@angular/router';
import { QuestionComponent } from './question.component';
import { QuestionResolver } from './question.resolver';
import { QuestionTitleResolver } from './resolvers/question-title.resolver';

export default [
  {
    path: '',
    resolve: {
      question: QuestionResolver
    },
    children: [
      {
        path: '',
        component: QuestionComponent,
        title: QuestionTitleResolver
      }
    ]
  }
] as Routes;
