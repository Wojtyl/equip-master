import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ProfileService } from "../../services/profile.service";
import { Profile } from "../../models/Profile";
import { ProfileForm } from "../../models/profile-form";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit {
  private fb = inject(FormBuilder);
  private profileService = inject(ProfileService);
  private profile: Profile;
  public isUpdating = false;

  editProfileForm: FormGroup;

  ngOnInit() {
    this.profileService.getProfileDetails().subscribe(profile => {
      this.profile = profile.items;
      this.initForm();
    })
  }

  initForm() {
    this.editProfileForm = this.fb.group({
      name: this.profile?.name ?? '',
      surname: this.profile?.surname ?? '',
      email: this.profile?.email ?? '',
      phoneNumber: this.profile?.phoneNumber ?? '',
      birthday: this.profile?.birthday ? new Date(this.profile.birthday) : null
    });
  }

  submitForm() {
    this.editProfileForm.markAsTouched();
    if (this.editProfileForm.valid) {
      this.isUpdating = true;
      const data = this.editProfileForm.getRawValue() as ProfileForm;
      this.profileService.updateProfile(data).subscribe({
        next: () => {},
        error: () => {},
        complete: () => {
          setTimeout(() => {
            this.isUpdating = false
          }, 500)
        }
      })
    }
  }
}
