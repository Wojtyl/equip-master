import { Component, Output } from '@angular/core';
import { Subject } from "rxjs";

@Component({
  selector: 'app-new-password-confirm',
  templateUrl: './new-password-confirm.component.html',
  styleUrl: './new-password-confirm.component.scss'
})
export class NewPasswordConfirmComponent {
  // @Output() back = new Subject<null>()
  //
  // goToLogin() {
  //   this.back.next(null);
  // }
}
