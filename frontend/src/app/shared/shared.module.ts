//Angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Primeng import
import { InputTextModule } from 'primeng/inputtext';
import { ChipsModule } from 'primeng/chips';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
import { InputNumberModule } from "primeng/inputnumber";
import { TooltipModule } from 'primeng/tooltip';
import { SkeletonModule } from 'primeng/skeleton';
import { MessagesModule } from 'primeng/messages';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ChipModule } from 'primeng/chip';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MenuModule } from 'primeng/menu';
import { StepsModule } from 'primeng/steps';

//Component imports
import * as components from './components';

//Form fields imports
import * as form from './forms';

@NgModule({
  declarations: [
    components.AddProductComponent,
    components.MultiselectDropdownComponent,
    components.SvgIconComponent,
    components.StepperComponent,
    form.InputFieldComponent,
    form.FormControlsHeaderComponent,
    form.FormFileUploadComponent
  ],
  imports: [
    AutoCompleteModule,
    ButtonModule,
    CalendarModule,
    ChipsModule,
    ChipModule,
    CommonModule,
    DropdownModule,
    DialogModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    InputNumberModule,
    InputTextModule,
    InputGroupAddonModule,
    InputGroupModule,
    ListboxModule,
    MultiSelectModule,
    MessagesModule,
    MenuModule,
    NgbModule,
    OverlayPanelModule,
    ReactiveFormsModule,
    SkeletonModule,
    StepsModule,
    TooltipModule
  ],
  exports: [
    AutoCompleteModule,
    ButtonModule,
    CalendarModule,
    ChipsModule,
    ChipModule,
    CommonModule,
    DropdownModule,
    DialogModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    InputNumberModule,
    InputTextModule,
    InputGroupAddonModule,
    InputGroupModule,
    ListboxModule,
    MultiSelectModule,
    MessagesModule,
    MenuModule,
    NgbModule,
    OverlayPanelModule,
    ReactiveFormsModule,
    SkeletonModule,
    StepsModule,
    TooltipModule,
    components.MultiselectDropdownComponent,
    components.SvgIconComponent,
    components.AddProductComponent,
    components.StepperComponent,
    form.InputFieldComponent,
    form.FormControlsHeaderComponent,
    form.FormFileUploadComponent
  ]
})
export class SharedModule {
}
