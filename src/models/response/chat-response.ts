export interface CreateTagResponse {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface listTagHistoryResponse {
  _id: string;
  userId: string;
  message: string;
  reply: string;
  prompts: [];
  tagId: string;
  createdAt: string;
  updatedAt: string;
}
