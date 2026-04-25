import { useQuery } from "@tanstack/react-query";
import { CptecService } from "@/services/cptec/cptec";

const QUERY_KEYS = {
  weather: (cityCode: number) => ["weather", cityCode] as const,
  weatherDays: (cityCode: number, days: number) =>
    ["weather", cityCode, days] as const,
  weatherCoords: (lat: number, lon: number) =>
    ["weather", "coords", lat, lon] as const,
  capitals: () => ["weather", "capitals"] as const,
};

export function useWeather(cityCode: number | null) {
  return useQuery({
    queryKey: QUERY_KEYS.weather(cityCode!),
    queryFn: () => CptecService.getWeatherForecast(cityCode!),
    enabled: cityCode !== null,
    staleTime: 1000 * 60 * 10, // 10 min
  });
}

export function useWeatherByDays(
  cityCode: number | null,
  days: 1 | 2 | 3 | 4 | 5 | 6 = 6
) {
  return useQuery({
    queryKey: QUERY_KEYS.weatherDays(cityCode!, days),
    queryFn: () => CptecService.getWeatherForecastByDays(cityCode!, days),
    enabled: cityCode !== null,
    staleTime: 1000 * 60 * 10,
  });
}

export function useWeatherByCoords(
  lat: number | null,
  lon: number | null
) {
  return useQuery({
    queryKey: QUERY_KEYS.weatherCoords(lat!, lon!),
    queryFn: () => CptecService.getWeatherForecastByCoords(lat!, lon!),
    enabled: lat !== null && lon !== null,
    staleTime: 1000 * 60 * 10,
  });
}

export function useCapitalsWeather() {
  return useQuery({
    queryKey: QUERY_KEYS.capitals(),
    queryFn: CptecService.getCapitalsWeather,
    staleTime: 1000 * 60 * 15, // 15 min
  });
}
