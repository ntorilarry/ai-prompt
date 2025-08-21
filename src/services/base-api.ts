// base-api.ts
import { ApiResponse } from "@/models/response/base-response";

const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

async function tryRefreshToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  try {
    const res = await fetch(`${baseUrl}/auth/refresh-token`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (!res.ok) return null;
    const data = await res.json();
    if (data?.data?.accessToken) {
      localStorage.setItem("token", data.data.accessToken);
      return data.data.accessToken;
    }
    return null;
  } catch {
    return null;
  }
}

export class BaseApi {
  protected static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    let token = localStorage.getItem("token");

    try {
      let response = await fetch(`${baseUrl}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
          ...options.headers,
        },
        ...options,
      });

      if (response.status === 401) {
        const newToken = await tryRefreshToken();
        if (newToken) {
          response = await fetch(`${baseUrl}${endpoint}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${newToken}`,
              ...options.headers,
            },
            ...options,
          });
        }
      }

      const result = await response.json();

      if (!response.ok) {
        return {
          data: null as any,
          meta: { totalPages: 0 },
          error: result.error || "An error occurred",
        };
      }

      return {
        data: result.data ?? result,
        meta: result.meta ?? { totalPages: 1 },
        message: result.message,
      };
    } catch {
      return {
        data: null as any,
        meta: { totalPages: 0 },
        error: "Network error occurred",
      };
    }
  }
}
