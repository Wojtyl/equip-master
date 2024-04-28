import {Component, inject, Input, OnInit, Output} from '@angular/core';
import {Subject, tap} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../../../core/auth/user.service";

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrl: './forgot-password-form.component.scss'
})
export class ForgotPasswordFormComponent implements OnInit {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private userService = inject(UserService);

  @Input() mainTitle = ''
  @Output() toggleLogin = new Subject<boolean>();
  @Output() passwordReseted = new Subject<boolean>()
  resetForm: FormGroup;
  resetSubmitted = false;

  get formValid() {
    return this.resetForm.valid;
  }

  ngOnInit() {
    this.resetForm = this.fb.group({
      email: [null, [Validators.required]]
    })
  }

  resetPassword() {
    this.resetSubmitted = true;
    this.userService.resetPassword(this.resetForm.get('email')?.value).pipe(
      tap(() => this.resetSubmitted = true),
    ).subscribe(
      {
        next: () => {
          setTimeout(() => {
            this.passwordReseted.next(true);
          }, 1000)
        },
        error: () => {
          setTimeout(() => {
            this.resetForm.setErrors({'userNotFound': true})
            this.resetSubmitted = false;
          }, 700)
        }
      }
    )
  }
}
