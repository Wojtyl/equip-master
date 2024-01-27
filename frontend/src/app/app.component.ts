import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from './core/auth/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.userService.isLoggedIn().subscribe({
        next: (user) => {
          this.userService.user.next({ ...user.data.user, token: localStorage.getItem('token') });
        },
        error: (err) => {
          // maybe send to user info?
        },
      });
    }
  }
}
