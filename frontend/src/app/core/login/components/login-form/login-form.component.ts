import {Component, Input, OnInit, Output} from '@angular/core';
import {catchError, Subject} from "rxjs";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../auth/user.service";

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
  loginError = false;

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [false]
    })
  }

  login(): void {
    this.loginSubmitted = true;
    this.loginForm.markAllAsTouched();
    setTimeout(() => {
      if (this.loginForm.valid) {
        this.userService.getUser(this.loginForm.getRawValue())
          .pipe(
            catchError(err => {
              this.loginError = true;
              console.log(err)
              // return of(false)
              throw new Error("Bad login")
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
            localStorage.setItem('token', res.token);
            this.router.navigate(['/']);
          });
      }
    }, 600)
  }
}
