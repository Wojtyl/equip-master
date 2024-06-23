import { inject, Injectable } from '@angular/core';
import { ProfileForm } from "src/app/modules/core/settings/models/profile-form";
import { HttpClient } from "@angular/common/http";
import { apiUrl } from "src/environments/apiurl";
import { Profile } from "../models/Profile";
import { ListResponse } from "../../../../shared/models/list-response";
import { Subject } from "rxjs";
import { ResetPasswordForm } from "../models/reset-password-form";
import { User } from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private http = inject(HttpClient);
  public profileChanged$ = new Subject<string | null>()
  constructor() { }

  updateProfile(profileForm: ProfileForm) {
    return this.http.patch<ProfileForm>(`${apiUrl}profile`, profileForm)
  }

  updateProfileById(profileId: string, profileForm: ProfileForm) {
    return this.http.patch<ListResponse<User>>(`${apiUrl}profile/${profileId}`, profileForm)
  }

  updateProfileImage(imageFormData: FormData) {
    return this.http.patch(`${apiUrl}profile/image`, imageFormData)
  }

  deleteProfileImage() {
    return this.http.delete(`${apiUrl}profile/image`)
  }

  changePassword(body: ResetPasswordForm) {
    return this.http.patch(`${apiUrl}profile/changePassword`, body)
  }

  getProfileDetails() {
    return this.http.get<ListResponse<Profile>>(`${apiUrl}profile`);
  }

  addProfile(data: ProfileForm) {
    return this.http.post<ListResponse<User>>(`${apiUrl}profile`, data);
  }
}
