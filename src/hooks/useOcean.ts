import { useQuery } from "@tanstack/react-query";
import {
  getOceanForecast,
  getOceanForecastByDays,
} from "@/services/api/cptec";

const QUERY_KEYS = {
  ocean: (cityCode: number) => ["ocean", cityCode] as const,
  oceanDays: (cityCode: number, days: number) =>
    ["ocean", cityCode, days] as const,
};

export function useOcean(cityCode: number | null) {
  return useQuery({
    queryKey: QUERY_KEYS.ocean(cityCode!),
    queryFn: () => getOceanForecast(cityCode!),
    enabled: cityCode !== null,
    staleTime: 1000 * 60 * 10,
  });
}

export function useOceanByDays(
  cityCode: number | null,
  days: 1 | 2 | 3 | 4 | 5 | 6 = 6
) {
  return useQuery({
    queryKey: QUERY_KEYS.oceanDays(cityCode!, days),
    queryFn: () => getOceanForecastByDays(cityCode!, days),
    enabled: cityCode !== null,
    staleTime: 1000 * 60 * 10,
  });
}
