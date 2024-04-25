import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuppliersRoutingModule } from './suppliers-routing.module';

import * as pages from './pages';
import * as components from './components';
import {SharedModule} from "../../../shared/shared.module";

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
