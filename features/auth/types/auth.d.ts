export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  refresh_token: string;
  id: string;
}

export interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface IRegisterPayloadResponse {
  name: string;
  email: string;
  password: string;
  role: string;
}
