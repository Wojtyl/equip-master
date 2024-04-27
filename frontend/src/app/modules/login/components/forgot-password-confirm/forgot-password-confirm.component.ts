import {Component, Output} from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'app-forgot-password-confirm',
  templateUrl: './forgot-password-confirm.component.html',
  styleUrl: './forgot-password-confirm.component.scss'
})
export class ForgotPasswordConfirmComponent {
  @Output() back = new Subject<null>()

  goToLogin() {
    this.back.next(null);
  }
}
