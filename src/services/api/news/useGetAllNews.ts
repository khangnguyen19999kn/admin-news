import { useQuery } from "@tanstack/react-query";

import { CACHE_DATA_STALE_TIME } from "@/constant/variable";

import { newsKeys } from "@/services/api/news/queryKey";
import newsApi from "@/services/api/service/news.api";

export function useGetNewsList() {
  return useQuery({
    queryKey: newsKeys.all(),
    queryFn: () => newsApi.getListNews(),
    staleTime: CACHE_DATA_STALE_TIME.MEDIUM,
  });
}
