import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('imageInput') public imageInput: ElementRef<HTMLInputElement>;
  private fb = inject(FormBuilder);
  private profileService = inject(ProfileService);
  protected profile: Profile;
  public isUpdating = false;
  public imagePreviewUrl: string | null;

  editProfileForm: FormGroup;

  ngOnInit() {
    this.profileService.getProfileDetails().subscribe(profile => {
      this.profile = profile.items;
      this.imagePreviewUrl = profile.items.image;
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

  onFileAdded() {
    const fileReader = new FileReader();
    const file = this.imageInput.nativeElement.files![0];

    fileReader.onload = (e) => {
      this.imagePreviewUrl = e.target!.result as string;
      this.profile.image = e.target!.result as string;
    }
    fileReader.readAsDataURL(file)

    const formData = new FormData()
    formData.append('image', file)

    this.profileService.updateProfileImage(formData).subscribe()
  }

  removeProfileImage() {
    this.profileService.deleteProfileImage().subscribe({
      next: () => {
        this.profile.image = null;
        this.imagePreviewUrl = null;
      },
      error: () => {
      }
    })
  }
}
