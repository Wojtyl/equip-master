import { Component, inject, OnInit } from '@angular/core';
import { UserService } from "src/app/core/auth/user.service";
import { User } from "../../models/User";

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss'
})
export class UsersPageComponent implements OnInit{

  private usersService = inject(UserService);
  users: User[];
  addingUser = false;

  ngOnInit() {
    this.usersService.getAllUsers().subscribe(data => this.users = data.items);
  }

  openAddUserForm() {
    this.addingUser = true;
  }

  onUserCreated(user: User) {
    this.users.push(user);
    this.addingUser = false;
  }
}
