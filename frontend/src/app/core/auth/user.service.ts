import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/environments/apiurl';
import {BehaviorSubject, tap} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  token: string;
  user: BehaviorSubject<any> = new BehaviorSubject(undefined);
  isExpired: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isLoggedIn$ = new BehaviorSubject(false);
  isLoggingIn$ = new BehaviorSubject(false);

  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem('token')) {
      this.user.next({ token: localStorage.getItem('token') });
    }
  }


  isLoggedIn() {
    return this.http.get<any>(`${apiUrl}auth/isloggedin`);
  }

  getUser(data :{ email: string, password: string }) {
    return this.http.post<any>(`${apiUrl}auth/login`, data).pipe(tap(() => this.isLoggedIn$.next(true)));
  }

  getUserRole() {
    return this.http.get<{role: string}>(`${apiUrl}roles`);
  }

  getUserRoleById(userId: string) {
    return this.http.get<{role: string}>(`${apiUrl}roles/${userId}`);
  }

  logout() {
    this.user.next(undefined);
    this.isLoggingIn$.next(true);
    localStorage.removeItem('token');
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
}
