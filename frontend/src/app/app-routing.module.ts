import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { LoginComponent } from './core/login/login.component';
import { UserGuard } from './core/auth/user.guard';
import { RoleGuard } from "./core/guards/role-guard";
import { LoginGuard } from "./core/auth/login.guard";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'invoices',
    loadChildren: () => import('src/app/modules/invoices/invoices.module').then(m => m.InvoicesModule),
    canActivate: [UserGuard],
  },
  {
    path: 'suppliers',
    loadChildren: () => import('src/app/modules/suppliers/suppliers.module').then(m => m.SuppliersModule),
    canActivate: [UserGuard, RoleGuard],
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
    loadChildren: () => import('src/app/modules/delivery/delivery.module').then(m => m.DeliveryModule),
    canActivate: [UserGuard],
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
