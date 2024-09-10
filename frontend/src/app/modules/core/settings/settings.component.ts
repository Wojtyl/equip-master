import { Component } from '@angular/core';
import { Roles } from "../../../shared/enums/user-role-enum";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

  protected readonly Roles = Roles;
}
