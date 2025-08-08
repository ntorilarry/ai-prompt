import { AuthResponse } from "@/models/response/auth-response";
import { BaseApi } from "./base-api";
import {
  ForgotPasswordRequest,
  ResetPasswordRequest,
  SignInRequest,
  SignUpRequest,
} from "@/models/request/auth-request";

export class AuthService extends BaseApi {
  static async signup(signupData: SignUpRequest) {
    return this.request<AuthResponse>("/auth/signup", {
      method: "POST",
      body: JSON.stringify(signupData),
    });
  }

  static async login(signInData: SignInRequest) {
    return this.request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(signInData),
    });
  }

  static async forgotPassword(forgotPasswordData: ForgotPasswordRequest) {
    return this.request<{ message: string }>("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify(forgotPasswordData),
    });
  }

  static async resetPassword(resetPasswordData: ResetPasswordRequest) {
    return this.request<{ message: string }>("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(resetPasswordData),
    });
  }
}
