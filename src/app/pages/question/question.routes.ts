import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';
import { QuestionComponent } from './question.component';
import { inject } from '@angular/core';
import { QuestionService } from './question.service';
import { Question } from '@models/question.model';
import { of } from 'rxjs';

export const questionTitleResolveFn: ResolveFn<string> = (route) => {
  const { question } = route.parent?.data as { question: Question };
  return of(question.title);
};

export default [
  {
    path: '',
    resolve: {
      question: ({ paramMap }: ActivatedRouteSnapshot) =>
        inject(QuestionService).getQuestion(paramMap.get('questionId')!)
    },
    children: [
      {
        path: '',
        component: QuestionComponent,
        title: questionTitleResolveFn
      }
    ]
  }
] as Routes;
