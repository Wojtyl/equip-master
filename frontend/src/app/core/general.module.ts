import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login/components/login-form/login-form.component';
import { PaginatorModule } from "primeng/paginator";
import { ReactiveFormsModule } from "@angular/forms";
import { ForgotPasswordFormComponent } from './login/components/forgot-password-form/forgot-password-form.component';
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    LoginFormComponent,
    ForgotPasswordFormComponent
  ],
  exports: [
    LoginFormComponent,
    ForgotPasswordFormComponent
  ],
    imports: [
        CommonModule,
        PaginatorModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class GeneralModule { }
