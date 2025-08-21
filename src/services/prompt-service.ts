import { PromptResponse } from "@/models/response/prompt-response";
import { BaseApi } from "./base-api";
import {
  createPromptRequest,
  editPromptRequest,
} from "@/models/request/prompt-request";

export class PromptService extends BaseApi {
  static async createPrompt(createPromptData: createPromptRequest) {
    return this.request<any>("/prompts", {
      method: "POST",

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
  }: {
    page?: number;
    size?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    userId?: string;
    search?: string;
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
      data: PromptResponse[];
      meta: {
        total: number;
        page: number;
        size: number;
        totalPages: number;
      };
    }>(`/prompts?${queryParams.toString()}`, {
      method: "GET",
    });
  }

  static async updatePrompt(id: string, editPromptData: editPromptRequest) {
    return this.request<any>(`/prompts/${id}`, {
      method: "PUT",

      body: JSON.stringify(editPromptData),
    });
  }

  static async deletePrompt(id: string, token: string) {
    return this.request<{ message: string }>(`/prompts/${id}`, {
      method: "DELETE",
    });
  }
}
