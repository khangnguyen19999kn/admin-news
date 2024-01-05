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
export const newsApiBase = axios.create({
  baseURL: import.meta.env.VITE_NEWS_API as string,
});

const newsApi = {
  async getListNews() {
    const response = await newsApiBase.get<TNews[]>(pathNewsAPI.getAllNews);
    return response.data;
  },

  async getListStudent() {
    const response = await newsApiBase.get<string>(pathNewsAPI.getAllStudent);
    return response.data;
  },
  async getStudentByName(name: string) {
    const response = await newsApiBase.get<string>(pathNewsAPI.getStudent(name));
    return response.data;
  },
  async updateStudent(student: string): Promise<string> {
    const response = await newsApiBase.post(pathNewsAPI.updateStudent, student);
    return response.data as string;
  },
  async deleteStudent(id: string): Promise<string> {
    const data = new URLSearchParams();
    data.append("studentId", id);
    const response = await newsApiBase.post(pathNewsAPI.deleteStudent, data);
    return response.data as string;
  },
  async addStudent(student: string): Promise<string> {
    const response = await newsApiBase.post(pathNewsAPI.addStudent, student);
    return response.data as string;
  },
  async getGenderCount() {
    const response = await newsApiBase.get<string>(pathNewsAPI.getGender);
    return response.data;
  },
  async getStatistics() {
    const response = await newsApiBase.get<string>(pathNewsAPI.getStatistics);
    return response.data;
  },
};

export default newsApi;
