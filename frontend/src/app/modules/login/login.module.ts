import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { ForgotPasswordFormComponent } from "./components/forgot-password-form/forgot-password-form.component";
import { SharedModule } from "../../shared/shared.module";
import { ForgotPasswordConfirmComponent } from './components/forgot-password-confirm/forgot-password-confirm.component';
import { NewPasswordPageComponent } from './pages/new-password-page/new-password-page.component';
import { NewPasswordFormComponent } from './components/new-password-form/new-password-form.component';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { NewPasswordConfirmComponent } from './components/new-password-confirm/new-password-confirm.component';


@NgModule({
  declarations: [
    LoginComponent,
    LoginPageComponent,
    LoginFormComponent,
    ForgotPasswordFormComponent,
    ForgotPasswordConfirmComponent,
    NewPasswordPageComponent,
    NewPasswordFormComponent,
    LoginCardComponent,
    NewPasswordConfirmComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LoginRoutingModule
  ]
})
export class LoginModule {
}
