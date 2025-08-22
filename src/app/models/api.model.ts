export interface ApiSuccess<T> {
  ok: true;
  report: T | null;
  raw?: unknown;
}

export interface ApiError {
  ok: false;
  error: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

