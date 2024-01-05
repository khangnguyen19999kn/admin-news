import { useQuery } from "@tanstack/react-query";

import { CACHE_DATA_STALE_TIME } from "@/constant/variable";

import newsApi from "../service/news.api";

export function useGetStudentByName(name: string) {
  return useQuery({
    queryKey: [`student-${name}`],
    queryFn: () => newsApi.getStudentByName(name),
    staleTime: CACHE_DATA_STALE_TIME.MEDIUM,
  });
}
