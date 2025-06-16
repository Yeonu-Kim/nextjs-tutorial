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
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  console.log(BASE_URL);
  console.log(process.env);
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
      console.log(response);
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
