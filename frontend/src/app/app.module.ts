import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SharedModule } from "./shared/shared.module";

import { LoginComponent } from './core/login/login.component';
import { HomeComponent } from './core/home/home.component';
import { NavComponent } from './core/nav/nav.component';
import { UserInterceptorService } from './core/interceptors/user-interceptor.service';
import { CoreModule } from "./core/core.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    CoreModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: UserInterceptorService, multi: true }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
