export class ProfileDTO {
  public name: string;
  public surname: string;
  public email: string;
  public phoneNumber: string;
  public birthday: Date | null

  constructor() {
    this.name = '';
    this.surname = '';
    this.email = '';
    this.phoneNumber = '';
    this.birthday = null;
  }
}