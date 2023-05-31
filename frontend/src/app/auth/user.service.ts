import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/assets/apiurl';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/userModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  user: BehaviorSubject<any> = new BehaviorSubject(null);

  isExpired: BehaviorSubject<boolean> = new BehaviorSubject(false);
  token: string;

  isLoggedIn() {
    return this.http.get<any>(`${apiUrl}auth/isloggedin`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  getUser(): void {
    this.http
      .post<any>(`${apiUrl}auth/login`, {
        email: 'dev4@eqmaster.pl',
        password: '123456',
      })
      .subscribe((res) => {
        const user = res.data.user;
        this.user.next({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        });
        localStorage.setItem('token', res.token);
      });
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
}
