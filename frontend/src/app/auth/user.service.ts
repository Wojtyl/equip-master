import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/assets/apiurl';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/userModel';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem('token')) {
      this.user.next({ token: localStorage.getItem('token') });
    }
  }

  user: BehaviorSubject<any> = new BehaviorSubject(undefined);

  isExpired: BehaviorSubject<boolean> = new BehaviorSubject(false);

  token: string;

  isLoggedIn() {
    return this.http.get<any>(`${apiUrl}auth/isloggedin`);
  }

  getUser(email: string, password: string) {
    return this.http.post<any>(`${apiUrl}auth/login`, {
      email,
      password,
    });
  }

  getUserRole() {
    return this.http.get<{role: string}>(`${apiUrl}roles`);
  }

  getUserRoleById(userId: string) {
    return this.http.get<{role: string}>(`${apiUrl}roles/${userId}`);
  }

  logout() {
    this.user.next(undefined);
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
