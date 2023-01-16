import { ResolveFn, Routes } from '@angular/router';
import { SearchComponent } from './search.component';
import { of } from 'rxjs';

export const searchTitleResolveFn: ResolveFn<string> = (route, state) => {
  const { q } = route.queryParams;
  return of(q);
};

export default [
  {
    path: '',
    component: SearchComponent,
    title: searchTitleResolveFn
  }
] as Routes;
