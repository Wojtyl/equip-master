import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { AccountSettingsPageComponent } from './pages/account-settings-page/account-settings-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';


@NgModule({
  declarations: [
    AccountSettingsPageComponent,
    ProfilePageComponent,
    UsersPageComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule {
}
