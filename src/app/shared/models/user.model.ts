export class User {
  constructor(
    public id: string,
    public username: string,
    public isAdmin: boolean
  ) {
    this.id = id;
    this.username = username;
    this.isAdmin = isAdmin;
  }
}
