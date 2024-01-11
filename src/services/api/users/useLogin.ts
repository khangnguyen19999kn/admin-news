import { TFormLogin } from "@/pages/Login/Login";
import usersAPI from "@/services/api/service/users.api";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: (formLogin: TFormLogin) => usersAPI.login(formLogin),
  });
};
