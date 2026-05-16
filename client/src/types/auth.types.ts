export interface User {
  _id: string;

  name: string;

  email: string;

  role: string;
}

export interface LoginFormData {
  email: string;

  password: string;
}

export interface RegisterFormData {
  name: string;

  email: string;

  password: string;
}