import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { TagComponent } from './tag.component';
import { inject } from '@angular/core';
import { TagService } from './tag.service';
import { Tag } from '@models/tag.model';
import { of } from 'rxjs';

export default [
  {
    path: '',
    resolve: {
      tag: (route: ActivatedRouteSnapshot) => {
        return inject(TagService).getTag(route.paramMap.get('tagId'));
      }
    },
    children: [
      {
        path: '',
        component: TagComponent,
        title: (route: ActivatedRouteSnapshot) => {
          const { tag } = route.parent!.data as { tag: Tag };
          return of(tag.title);
        }
      }
    ]
  }
] as Routes;
