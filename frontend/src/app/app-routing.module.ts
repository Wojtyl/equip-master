import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserGuard } from './auth/user.guard';
import { InvoiceFormComponent } from './forms/invoice-form/invoice-form.component';
import { SupplierFormComponent } from './forms/supplier-form/supplier-form.component';
import { ProductFormComponent } from './forms/product-form/product-form.component';
import { DeliveryComponent } from './forms/delivery/delivery.component';
import { DeliveryDetailsComponent } from './components/delivery-details/delivery-details.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'invoices',
    component: InvoiceFormComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'suppliers',
    component: SupplierFormComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'products',
    component: ProductFormComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'delivery',
    component: DeliveryComponent,
    children: [
    ],
    canActivate: [UserGuard],
  },
  {
    path: 'delivery/:id',
    component: DeliveryDetailsComponent,
    canActivate: [UserGuard]
  },
  {
    path: '**',
    component: HomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
