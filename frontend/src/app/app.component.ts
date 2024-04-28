import {Component, inject, OnInit} from '@angular/core';
import { UserService } from './core/auth/user.service';
import {LoginService} from "./modules/login/services/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private loginService = inject(LoginService);
  private userService = inject(UserService);

  ngOnInit(): void {
    if (this.userService.getUserToken()) {
      this.userService.isLoggedIn().subscribe({
        next: (user) => {
          this.userService.user.next({ ...user.data.user, token: this.userService.getUserToken() });
        },
        error: (err) => {
          // maybe send to user info?
        },
      });
    }

    window.addEventListener('beforeunload', () => {
      // TODO: Enhance remember me functionality. Current setup removes token even if browser is refreshed.
      //  Probably better solution will be add logic with session storage
      if (!this.loginService.userRemembered) {
        this.userService.removeUserToken();
      }
    })
  }
}
