import { Component, inject, Input, OnInit, Output } from '@angular/core';
import { catchError, of, Subject } from "rxjs";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../../../core/auth/user.service";
import { HttpErrorResponse } from "@angular/common/http";
import { LoginService } from "../../services/login.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit {
  @Input() mainTitle = ''
  @Output() toggleLogin = new Subject<boolean>();
  loginForm: FormGroup;
  loginSubmitted = false;
  private loginService = inject(LoginService);

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [true]
    })
  }

  login(): void {
    this.loginSubmitted = true;
    this.loginForm.markAllAsTouched();
    setTimeout(() => {
      if (this.loginForm.valid) {
        this.userService.getUser(this.loginForm.getRawValue())
          .pipe(
            catchError((err: HttpErrorResponse) => {
              this.loginSubmitted = false;
              if (err.status === 401) {
                this.loginForm.setErrors({wrongCredentials: true})
                throw new Error("Incorrect username or password")
              }
              if (err.status === 400) {
                throw new Error(err.error.message)
              }
              return of(err)
            })
          )
          .subscribe((res) => {
            const user = res.data.user;
            this.userService.user.next({
              id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
              token: res.token
            });
            this.userService.setUserToken(res.token);
            if (!this.loginForm.get('remember')?.value) this.loginService.userRemembered = false;
            this.router.navigate(['/']);
          });
      }
    }, 600)
  }
}
