import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from "./settings.component";
import { AccountSettingsPageComponent } from "./pages/account-settings-page/account-settings-page.component";
import { ProfilePageComponent } from "./pages/profile-page/profile-page.component";
import { UsersPageComponent } from "./pages/users-page/users-page.component";

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: 'profile',
        component: ProfilePageComponent
      },
      {
        path: 'account-settings',
        component: AccountSettingsPageComponent
      },
      {
        path: 'users',
        component: UsersPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {
}
