import { Routes } from '@angular/router';
import { authGuardFn } from '@auth/auth.guard';
import { LoggedGuard } from '@auth/logged.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./main/main.component'),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./home/home.routes')
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.routes')
      },
      {
        path: 'tags',
        loadChildren: () => import('./tags/tags.routes')
      },
      {
        path: 'tag/:tagId',
        loadChildren: () => import('./tag/tag.routes')
      },
      {
        path: 'search',
        loadChildren: () => import('./search/search.routes')
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.routes'),
        canActivate: [authGuardFn]
      },
      {
        path: 'list',
        loadChildren: () => import('./list/list.routes')
      },
      {
        path: 'watched_tags',
        loadChildren: () => import('./watched-tags/watched-tags.routes')
      },
      {
        path: 'user/:userId',
        loadChildren: () => import('./user/user.routes')
      },

      {
        path: 'question/:questionId',
        loadChildren: () => import('./question/question.routes')
      },
      {
        path: 'questions/create',
        loadChildren: () => import('./create-question/create-question.routes')
      },
      {
        path: 'edit',
        loadChildren: () => import('./edit/edit.routes')
      },
      {
        path: 'favorites',
        loadChildren: () => import('./favorites/favorites.routes')
      },
      {
        path: 'help',
        loadChildren: () => import('./help/help.routes')
      }
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.routes'),
    canLoad: [LoggedGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.routes'),
    canLoad: [LoggedGuard]
  },
  {
    path: '404',
    loadChildren: () => import('./page-not-found/page-not-found-routes')
  },
  {
    path: '500',
    loadChildren: () =>
      import('./page-internal-server-error/page-internal-server-error.routes')
  },
  {
    path: '**',
    loadChildren: () => import('./page-not-found/page-not-found-routes')
  }
];
