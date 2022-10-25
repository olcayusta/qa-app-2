import { Routes } from '@angular/router';
import { TagResolver } from './tag.resolver';
import { TagComponent } from './tag.component';
import { TagTitleResolver } from './resolvers/tag-title.resolver';

export default [
  {
    path: '',
    resolve: {
      tag: TagResolver
    },
    children: [
      {
        path: '',
        component: TagComponent,
        title: TagTitleResolver
      }
    ]
  }
] as Routes;
