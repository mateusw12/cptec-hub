import { apiFetch } from "@/lib/api";
import {
  CapitalsWeatherResponseDTO,
  CitiesResponseDTO,
  OceanForecastDTO,
  WeatherForecastDTO,
} from "@/lib/dtos";

const API_PATH = "/cptec/v1";

export class CptecService {
  static async getCitiesByName(cityName: string): Promise<CitiesResponseDTO> {
    const encoded = encodeURIComponent(cityName);
    return apiFetch<CitiesResponseDTO>(`${API_PATH}/cidade/${encoded}`);
  }

  static async getCapitalsWeather(): Promise<CapitalsWeatherResponseDTO> {
    return apiFetch<CapitalsWeatherResponseDTO>(`${API_PATH}/clima/capital`);
  }

  static async getWeatherForecast(
    cityCode: number,
  ): Promise<WeatherForecastDTO> {
    return apiFetch<WeatherForecastDTO>(
      `${API_PATH}/clima/previsao/${cityCode}`,
    );
  }

  static async getWeatherForecastByDays(
    cityCode: number,
    days: 1 | 2 | 3 | 4 | 5 | 6,
  ): Promise<WeatherForecastDTO> {
    return apiFetch<WeatherForecastDTO>(
      `${API_PATH}/clima/previsao/${cityCode}/${days}`,
    );
  }

  static async getWeatherForecastByCoords(
    lat: number,
    lon: number,
  ): Promise<WeatherForecastDTO> {
    return apiFetch<WeatherForecastDTO>(
      `${API_PATH}/clima/previsao/semana/${lat}/${lon}`,
    );
  }

  static async getOceanForecast(cityCode: number): Promise<OceanForecastDTO> {
    return apiFetch<OceanForecastDTO>(`${API_PATH}/ondas/${cityCode}`);
  }

  static async getOceanForecastByDays(
    cityCode: number,
    days: 1 | 2 | 3 | 4 | 5 | 6,
  ): Promise<OceanForecastDTO> {
    return apiFetch<OceanForecastDTO>(`${API_PATH}/ondas/${cityCode}/${days}`);
  }
}
