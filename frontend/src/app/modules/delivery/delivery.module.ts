import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryRoutingModule } from './delivery-routing.module';
import { SharedModule } from "../../shared/shared.module";

import * as pages from './pages';
import * as components from './components';

@NgModule({
  declarations: [
    pages.DeliveryPageComponent,
    pages.DeliveryDetailsComponent,
    pages.DeliverySummaryComponent,
    pages.BoxDetailsComponent,
    components.DeliveryAddBoxComponent,
    components.DeliveryBoxTableComponent
  ],
  imports: [
    CommonModule,
    DeliveryRoutingModule,
    SharedModule
  ]
})
export class DeliveryModule { }
