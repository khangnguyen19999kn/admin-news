import imageAPI from "@/services/api/service/image.api";
import { useMutation } from "@tanstack/react-query";

export const useUploadImage = () => {
  return useMutation({
    mutationFn: (formData: FormData) => imageAPI.upload(formData),
  });
};
