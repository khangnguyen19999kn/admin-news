import { TFormLogin } from "@/pages/Login/Login";
import { newsApiBase } from "@/services/api/service/news.api";

const pathUsersAPI = {
  login: "users/login",
  checkToken: "users/checktoken",
};
type TLoginResponse = {
  token: string;
  message: string;
};
type TCheckTokenResponse = {
  valid: boolean;
  displayName: string;
  message: string;
};
const usersAPI = {
  login: async (formLogin: TFormLogin) => {
    const response = await newsApiBase.post<TLoginResponse>(pathUsersAPI.login, formLogin);
    return response.data;
  },
  checkTokenValidity: async (token: string) => {
    const response = await newsApiBase.post<TCheckTokenResponse>(pathUsersAPI.checkToken, {
      token,
    });
    return response.data;
  },
};
export default usersAPI;
