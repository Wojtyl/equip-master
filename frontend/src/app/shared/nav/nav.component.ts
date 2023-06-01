import { Component } from '@angular/core';
import { UserService } from 'src/app/auth/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  constructor(private userService: UserService){}

  logout(){
    this.userService.logout();
  }
}
