import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import * as pages from './pages';

const routes: Routes = [
  {
    path: '',
    component: pages.SuppliersListPageComponent
  },
  {
    path: 'create',
    component: pages.SupplierAddPageComponent
  },
  {
    path: ':id/details',
    component: pages.SupplierDetailsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule { }
