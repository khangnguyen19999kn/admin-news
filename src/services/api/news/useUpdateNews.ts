import { TFormAddNews } from "@/pages/AddUpdateNews/types";
import { useMutation } from "@tanstack/react-query";
import newsApi from "../service/news.api";

export const useUpdateNews = (id: string) => {
  return useMutation({
    mutationFn: (news: TFormAddNews) => newsApi.updateNews(id, news),
  });
};
