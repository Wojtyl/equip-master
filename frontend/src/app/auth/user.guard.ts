import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class UserGuard implements CanActivate {
  constructor(private userService: UserService) {}

  isAuth: boolean = false;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.userService.isAuth.subscribe((res) => (this.isAuth = res));

    if (this.isAuth) {
      return true;
    } else {
      console.log(route, state);
      return false;
    }
  }
}
