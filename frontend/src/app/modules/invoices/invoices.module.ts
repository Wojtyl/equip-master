import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { SharedModule } from "../../shared/shared.module";

import * as pages from './pages';


@NgModule({
  declarations: [
    pages.InvoiceAddPageComponent
  ],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    SharedModule
  ]
})
export class InvoicesModule { }
