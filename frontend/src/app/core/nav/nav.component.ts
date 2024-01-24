import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/auth/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  constructor(private userService: UserService) {}

  isAuth: boolean;

  ngOnInit(): void {
    this.userService.user.subscribe((res) => {
      if (res?.id) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    });
  }

  logout() {
    this.userService.logout();
  }
}
