import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuppliersRoutingModule } from './suppliers-routing.module';
import { SharedModule } from "../../shared/shared.module";

import * as pages from './pages';
import * as components from './components';

@NgModule({
  declarations: [
    pages.SupplierAddPageComponent,
    pages.SupplierDetailsPageComponent,
    pages.SuppliersListPageComponent,
    components.SupplierFormComponent,
    components.SuppliersTableComponent
  ],
  imports: [
    CommonModule,
    SuppliersRoutingModule,
    SharedModule
  ]
})
export class SuppliersModule { }
