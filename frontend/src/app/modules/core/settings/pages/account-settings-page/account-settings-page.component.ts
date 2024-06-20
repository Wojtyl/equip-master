import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProfileService } from "../../services/profile.service";
import { ResetPasswordForm } from "../../models/reset-password-form";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-account-settings-page',
  templateUrl: './account-settings-page.component.html',
  styleUrl: './account-settings-page.component.scss'
})
export class AccountSettingsPageComponent implements OnInit {
  private fb = inject(FormBuilder);
  private profileService = inject(ProfileService);

  editPasswordForm: FormGroup;
  updateError: string | null;
  passwordResetConfirm: boolean;

  ngOnInit() {
    this.editPasswordForm = this.fb.group( {
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      newPasswordRepeat: ['', [Validators.required]]
    });

    this.editPasswordForm.valueChanges.subscribe(() => {
      this.updateError = null;
    })
  }

  submit() {
    this.profileService.changePassword(this.editPasswordForm.getRawValue() as ResetPasswordForm).subscribe({
      next: () => {
        this.passwordResetConfirm = true;
        this.editPasswordForm.reset();
        setTimeout(() => {this.passwordResetConfirm = false}, 4000)
      },
      error: (err: HttpErrorResponse) => {
        this.updateError = err.error.message;
      }
    })
  }
}
