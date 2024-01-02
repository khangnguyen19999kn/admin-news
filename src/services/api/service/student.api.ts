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
  getAllNews: "/news",
  getAllStudent: "/GetAllStudents",
  updateStudent: "?op=UpdateStudent",
  getStudent: (name: string) => `/GetStudent?studentName=${name}`,
  deleteStudent: "/DeleteStudent?studentId=${id}",
  addStudent: "?op=AddStudent",
  getGender: "/GetGenderCount",
  getStatistics: "/GetStudentStatistics",
};
export const newsApi = axios.create({
  baseURL: import.meta.env.VITE_NEWS_API as string,
});

const studentApi = {
  async getListNews() {
    const response = await newsApi.get<TNews[]>(pathNewsAPI.getAllNews);
    return response.data;
  },

  async getListStudent() {
    const response = await newsApi.get<string>(pathNewsAPI.getAllStudent);
    return response.data;
  },
  async getStudentByName(name: string) {
    const response = await newsApi.get<string>(pathNewsAPI.getStudent(name));
    return response.data;
  },
  async updateStudent(student: string): Promise<string> {
    const response = await newsApi.post(pathNewsAPI.updateStudent, student);
    return response.data as string;
  },
  async deleteStudent(id: string): Promise<string> {
    const data = new URLSearchParams();
    data.append("studentId", id);
    const response = await newsApi.post(pathNewsAPI.deleteStudent, data);
    return response.data as string;
  },
  async addStudent(student: string): Promise<string> {
    const response = await newsApi.post(pathNewsAPI.addStudent, student);
    return response.data as string;
  },
  async getGenderCount() {
    const response = await newsApi.get<string>(pathNewsAPI.getGender);
    return response.data;
  },
  async getStatistics() {
    const response = await newsApi.get<string>(pathNewsAPI.getStatistics);
    return response.data;
  },
};

export default studentApi;
