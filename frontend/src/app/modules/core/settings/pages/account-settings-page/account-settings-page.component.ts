import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-account-settings-page',
  templateUrl: './account-settings-page.component.html',
  styleUrl: './account-settings-page.component.scss'
})
export class AccountSettingsPageComponent implements OnInit {
  private fb = inject(FormBuilder);

  editPasswordForm: FormGroup;

  ngOnInit() {
    this.editPasswordForm = this.fb.group( {
      oldPassword: ['123', Validators.required],
      newPassword: ['', Validators.required],
      newPasswordRepeat: ['', [Validators.required]]
    });
  }
}
