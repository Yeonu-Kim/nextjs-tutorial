export type APIResponse<TResponse> = {
  response: Response;
  data: TResponse;
};

export type DataResponse<TResponse> =
  | {
      type: 'success';
      code: number;
      data: TResponse;
    }
  | {
      type: 'error';
      code: number;
      message: string;
    };
