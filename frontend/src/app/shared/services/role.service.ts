import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserService } from "../../core/auth/user.service";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private http: HttpClient, private userService: UserService) { }

  isAdmin() {
    return this.userService.getUserRole().pipe(
        map(res => {
          return res.role.toLowerCase() === 'admin';
        })
    )
  }

  isManager() {
    return this.userService.getUserRole().pipe(
        map(res => {
          return res.role.toLowerCase() === 'manager';
        })
    )
  }

  isEmployee() {
    return this.userService.getUserRole().pipe(
        map(res => {
          return res.role.toLowerCase() === 'employee';
        })
    )
  }

  isUser() {
    return this.userService.getUserRole().pipe(
        map(res => {
          return res.role.toLowerCase() === 'user';
        })
    )
  }
}
