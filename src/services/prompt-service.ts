import { PromptResponse } from "@/models/response/prompt-response";
import { BaseApi } from "./base-api";
import { createPromptRequest } from "@/models/request/prompt-request";

export class PromptService extends BaseApi {
  static async createPrompt(
    createPromptData: createPromptRequest,
    token: string
  ) {
    return this.request<any>("/prompts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(createPromptData),
    });
  }

  static async getUserPrompts({
    page = 1,
    size = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
    userId,
    search,
    token,
  }: {
    page?: number;
    size?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    userId?: string;
    search?: string;
    token: string;
  }) {
    const queryParams = new URLSearchParams({
      page: String(page),
      size: String(size),
      sortBy,
      sortOrder,
    });

    if (userId) queryParams.append("userId", userId);
    if (search) queryParams.append("search", search);

    return this.request<{
      meta: any; data: PromptResponse[]; token: string 
}>(
      `/prompts?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  static async updatePrompt(
    id: string,
    title: string,
    content: string,
    token: string
  ) {
    return this.request<PromptResponse>(`/prompts/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content }),
    });
  }

  static async deletePrompt(id: string, token: string) {
    return this.request<void>(`/prompts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
