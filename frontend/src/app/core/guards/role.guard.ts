import { CanActivateFn } from '@angular/router';
import { UserService } from "../auth/user.service";
import { inject } from "@angular/core";
import { map } from "rxjs";

export const roleGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);

  return userService.getUserRole().pipe(
    map(res => {
      return res.role.toLowerCase() === route.data['allowedRole'].toLowerCase();
    })
  )
};
