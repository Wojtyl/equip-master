import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/auth/user.service';
import { ProfileService } from "../../../modules/core/settings/services/profile.service";
import { Profile } from "../../../modules/core/settings/models/Profile";
import { environment } from "src/environments/environment";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, OnDestroy {
  private profileService = inject(ProfileService);
  protected profile: Profile;
  public dropdownOpened: boolean;
  public fallbackUrl = environment.profileFallbackUrl
  private subs = new Subscription();

  constructor(public userService: UserService) {}

  ngOnInit() {
    this.profileService.getProfileDetails().subscribe(data => {
      this.profile = data.items;
    })

    this.subs = this.profileService.profileChanged$.subscribe(profileUrl => this.profile.image = profileUrl);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  logout() {
    this.userService.logout();
  }
}
