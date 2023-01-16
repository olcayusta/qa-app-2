import { Routes } from '@angular/router';
import { authGuardFn } from "@auth/auth.guard";
import { LoggedGuard } from '@auth/logged.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/main/main.component'),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./pages/home/home.routes')
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
        loadChildren: () => import('./pages/watched-tags/watched-tags.routes')
      },
      {
        path: 'user/:userId',
        loadChildren: () => import('./user/user.routes')
      },
      {
        path: 'question/:questionId',
        loadChildren: () => import('./pages/question/question.routes')
      },
      {
        path: 'questions/create',
        loadChildren: () => import('./pages/create-question/create-question.routes')
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
    loadChildren: () => import('./pages/login/login.routes'),
    canLoad: [LoggedGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.routes'),
    canLoad: [LoggedGuard]
  },
  {
    path: '404',
    loadChildren: () => import('./page-not-found/page-not-found-routes')
  },
  {
    path: '500',
    loadChildren: () => import('./page-internal-server-error/page-internal-server-error.routes')
  },
  {
    path: '**',
    loadChildren: () => import('./page-not-found/page-not-found-routes')
  }
];
