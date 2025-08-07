export interface User {
  id: string;
  email: string;
}

export interface Prompt {
  id: string;
  title: string;
  content: string;
  user_id: string;
  created_at?: string;
  updated_at?: string;
}

export interface AuthResponse {
  user?: User;
  session?: any;
  message?: string;
  error?: string;
}

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}
