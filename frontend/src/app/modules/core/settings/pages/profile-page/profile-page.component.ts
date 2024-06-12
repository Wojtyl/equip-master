import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit {
  private fb = inject(FormBuilder);

  editProfileForm: FormGroup;

  ngOnInit() {
    this.editProfileForm = this.fb.group({
      name: 'Imie',
      surname: 'Nazwisko',
      email: 'Email',
      phone: 123,
      birthdate: ''
    });
  }
}
