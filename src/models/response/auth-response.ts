export interface User {
  id: string;
  email: string;
}

export interface AuthResponse {
  user?: User;
  session?: any;
  message?: string;
  error?: string;
}
