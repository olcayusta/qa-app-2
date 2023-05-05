import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export default [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  }
] as Routes;
