import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as components from './components/index';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from "../../../shared/shared.module";
import { HomeComponent } from "./home.component";
import { DashboardTopSellersComponent } from './components/dashboard-top-sellers/dashboard-top-sellers.component';


@NgModule({
  declarations: [
    HomeComponent,
    components.DashboardUpcomingDeliveriesComponent,
    components.DashboardGraphComponent,
    DashboardTopSellersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule {
}
