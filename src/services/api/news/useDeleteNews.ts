import { useMutation } from "@tanstack/react-query";
import newsApi from "../service/news.api";

export const useDeleteNews = () => {
  return useMutation({
    mutationFn: (id: string) => newsApi.deleteNews(id),
  });
};
