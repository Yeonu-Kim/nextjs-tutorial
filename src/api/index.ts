import { APIResponse } from './entities';
import type { DataResponse } from './entities';

export const httpClient = async <TRequest, TResponse>({
  path,
  method,
  request,
}: {
  path: string;
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  request?: TRequest;
}) => {
  const BASE_URL = process.env.BASE_URL;
  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    body: request !== undefined ? JSON.stringify(request) : undefined,
  });
  const responseBody = (await response.json().catch(() => null)) as unknown;
  return { response, data: responseBody } as APIResponse<TResponse>;
};

export const apiGenerator = <TRequest, TResponse>({
  path,
  method,
  request,
}: {
  path: string;
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  request?: TRequest;
}): Promise<DataResponse<TResponse>> => {
  return httpClient<TRequest, TResponse>({
    path,
    method,
    request,
  })
    .then(({ response, data }) => {
      if (response.ok) {
        return {
          type: 'success' as const,
          code: response.status,
          data: data,
        };
      }
      return {
        type: 'error' as const,
        code: response.status,
        message: response.statusText,
      };
    })
    .catch((response) => ({
      type: 'error' as const,
      code: response.status,
      message: response.statusText,
    }));
};
