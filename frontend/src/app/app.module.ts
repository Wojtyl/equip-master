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
import { ReactiveFormsModule } from '@angular/forms';
import { UserInterceptorService } from './auth/user-interceptor.service';
import { InvoiceFormComponent } from './forms/invoice-form/invoice-form.component';
import { SupplierFormComponent } from './forms/supplier-form/supplier-form.component';
import { ProductFormComponent } from './forms/product-form/product-form.component';
import { InputTextModule } from 'primeng/inputtext';
import { ChipsModule } from 'primeng/chips';
import { MultiSelectModule } from 'primeng/multiselect';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DeliveryComponent } from './forms/delivery/delivery.component';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { Button, ButtonModule } from 'primeng/button';
import { MultiselectDropdownComponent } from './shared/multiselect-dropdown/multiselect-dropdown.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    InvoiceFormComponent,
    SupplierFormComponent,
    ProductFormComponent,
    DeliveryComponent,
    MultiselectDropdownComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule,
    ReactiveFormsModule,
    InputTextModule,
    ChipsModule,
    MultiSelectModule,
    BrowserAnimationsModule,
    AutoCompleteModule,
    DropdownModule,
    CalendarModule,
    ButtonModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: UserInterceptorService, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
