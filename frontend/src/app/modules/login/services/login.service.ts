import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
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

  constructor() { }
}
