import { useMutation } from "@tanstack/react-query";
import newsApi from "../service/news.api";
import { TFormAddNews } from "@/pages/AddNews/types";

export const useCreateNews = () => {
  return useMutation({
    mutationFn: (news: TFormAddNews) => newsApi.createNews(news),
  });
};
