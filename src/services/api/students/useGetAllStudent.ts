import { useQuery } from "@tanstack/react-query";

import { CACHE_DATA_STALE_TIME } from "@/constant/variable";

import newsApi from "../service/news.api";

export function useGetStudentList() {
  return useQuery({
    queryKey: ["student"],
    queryFn: () => newsApi.getListStudent(),
    staleTime: CACHE_DATA_STALE_TIME.MEDIUM,
  });
}
