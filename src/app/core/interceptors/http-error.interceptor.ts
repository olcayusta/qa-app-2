import { inject } from '@angular/core';
import {
  HttpRequest,
  HttpEvent,
  HttpErrorResponse,
  HttpContextToken,
  HttpHandlerFn
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

export const BYPASS_ERROR = new HttpContextToken(() => false);

export function errorInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const router = inject(Router);

  if (req.context.has(BYPASS_ERROR)) {
    return next(req);
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 404) {
        router.navigateByUrl('404', {
          replaceUrl: true,
          skipLocationChange: true
        });
      }

      if (error.status === 500) {
        router.navigateByUrl('500', {
          replaceUrl: true,
          skipLocationChange: true
        });
      }
      return EMPTY;
    })
  );
}
