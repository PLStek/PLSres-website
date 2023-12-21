export class User {
  constructor(
    public id: number,
    public email: string,
    public username: string,
    public isActionneur: boolean,
    public isAdmin: boolean
  ) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.isActionneur = isActionneur;
    this.isAdmin = isAdmin;
  }
}
