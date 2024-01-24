import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { LoginComponent } from './core/login/login.component';
import { HomeComponent } from './core/home/home.component';
import { NavComponent } from './core/nav/nav.component';
import { UserInterceptorService } from './core/auth/user-interceptor.service';
import { InvoiceFormComponent } from './modules/invoices/components/invoice-form/invoice-form.component';
import { SupplierFormComponent } from './modules/suppliers/components/supplier-form/supplier-form.component';
import { DeliveryComponent } from './modules/deliveries/pages/delivery/delivery.component';
import { AddProductComponent } from './modules/invoices/components/add-product/add-product.component';
import { DeliveryDetailsComponent } from './modules/deliveries/pages/delivery-details/delivery-details.component';
import { DeliveryAddBoxComponent } from './modules/deliveries/components/delivery-add-box/delivery-add-box.component';
import { DeliveryBoxTableComponent } from './modules/deliveries/components/delivery-box-table/delivery-box-table.component';
import { BoxDetailsComponent } from './modules/deliveries/pages/box-details/box-details.component';
import { DeliverySummaryComponent } from './modules/deliveries/pages/delivery-summary/delivery-summary.component';
import { SharedModule } from "./shared/shared.module";



@NgModule({
  declarations: [
    AppComponent,

    LoginComponent,
    HomeComponent,
    NavComponent,
    InvoiceFormComponent,
    SupplierFormComponent,
    DeliveryComponent,
    AddProductComponent,
    DeliveryDetailsComponent,
    DeliveryAddBoxComponent,
    DeliveryBoxTableComponent,
    BoxDetailsComponent,
    DeliverySummaryComponent,
  ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        SharedModule,
        HttpClientModule,
    ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: UserInterceptorService, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
