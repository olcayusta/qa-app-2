import {
  provideRouter,
  TitleStrategy,
  withComponentInputBinding,
  withInMemoryScrolling,
  withRouterConfig
} from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { errorInterceptor } from './core/interceptors/http-error.interceptor';
import { jwtInterceptor } from '@auth/interceptors/jwt.interceptor';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MAT_ICON_DEFAULT_OPTIONS } from '@angular/material/icon';
import { AppTitleStrategy } from './core/app-title.strategy';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([errorInterceptor, jwtInterceptor])
    ),
    provideRouter(
      routes,
      withRouterConfig({
        urlUpdateStrategy: 'eager'
      }),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled'
      }),
      withComponentInputBinding()
    ),
    provideAnimations(),
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { horizontalPosition: 'start', duration: 4000 }
    },
    {
      provide: MAT_ICON_DEFAULT_OPTIONS,
      useValue: {
        fontSet: 'material-icons-outlined'
      }
    },
    {
      provide: TitleStrategy,
      useClass: AppTitleStrategy
    },
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
};
