import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/auth/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";
import { trigger } from "@angular/animations";
import { fadeInOutAnimation } from "../../../core/animations/animation";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  animations: [
    trigger('fadeInOut', fadeInOutAnimation())
  ]
})
export class LoginPageComponent implements OnInit {
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
    this.userService.isExpired.subscribe(res => this.isExpired = res);
  }
}
