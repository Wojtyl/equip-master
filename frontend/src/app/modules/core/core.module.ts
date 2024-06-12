import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { NavComponent } from "../../shared/components/nav/nav.component";
import { SettingsComponent } from './settings/settings.component';


@NgModule({
  declarations: [
    CoreComponent,
    NavComponent,
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule
  ]
})
export class CoreModule {
}
