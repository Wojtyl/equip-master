import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
} from "@angular/forms";

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss'
})
export class InputFieldComponent implements OnInit {
  @Input() name = 'name';
  @Input() controlName = 'Control Name';
  @Input() label: string = 'Label';
  @Input() type = 'text';
  @Input() styleClass: string;
  rootGroup = inject(FormGroupDirective);
  control: FormControl;

  ngOnInit() {
    this.control = this.rootGroup.control.get(this.controlName) as FormControl;
  }
}
