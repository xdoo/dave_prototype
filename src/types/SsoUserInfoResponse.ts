export default class SsoUserInfoResponse {

  public name: string;

  public email: string;

  public user_roles: Array<string>;

  public authorities: Array<string>;

  constructor(name: string, email: string, user_roles: Array<string>, authorities: Array<string>) {
    this.name = name;
    this.email = email;
    this.authorities = authorities;
    this.user_roles = user_roles;
  }

}
