import { inject } from "@angular/core";
import { AuthService } from "@auth/auth.service";
import { CanActivateFn, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

export const authGuardFn: CanActivateFn = (route, state): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (!authService.userValue) {
    // Store the attempted URL for redirecting
    authService.redirectUrl = state.url;

    // Redirect to the login page
    return router.parseUrl("/login");
  }

  return true;
};
