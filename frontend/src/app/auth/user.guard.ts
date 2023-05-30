import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UserService } from "./user.service";
import { map, take } from "rxjs";

export const UserGuard: CanActivateFn = async (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  // let isAuth;

  // if (localStorage.getItem("bearer")) {
  //   await userService.isLoggedIn();
  //   userService.isAuth.subscribe((res) => (isAuth = res));
  //   console.log(isAuth);
  // }

  // if (isAuth) {
  //   return true;
  // }

  // return router.createUrlTree(["login"]);
  let retur = true;
  userService.isLoggedIn()!.pipe(
    take(1),
    map((res) => {
      console.log(res);
      retur = false;
    })
  );

  return false;
};
