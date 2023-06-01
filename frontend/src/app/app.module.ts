import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './shared/nav/nav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserInterceptorService } from './auth/user-interceptor.service';

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent, NavComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FontAwesomeModule, NgbModule],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: UserInterceptorService, multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
