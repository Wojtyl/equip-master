import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { SharedModule } from "../../shared/shared.module";
import { InvoicesTableComponent } from './components/invoices-table/invoices-table.component'

import * as pages from './pages';
import * as components from './components';

@NgModule({
  declarations: [
    pages.InvoiceAddPageComponent,
    pages.InvoicesPageComponent,
    pages.InvoiceDetailsPageComponent,
    components.InvoiceFormComponent,
    InvoicesTableComponent
  ],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InvoicesModule { }
