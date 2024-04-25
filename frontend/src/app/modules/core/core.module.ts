import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CoreRoutingModule} from './core-routing.module';
import {CoreComponent} from './core.component';
import {GeneralModule} from "../../core/general.module";
import {NavComponent} from "../../core/nav/nav.component";
import {HomeComponent} from "../../core/home/home.component";


@NgModule({
  declarations: [
    CoreComponent,
    NavComponent,
    HomeComponent
  ],
  imports: [
    GeneralModule,
    CommonModule,
    CoreRoutingModule
  ]
})
export class CoreModule {
}
