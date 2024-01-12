import { CACHE_DATA_STALE_TIME } from "@/constant/variable";
import { newsKeys } from "@/services/api/news/queryKey";
import newsApi from "@/services/api/service/news.api";
import { useQuery } from "@tanstack/react-query";

export const useGetDetailNews = (id: string) => {
  return useQuery({
    queryKey: newsKeys.content(id),
    queryFn: () => newsApi.getDetailNews(id),
    staleTime: CACHE_DATA_STALE_TIME.MEDIUM,
  });
};
