import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { LoginComponent } from "./login.component";
import { NewPasswordPageComponent } from "./pages/new-password-page/new-password-page.component";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: 'reset-password',
        component: NewPasswordPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {
}
