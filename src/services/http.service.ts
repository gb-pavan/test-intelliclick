import { API } from '@utils/enums';
import { getToken, handleError } from '@utils/helpers';
import Axios, { AxiosError } from 'axios';

export const callApi = async (url: string, method: API, data?: object | null, shouldThrowError?: boolean) => {
  console.log("token",getToken());
  // Axios.defaults.headers.common.Authorization = getToken();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  console.log("baseUrl",baseUrl);
  const uri = `${baseUrl}/api${url}`;
  const DEFAULT_HEADER = {
    headers: {
      'Content-Type': 'application/json',
      "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzNmM2MyMTYwMjgzMmQ1ZDU5NmM4NmEiLCJyb2xlIjoiQkRBIiwibW9kZXJhdG9yIjpmYWxzZSwiZW1haWwiOiJ0ZXN0LnN0dWRlbnRAZ21haWwuY29tIiwibmFtZSI6IlRlc3QgQkRBIiwiaWF0IjoxNzMzNDg0NjI1fQ.NgHWWfiZNjAImFvFsJhlTW4vI5wDF7Vqi5yvVMdXaXQ",
    },
  };
  try {
    const response =
      method === API.POST ? await Axios.post(uri, data, DEFAULT_HEADER) : await Axios.get(uri, { params: data });
    return response.data;
  } catch (error) {
    return handleError(error as AxiosError, shouldThrowError);
  }
};
