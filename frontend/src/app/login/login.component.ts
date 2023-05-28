import { Component, OnInit } from '@angular/core';
import { UserService } from '../auth/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private userService: UserService) {}

  login(): void {
    this.userService.getUser();
  }

  logout(): void {
    this.userService.logout();
  }
}
