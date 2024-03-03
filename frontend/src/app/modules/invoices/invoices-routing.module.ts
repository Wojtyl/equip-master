import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import * as pages from './pages';

const routes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: "always",
    component: pages.InvoicesPageComponent,
  },
  {
    path: 'create',
    runGuardsAndResolvers: "always",
    component: pages.InvoiceAddPageComponent
  },
  {
    path: ':id/details',
    runGuardsAndResolvers: "always",
    component: pages.InvoiceDetailsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
