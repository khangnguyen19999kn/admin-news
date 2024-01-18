import { useQuery } from "@tanstack/react-query";
import newsApi from "../service/news.api";
import { newsKeys } from "./queryKey";
import { CACHE_DATA_STALE_TIME } from "@/constant/variable";

export const useSearchNews = (title: string) => {
  return useQuery({
    queryKey: newsKeys.search(title),
    queryFn: () => newsApi.searchNews(title),
    staleTime: CACHE_DATA_STALE_TIME.MEDIUM,
    enabled: !!title,
  });
};
