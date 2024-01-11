import usersAPI from "@/services/api/service/users.api";
import { useMutation } from "@tanstack/react-query";

export const useCheckToken = () => {
  return useMutation({
    mutationFn: (token: string) => usersAPI.checkTokenValidity(token),
  });
};
