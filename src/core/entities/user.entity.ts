export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public passwordHash: string,
    public createdAt: Date,
    public updatedAt: Date,
    public refreshToken?: string,
  ) {}
}
