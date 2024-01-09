import { TFormAddNews } from "@/pages/AddNews/types";
import { TNews } from "@/pages/ListNews/types";
import { UseMutationOptions } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export type TResponse<T> = {
  data: T;
  error: 0;
  message: "SUCCESS";
};
export interface INewsResponse {
  total: number;
  data: string;
}
export type TGetStudentResponse = TResponse<INewsResponse>;
export type TActionResponse = TResponse<number | string | boolean>;
export type TConfigMutation<
  TFieldPayload = unknown,
  TFieldResponse = TActionResponse
> = UseMutationOptions<TFieldResponse, AxiosError, TFieldPayload>;

const pathNewsAPI = {
  allNews: "/news",
  deleteNews: (id: string) => `/news/${id}`,
};
export const newsApiBase = axios.create({
  baseURL: import.meta.env.VITE_NEWS_API as string,
});

const newsApi = {
  async getListNews() {
    const response = await newsApiBase.get<TNews[]>(pathNewsAPI.allNews);
    return response.data;
  },
  async deleteNews(id: string) {
    const response = await newsApiBase.delete<TActionResponse>(pathNewsAPI.deleteNews(id));
    return response.data;
  },
  async createNews(news: TFormAddNews) {
    const response = await newsApiBase.post<TActionResponse>(pathNewsAPI.allNews, news);
    return response.data;
  },
};

export default newsApi;
