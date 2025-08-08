import { AuthResponse } from "@/models/response/auth-response";
import { BaseApi } from "./base-api";
import { SignInRequest, SignUpRequest } from "@/models/request/auth-request";

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

  static async forgotPassword(email: string) {
    return this.request<{ message: string }>("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  static async resetPassword(accessToken: string, newPassword: string) {
    return this.request<{ message: string }>("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ accessToken, newPassword }),
    });
  }
}
