import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from './auth/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.isLoggedIn().subscribe((user) => {
      this.userService.user.next(user.data.user);
    });
  }
}
