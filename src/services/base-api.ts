import { ApiResponse } from "@/models/response/base-response";

const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

export class BaseApi {
  protected static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error || "An error occurred" };
      }

      return { data };
    } catch (error) {
      return { error: "Network error occurred" };
    }
  }
}
