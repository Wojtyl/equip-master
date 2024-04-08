import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../auth/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) {}

  isExpired = false;
  loginForm: FormGroup;

  ngOnInit(): void {
    this.userService.isLoggingIn$.next(true);
      this.userService.isExpired.subscribe(res => this.isExpired = res);

    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  login(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.userService.getUser(this.loginForm.getRawValue()).subscribe((res) => {
        const user = res.data.user;

        this.userService.user.next({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: res.token
        });
        localStorage.setItem('token', res.token);
        this.router.navigate(['/']);
      });
    }
  }

  logout(): void {
    this.userService.logout();
  }

  ngOnDestroy() {
    this.userService.isLoggingIn$.next(false)
  }
}
