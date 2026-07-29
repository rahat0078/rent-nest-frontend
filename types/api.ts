export type TMeta = {
  page?: number;
  limit?: number;
  total?: number;
};

export type TApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  meta?: TMeta;
};