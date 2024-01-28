import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { SharedModule } from "../../shared/shared.module";

import * as pages from './pages';
import * as components from './components';
import { InvoicesTableComponent } from './components/invoices-table/invoices-table.component'



@NgModule({
  declarations: [
    pages.InvoiceAddPageComponent,
    pages.InvoicePageComponent,
    pages.InvoiceDetailsPageComponent,
    components.InvoiceFormComponent,
    InvoicesTableComponent
  ],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    SharedModule
  ]
})
export class InvoicesModule { }
