import { Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { inject } from '@angular/core';
import { SettingsService } from './settings.service';

export default [
  {
    path: '',
    component: SettingsComponent,
    resolve: {
      user: () => inject(SettingsService).getAccountSettings()
    }
  }
] as Routes;
