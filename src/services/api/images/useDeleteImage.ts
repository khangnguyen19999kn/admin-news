import imageAPI from "@/services/api/service/image.api";
import { useMutation } from "@tanstack/react-query";

export const useDeleteImage = () => {
  return useMutation({
    mutationFn: (imageUrl: string) => imageAPI.delete(imageUrl),
  });
};
