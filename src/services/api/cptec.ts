import { apiFetch } from "./http-client";
import type {
  CitiesResponseDTO,
  WeatherForecastDTO,
  CapitalsWeatherResponseDTO,
  OceanForecastDTO,
} from "./dtos";

// Busca cidades pelo nome
export async function getCitiesByName(
  cityName: string
): Promise<CitiesResponseDTO> {
  const encoded = encodeURIComponent(cityName);
  return apiFetch<CitiesResponseDTO>(`/cptec/v1/cidade/${encoded}`);
}

// Condições atuais nas capitais
export async function getCapitalsWeather(): Promise<CapitalsWeatherResponseDTO> {
  return apiFetch<CapitalsWeatherResponseDTO>("/cptec/v1/clima/capital");
}

// Previsão meteorológica para 1 dia
export async function getWeatherForecast(
  cityCode: number
): Promise<WeatherForecastDTO> {
  return apiFetch<WeatherForecastDTO>(`/cptec/v1/clima/previsao/${cityCode}`);
}

// Previsão meteorológica para até 6 dias
export async function getWeatherForecastByDays(
  cityCode: number,
  days: 1 | 2 | 3 | 4 | 5 | 6
): Promise<WeatherForecastDTO> {
  return apiFetch<WeatherForecastDTO>(
    `/cptec/v1/clima/previsao/${cityCode}/${days}`
  );
}

// Previsão meteorológica por latitude e longitude (até 5 dias)
export async function getWeatherForecastByCoords(
  lat: number,
  lon: number
): Promise<WeatherForecastDTO> {
  return apiFetch<WeatherForecastDTO>(
    `/cptec/v1/clima/previsao/semana/${lat}/${lon}`
  );
}

// Previsão oceânica para 1 dia
export async function getOceanForecast(
  cityCode: number
): Promise<OceanForecastDTO> {
  return apiFetch<OceanForecastDTO>(`/cptec/v1/ondas/${cityCode}`);
}

// Previsão oceânica para até 6 dias
export async function getOceanForecastByDays(
  cityCode: number,
  days: 1 | 2 | 3 | 4 | 5 | 6
): Promise<OceanForecastDTO> {
  return apiFetch<OceanForecastDTO>(`/cptec/v1/ondas/${cityCode}/${days}`);
}
