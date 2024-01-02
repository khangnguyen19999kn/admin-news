import { useQuery } from "@tanstack/react-query";

import { CACHE_DATA_STALE_TIME } from "@/constant/variable";

import { newsKeys } from "@/services/api/news/queryKey";
import studentApi from "../service/student.api";

export function useGetNewsList() {
  return useQuery({
    queryKey: newsKeys.all(),
    queryFn: () => studentApi.getListNews(),
    staleTime: CACHE_DATA_STALE_TIME.MEDIUM,
  });
}
