import { Component, OnInit } from '@angular/core';
import { UserService } from '../auth/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{
  constructor(private userService: UserService, private router: Router) {}

  isExpired = false;

  ngOnInit(): void {
      this.userService.isExpired.subscribe(res => this.isExpired = res)
  }

  login(): void {
      this.userService.getUser('dev4@eqmaster.pl', '12345').subscribe((res) => {
        const user = res.data.user;

        this.userService.user.next({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: res.token
        });
        localStorage.setItem('token', res.token);
        this.router.navigate(['']);
      });
  }

  logout(): void {
    this.userService.logout();
  }
}
