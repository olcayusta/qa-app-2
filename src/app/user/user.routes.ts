import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Routes
} from '@angular/router';
import { UserComponent } from './user.component';
import { inject } from '@angular/core';
import { UserService } from './user.service';
import { Observable, of } from 'rxjs';
import { User } from '@models/user.model';

const userTitleResolverFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<string> => {
  const { user } = route.parent?.data as { user: User };
  return of(user.displayName);
};

export default [
  {
    path: '',
    component: UserComponent,
    resolve: {
      user: (route: ActivatedRouteSnapshot) => {
        return inject(UserService).getUser(
          Number(route.paramMap.get('userId'))
        );
      }
    },
    children: [
      {
        path: '',
        title: userTitleResolverFn,
        children: [
          {
            path: 'questions',
            loadComponent: () =>
              import('./components/user-questions/user-questions.component'),
            resolve: {
              questions: (route: ActivatedRouteSnapshot) => {
                const userId: number = Number(
                  route.parent!.parent!.paramMap.get('userId')
                );
                return inject(UserService).getUserQuestions(userId);
              }
            }
          },
          {
            path: 'answers',
            loadComponent: () =>
              import('./components/user-answers/user-answers.component'),
            resolve: {
              answers: (route: ActivatedRouteSnapshot) => {
                const userId: number = Number(
                  route.parent!.parent!.paramMap.get('userId')
                );
                return inject(UserService).getUserAnswers(userId);
              }
            }
          }
        ]
      }
    ]
  }
] as Routes;
