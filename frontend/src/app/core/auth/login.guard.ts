import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { UserService } from "./user.service";
import { catchError, map, of, take } from "rxjs";

export const LoginGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router)
  return userService.isLoggedIn().pipe(
    catchError(() => {
      userService.isLoggingIn$.next(true);
      return of(true)
    }),
    take(1),
    map(() => {
        console.log('success')
        // router.navigate(['/']);
        return true;
    })
  );
};
