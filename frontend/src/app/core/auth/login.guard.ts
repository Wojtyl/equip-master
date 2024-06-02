import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { UserService } from "./user.service";
import { catchError, map, of } from "rxjs";

export const LoginGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router)
  return userService.isLoggedIn().pipe(
    catchError(() => {
      return of(undefined)
    }),
    map((data) => {
        if (!data) {
          return true;
        }
        router.navigate(['/']);
        return false;
    })
  );
};
