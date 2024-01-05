import { useQuery } from "@tanstack/react-query";

import { CACHE_DATA_STALE_TIME } from "@/constant/variable";
import newsApi from "@/services/api/service/news.api";

export function useGetStudentStatistics() {
  return useQuery({
    queryKey: [`student-statistics`],
    queryFn: () => newsApi.getStatistics(),
    staleTime: CACHE_DATA_STALE_TIME.MEDIUM,
  });
}
