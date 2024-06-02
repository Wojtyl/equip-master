import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../auth/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserInterceptorService implements HttpInterceptor {
  token: string | undefined;

  constructor(private userService: UserService) {
    this.userService.user.subscribe((user) => {
      if (user) {
        this.token = user.token;
      } else {
        this.token = undefined;
      }
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${this.token}`) });

    return next.handle(authReq);
  }
}
