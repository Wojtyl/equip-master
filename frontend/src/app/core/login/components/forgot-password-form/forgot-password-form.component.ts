import { Component, Output } from '@angular/core';
import { Subject } from "rxjs";

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrl: './forgot-password-form.component.scss'
})
export class ForgotPasswordFormComponent {

  @Output() toggleLogin = new Subject<boolean>();

  resetPassword() {}
}
