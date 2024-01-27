import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuppliersRoutingModule } from './suppliers-routing.module';
import { SharedModule } from "../../shared/shared.module";

import * as pages from './pages'

@NgModule({
  declarations: [
    pages.SupplierAddPageComponent
  ],
  imports: [
    CommonModule,
    SuppliersRoutingModule,
    SharedModule
  ]
})
export class SuppliersModule { }
