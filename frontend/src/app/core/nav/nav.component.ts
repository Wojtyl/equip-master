import { Component } from '@angular/core';
import { UserService } from 'src/app/core/auth/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  constructor(public userService: UserService) {}

  logout() {
    this.userService.logout();
  }
}
