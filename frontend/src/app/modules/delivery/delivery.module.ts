import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryRoutingModule } from './delivery-routing.module';
import { SharedModule } from "../../shared/shared.module";

import * as pages from './pages';
import * as components from './components';
import { InputTextareaModule } from "primeng/inputtextarea";

@NgModule({
  declarations: [
    pages.DeliveryPageComponent,
    pages.BoxDetailsComponent,
    pages.DeliveryCreationPageComponent,
    components.DeliveryInformationStepComponent,
    components.DeliveryCountingStepComponent,
    components.DeliverySummaryStepComponent,
  ],
  imports: [
    CommonModule,
    DeliveryRoutingModule,
    SharedModule,
    InputTextareaModule
  ]
})
export class DeliveryModule { }
