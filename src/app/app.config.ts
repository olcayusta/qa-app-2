import { ApplicationConfig } from '@angular/platform-browser';
import {
  provideRouter,
  TitleStrategy,
  withInMemoryScrolling,
  withRouterConfig
} from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './core/interceptors/http-error.interceptor';
import { jwtInterceptor } from '@auth/interceptors/jwt.interceptor';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MAT_ICON_DEFAULT_OPTIONS } from '@angular/material/icon';
import { AppTitleStrategy } from './core/app-title.strategy';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([errorInterceptor, jwtInterceptor])),
    provideRouter(
      routes,
      withRouterConfig({
        urlUpdateStrategy: 'eager'
      }),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled'
      })
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
    importProvidersFrom(
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
      })
    )
  ]
};
