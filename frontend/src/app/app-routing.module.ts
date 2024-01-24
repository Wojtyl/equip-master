import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { LoginComponent } from './core/login/login.component';
import { UserGuard } from './core/auth/user.guard';
import { InvoiceFormComponent } from './modules/invoices/components/invoice-form/invoice-form.component';
import { SupplierFormComponent } from './modules/suppliers/components/supplier-form/supplier-form.component';
import { ProductFormComponent } from './modules/products/components/product-form/product-form.component';
import { DeliveryComponent } from './modules/deliveries/pages/delivery/delivery.component';
import { DeliveryDetailsComponent } from './modules/deliveries/pages/delivery-details/delivery-details.component';
import { BoxDetailsComponent } from "./modules/deliveries/pages/box-details/box-details.component";
import { roleGuard } from "./core/guards/role.guard";
import { DeliverySummaryComponent } from "./modules/deliveries/pages/delivery-summary/delivery-summary.component";

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
    loadChildren: () => import('src/app/modules/suppliers/suppliers.module').then(m => m.SuppliersModule),
    component: SupplierFormComponent,
    canActivate: [UserGuard, roleGuard],
    data: {
      allowedRole: 'ADMIN'
    }
  },
  {
    path: 'products',
    loadChildren: () => import('src/app/modules/products/products.module').then(m => m.ProductsModule),
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
    path: 'deliveries/:id',
    component: DeliveryDetailsComponent,
    runGuardsAndResolvers: "always",
    canActivate: [UserGuard]
  },
  {
    path: 'deliveries/:id/summary',
    component: DeliverySummaryComponent,
    runGuardsAndResolvers: "always",
    canActivate: [UserGuard]
  },
  {
    path: 'box/:id',
    component: BoxDetailsComponent
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
