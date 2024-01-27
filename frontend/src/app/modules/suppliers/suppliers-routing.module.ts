import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import * as pages from './pages';

const routes: Routes = [
  {
    path: '',
    component: pages.SupplierAddPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule { }
