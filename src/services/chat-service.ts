import {
  CreateTagResponse,
  listTagHistoryResponse,
} from "@/models/response/chat-response";
import { BaseApi } from "./base-api";
import { ChatRequest } from "@/models/request/chat-request";

export class ChatService extends BaseApi {
  static async createChat(chatData: ChatRequest) {
    return this.request<any>("/chat", {
      method: "POST",

      body: JSON.stringify(chatData),
    });
  }
  static async getTags() {
    return this.request<{
      data: CreateTagResponse[];
    }>("/chat/tags", {
      method: "GET",
    });
  }

  static async getTagChatHistory(tagId: string) {
    return this.request<{
      data: listTagHistoryResponse[];
    }>(`/chat/tags/${tagId}/history`, {
      method: "GET",
    });
  }
}
