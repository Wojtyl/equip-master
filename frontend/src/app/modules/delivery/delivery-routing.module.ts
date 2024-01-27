import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as pages from "./pages";
import { UserGuard } from "../../core/auth/user.guard";

const routes: Routes = [
  {
    path: '',
    component: pages.DeliveryPageComponent,
  },
  {
    path: ':id',
    component: pages.DeliveryDetailsComponent,
    runGuardsAndResolvers: "always",
    canActivate: [UserGuard]
  },
  {
    path: 'box/:id',
    component: pages.BoxDetailsComponent
  },
  {
    path: ':id/summary',
    component: pages.DeliverySummaryComponent,
    runGuardsAndResolvers: "always",
    canActivate: [UserGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryRoutingModule { }
