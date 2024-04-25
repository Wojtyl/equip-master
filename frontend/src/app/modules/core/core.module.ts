import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CoreRoutingModule} from './core-routing.module';
import {CoreComponent} from './core.component';
import {GeneralModule} from "../../core/general.module";
import {NavComponent} from "../../shared/components/nav/nav.component";


@NgModule({
  declarations: [
    CoreComponent,
    NavComponent,
  ],
  imports: [
    // GeneralModule,
    CommonModule,
    CoreRoutingModule
  ]
})
export class CoreModule {
}
