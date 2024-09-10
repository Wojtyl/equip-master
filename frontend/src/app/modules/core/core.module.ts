import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { NavComponent } from "../../shared/components/nav/nav.component";
import { SettingsComponent } from './settings/settings.component';
import { HasRoleDirective } from "../../shared/directives/has-role.directive";
import { SettingsModule } from "./settings/settings.module";


@NgModule({
  declarations: [
    CoreComponent,
    NavComponent,
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    HasRoleDirective,
    SettingsModule,
  ]
})
export class CoreModule {
}
