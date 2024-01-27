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
//Component imports
import * as components from './components'

@NgModule({
  declarations: [
    components.AddProductComponent,
    components.MultiselectDropdownComponent,
    components.SvgIconComponent,
  ],
  imports: [
    AutoCompleteModule,
    ButtonModule,
    CalendarModule,
    ChipsModule,
    CommonModule,
    DropdownModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    InputNumberModule,
    InputTextModule,
    ListboxModule,
    MultiSelectModule,
    NgbModule,
    ReactiveFormsModule
  ],
  exports: [
    AutoCompleteModule,
    ButtonModule,
    CalendarModule,
    ChipsModule,
    CommonModule,
    DropdownModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    InputNumberModule,
    InputTextModule,
    ListboxModule,
    MultiSelectModule,
    NgbModule,
    ReactiveFormsModule,
    components.MultiselectDropdownComponent,
    components.SvgIconComponent,
    components.AddProductComponent
  ]
})
export class SharedModule { }
