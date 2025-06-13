export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterLoginResponse {
  access_token: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}
