import { Component, Input } from '@angular/core';
import { User } from "../../models/User";
import { environment } from "../../../../../../environments/environment";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  @Input() users: User[];
  protected editingUser: User | null;

  protected readonly environment = environment;

  openUserEdit(user: User) {
    this.editingUser = user;
  }

  onUserUpdated(updatedUser: User) {
    const userIdx = this.users.findIndex(user => user._id === updatedUser._id);
    this.users[userIdx] = {
      ...this.users[userIdx],
      ...updatedUser
    }
    this.editingUser = null;
  }
}
