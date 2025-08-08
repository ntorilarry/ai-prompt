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

      const result = await response.json();

      if (!response.ok) {
        return {
          data: null as any,
          meta: { totalPages: 0 }, // or use a more dynamic fallback
          error: result.error || "An error occurred",
        };
      }

      return {
        data: result.data ?? result,
        meta: result.meta ?? { totalPages: 1 },
        message: result.message,
      };
    } catch (error) {
      return {
        data: null as any,
        meta: { totalPages: 0 },
        error: "Network error occurred",
      };
    }
  }
}
