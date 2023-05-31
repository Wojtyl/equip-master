import { Component, OnInit } from '@angular/core';
import { UserService } from '../auth/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{
  constructor(private userService: UserService) {}

  isExpired: boolean = false;

  ngOnInit(): void {
      this.userService.isExpired.subscribe(res => this.isExpired = res)
  }

  login(): void {
    this.userService.getUser();
  }

  logout(): void {
    this.userService.logout();
  }
}
