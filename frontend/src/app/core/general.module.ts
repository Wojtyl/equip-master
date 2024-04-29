import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PaginatorModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class GeneralModule {
}
