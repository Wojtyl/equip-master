import {Component, Input, OnInit, Output} from '@angular/core';
import {catchError, Subject, tap} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../../../core/auth/user.service";

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrl: './forgot-password-form.component.scss'
})
export class ForgotPasswordFormComponent implements OnInit {

  @Input() mainTitle = ''
  @Output() toggleLogin = new Subject<boolean>();
  resetForm: FormGroup;
  resetSubmitted = false;
  resetError = false;

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService) {
  }

  ngOnInit() {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required]]
    })
  }

  resetPassword() {
    this.resetSubmitted = true;
      this.userService.resetPassword(this.resetForm.get('email')?.value).pipe(
        tap(() => this.resetSubmitted = true),
        catchError((e) => {
          return e
        })
      ).subscribe()
  }
}
