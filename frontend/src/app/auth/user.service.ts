import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/assets/apiurl';
import { User } from '../models/userModel';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  user: any = new BehaviorSubject(undefined);

  isAuth: BehaviorSubject<boolean> = new BehaviorSubject(false);

  token: string;

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
        localStorage.setItem('bearer', res.token);
        this.isAuth.next(true);
      });
  }

  logout() {
    this.user.next(undefined);
    localStorage.removeItem('bearer');
    this.isAuth.next(false);
  }
}
