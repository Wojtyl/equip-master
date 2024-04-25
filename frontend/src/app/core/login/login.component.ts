import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../auth/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";
import { trigger } from "@angular/animations";
import { fadeInOutAnimation } from "../animations/animation";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeInOut', fadeInOutAnimation())
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private userService: UserService,
              private router: Router,
              private fb: FormBuilder,
              private route: ActivatedRoute
  ) {
  }

  isExpired = false;
  loginForm: FormGroup;
  isLogin = true

  ngOnInit(): void {
    const isResettingPassword = this.route.snapshot.queryParams['resetPassword']
    if (isResettingPassword) this.isLogin = false;
    this.userService.isLoggingIn$.next(true);
    this.userService.isExpired.subscribe(res => this.isExpired = res);
  }

  ngOnDestroy() {
    this.userService.isLoggingIn$.next(false)
  }
}
