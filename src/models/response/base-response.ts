export interface ApiResponse<T> {
  data: T;
  meta?: {
    totalPages: number;
    // other meta fields
  };
  error?: string;
  message?: string;
}
