export interface User {
  _id: string;

  name: string;

  email: string;

  role: "admin" | "sales";
}

export interface AuthResponse {
  token: string;

  user: User;
}