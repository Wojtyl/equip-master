import { inject, Injectable } from '@angular/core';
import { ProfileForm } from "src/app/modules/core/settings/models/profile-form";
import { HttpClient } from "@angular/common/http";
import { apiUrl } from "src/environments/apiurl";
import { Profile } from "../models/Profile";
import { ListResponse } from "../../../../shared/models/list-response";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private http = inject(HttpClient)
  constructor() { }

  updateProfile(profileForm: ProfileForm) {
    return this.http.patch<ProfileForm>(`${apiUrl}profile`, profileForm)
  }

  updateProfileImage(imageFormData: FormData) {
    return this.http.patch(`${apiUrl}users`, imageFormData)
  }

  changePassword() {

  }

  getProfileDetails() {
    return this.http.get<ListResponse<Profile>>(`${apiUrl}profile`);
  }
}
