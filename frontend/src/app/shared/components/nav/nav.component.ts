import { Component, inject, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/auth/user.service';
import { ProfileService } from "../../../modules/core/settings/services/profile.service";
import { Profile } from "../../../modules/core/settings/models/Profile";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  private profileService = inject(ProfileService);
  protected profile: Profile;
  dropdownOpened: boolean;

  constructor(public userService: UserService) {}

  ngOnInit() {
    this.profileService.getProfileDetails().subscribe(data => {
      this.profile = data.items;
    })
  }

  logout() {
    this.userService.logout();
  }
}
