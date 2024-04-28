import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { apiUrl } from "../../../../environments/apiurl";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private httpClient = inject(HttpClient);
  private _resetEmail: string;
  private _userRemembered = true;

  public set resetEmail(val: string) {
    this._resetEmail = val;
  }

  public set userRemembered(val: boolean) {
    this._userRemembered = val;
  }

  public get resetEmail() {
    return this._resetEmail;
  }

  public get userRemembered() {
    return this._userRemembered;
  }

  public setNewPassword(data: {token: string, password: string, passwordConfirm: string}) {
    return this.httpClient.post(`${apiUrl}auth/newPasswordReset`, data);
  }

  constructor() { }
}
