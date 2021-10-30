export interface TokenInterface {
  _id: string;
  username: string;
  deposit: number;
  role: string;
}

export interface UserInterface {
  _id: string;
  username: string;
  deposit: number;
  role: string;
}

export interface Credentials {
  username: string;
  password: string;
}

export interface UserCreation {
  username: string;
  password: string;
  passwordConfirmation: string;
  role: string;
}
