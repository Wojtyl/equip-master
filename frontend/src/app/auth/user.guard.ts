import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './user.service';
import { catchError, map, of, take } from 'rxjs';

export const UserGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService.isLoggedIn().pipe(
    catchError((err) => {
      if (err.error.status === 'expired') {
        userService.expiredNotification();
        localStorage.removeItem('token');
      }
      router.navigate(['login']);
      return of(false);
    }),
    take(1),
    map((res) => {
      if (res.status === 'success') {
        return true;
      } else {
        router.navigate(['login']);
        return false;
      }
    })
  );
};
