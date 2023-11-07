export interface ILoggedInUser {
  id: string;
  name: string;
  email: string;
}

export interface IJwtPayload {
  id: string;
  iat: number;
  exp: number;
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
}
