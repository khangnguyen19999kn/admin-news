import { TFormAddNews } from "@/pages/AddUpdateNews/types";
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
  changeNewWithId: (id: string) => `/news/${id}`,
  detailById: (id: string) => `/news/detail/${id}`,
  searchByTitle: (title: string) => `/news/search?searchTerm=${title}`,
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
    const response = await newsApiBase.delete<TActionResponse>(pathNewsAPI.changeNewWithId(id));
    return response.data;
  },
  async createNews(news: TFormAddNews) {
    const response = await newsApiBase.post<TActionResponse>(pathNewsAPI.allNews, news);
    return response.data;
  },
  async getDetailNews(id: string) {
    const response = await newsApiBase.get<TNews>(pathNewsAPI.detailById(id));
    return response.data;
  },
  async updateNews(id: string, news: TFormAddNews) {
    const response = await newsApiBase.put<TActionResponse>(pathNewsAPI.changeNewWithId(id), news);
    return response.data;
  },
  async searchNews(title: string) {
    const response = await newsApiBase.get<TNews[]>(pathNewsAPI.searchByTitle(title));
    return response.data;
  },
};

export default newsApi;
