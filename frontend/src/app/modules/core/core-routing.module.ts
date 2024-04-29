import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserGuard} from "../../core/auth/user.guard";
import {RoleGuard} from "../../core/guards/role-guard";
import {HomeComponent} from "./home/home.component";
import {CoreComponent} from "./core.component";

const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/modules/core/home/home.module').then(m => m.HomeModule),
        canActivate: [UserGuard]
      },
      {
        path: 'invoices',
        loadChildren: () => import('src/app/modules/core/invoices/invoices.module').then(m => m.InvoicesModule),
        canActivate: [UserGuard],
      },
      {
        path: 'suppliers',
        loadChildren: () => import('src/app/modules/core/suppliers/suppliers.module').then(m => m.SuppliersModule),
        canActivate: [UserGuard, RoleGuard],
        data: {
          allowedRole: 'ADMIN'
        }
      },
      {
        path: 'products',
        loadChildren: () => import('src/app/modules/core/products/products.module').then(m => m.ProductsModule),
        canActivate: [UserGuard],
      },
      {
        path: 'delivery',
        loadChildren: () => import('src/app/modules/core/delivery/delivery.module').then(m => m.DeliveryModule),
        canActivate: [UserGuard],
      },
      {
        path: '**',
        component: HomeComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
