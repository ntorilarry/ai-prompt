export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AuthResponse {
  user?: User;
  token?: any;
  message?: string;
  error?: string;
}
