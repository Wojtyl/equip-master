import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { AccountSettingsPageComponent } from './pages/account-settings-page/account-settings-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { SharedModule } from "../../../shared/shared.module";
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';


@NgModule({
  declarations: [
    AccountSettingsPageComponent,
    ProfilePageComponent,
    UsersPageComponent,
    UsersListComponent,
    UserFormComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule
  ]
})
export class SettingsModule {
}
