import { Prompt } from "@/models/response/prompt-response";
import { BaseApi } from "./base-api";

export class PromptService extends BaseApi {
  static async createPrompt(title: string, content: string, token: string) {
    return this.request<Prompt>("/prompts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content }),
    });
  }

  static async getUserPrompts(token: string) {
    return this.request<Prompt[]>("/prompts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static async updatePrompt(
    id: string,
    title: string,
    content: string,
    token: string
  ) {
    return this.request<Prompt>(`/prompts/${id}`, {
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
