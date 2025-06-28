export interface LoginRequest {
  email: string;
  senha: string;
  recaptchaToken: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface ValidationError {
  campo: string;
  mensagem: string;
}

export type LoginResult = LoginResponse | ValidationError[];
