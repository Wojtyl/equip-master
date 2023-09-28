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
import { DeliveryComponent } from './components/delivery/pages/delivery/delivery.component';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { Button, ButtonModule } from 'primeng/button';
import { MultiselectDropdownComponent } from './shared/multiselect-dropdown/multiselect-dropdown.component';
import { AddProductComponent } from './components/invoices/components/add-product/add-product.component';
import { ListboxModule } from 'primeng/listbox';
import { DeliveryDetailsComponent } from './components/delivery/pages/delivery-details/delivery-details.component';
import { DeliveryAddBoxComponent } from './components/delivery/components/delivery-add-box/delivery-add-box.component';
import { DeliveryBoxTableComponent } from './components/delivery/components/delivery-box-table/delivery-box-table.component';



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
    AddProductComponent,
    DeliveryDetailsComponent,
    DeliveryAddBoxComponent,
    DeliveryBoxTableComponent,
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
    ButtonModule,
    ListboxModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: UserInterceptorService, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
