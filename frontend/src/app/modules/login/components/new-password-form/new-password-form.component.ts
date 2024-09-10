import { Component, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { getQueryParam } from "src/app/core/utils/get-query-param";
import { LoginService } from "src/app/modules/login/services/login.service";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'app-new-password-form',
  templateUrl: './new-password-form.component.html',
  styleUrl: './new-password-form.component.scss'
})
export class NewPasswordFormComponent implements OnInit {
  @Output() public passwordReset = new Subject<boolean>();

  protected token = getQueryParam('token');
  private loginService = inject(LoginService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  protected newPasswordForm: FormGroup;
  protected errorMessage: string;
  public formSubmitted = false;

  ngOnInit() {
    this.newPasswordForm = this.fb.group({
      password: [null, Validators.required],
      passwordConfirm: [null, Validators.required]
    })
  }

  savePassword() {
    this.formSubmitted = true;
    const {password, passwordConfirm} = this.newPasswordForm.getRawValue();
    setTimeout(() => {
      if (password !== passwordConfirm) {
        this.newPasswordForm.setErrors({passwordNotTheSame: true});
        this.formSubmitted = false
      }
      if (this.newPasswordForm.valid) {
        this.loginService.setNewPassword({token: this.token, ...this.newPasswordForm.getRawValue()})
          .subscribe({
              next: () => {
                this.passwordReset.next(true)
              },
              error: (err) => {
                console.log(err)
                this.formSubmitted = false;
                this.errorMessage = err.error.message
                this.newPasswordForm.setErrors({"responseError": true})
              }
            }
          )
      }
    }, 700)
  }

  backToLogin() {
    this.router.navigate(['/login'])
  }
}
