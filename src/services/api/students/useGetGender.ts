import { useQuery } from "@tanstack/react-query";

import { CACHE_DATA_STALE_TIME } from "@/constant/variable";
import newsApi from "@/services/api/service/news.api";

export function useGetGender() {
  return useQuery({
    queryKey: [`student-gender`],
    queryFn: () => newsApi.getGenderCount(),
    staleTime: CACHE_DATA_STALE_TIME.MEDIUM,
  });
}
