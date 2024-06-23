import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/environments/apiurl';
import {BehaviorSubject} from 'rxjs';
import { Router } from '@angular/router';
import { ListResponse } from "../../shared/models/list-response";
import { User } from "../../modules/core/settings/models/User";

const tokenName = 'token'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  token: string;
  user: BehaviorSubject<any> = new BehaviorSubject(undefined);
  isExpired: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem(tokenName)) {
      this.user.next({ token: localStorage.getItem(tokenName) });
    }
  }

  isLoggedIn() {
    return this.http.get<any>(`${apiUrl}auth/isloggedin`);
  }

  getUser(data :{ email: string, password: string }) {
    return this.http.post<any>(`${apiUrl}auth/login`, data);
  }

  getUserRole() {
    return this.http.get<{role: string}>(`${apiUrl}roles`);
  }

  getUserRoleById(userId: string) {
    return this.http.get<{role: string}>(`${apiUrl}roles/${userId}`);
  }

  logout() {
    this.user.next(undefined);
    this.removeUserToken();
  }

  expiredNotification() {
    this.isExpired.next(true);
    setTimeout(() => {
      this.isExpired.next(false);
    }, 3000);
  }

  refreshUserAuthToken() {
    return;
  }

  resetPassword(email: string) {
    return this.http.post(`${apiUrl}auth/resetPassword`, { email });
  }

  public getUserToken() {
    return localStorage.getItem(tokenName);
  }

  public setUserToken(token: string) {
    return localStorage.setItem(tokenName, token);
  }

  public removeUserToken() {
    localStorage.removeItem(tokenName);
  }

  public getAllUsers() {
    return this.http.get<ListResponse<User[]>>(`${apiUrl}users`);
  }
}
