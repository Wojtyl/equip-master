import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {LoginPageComponent} from "./pages/login-page.component";
import {LoginFormComponent} from "./components/login-form/login-form.component";
import {ForgotPasswordFormComponent} from "./components/forgot-password-form/forgot-password-form.component";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    LoginComponent,
    LoginPageComponent,
    LoginFormComponent,
    ForgotPasswordFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LoginRoutingModule
  ]
})
export class LoginModule {
}
