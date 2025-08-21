export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AuthResponse {
  user?: User;
  accessToken?: string;
  refreshToken?: string;
  message?: string;
  error?: string;
}
