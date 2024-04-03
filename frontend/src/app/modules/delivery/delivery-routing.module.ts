import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as pages from "./pages";
import * as components from './components';
import { UserGuard } from "../../core/auth/user.guard";

const routes: Routes = [
  {
    path: '',
    component: pages.DeliveryPageComponent,
  },
  {
    path: 'create',
    component: pages.DeliveryCreationPageComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [UserGuard],
    children: [
      {
        path: '',
        component: components.DeliveryInformationStepComponent
      },
      {
        path: ':id',
        component: components.DeliveryInformationStepComponent
      },
      {
        path: ':id/counting',
        component: components.DeliveryCountingStepComponent
      },
      {
        path: ':id/summary',
        component: components.DeliverySummaryStepComponent
      }
    ]
  },
  {
    path: 'box/:id',
    component: pages.BoxDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryRoutingModule { }
