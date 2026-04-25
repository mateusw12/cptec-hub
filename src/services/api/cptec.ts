import { apiFetch } from "./http-client";
import { CPTEC_API_PATH } from "./constants";
import type {
  CitiesResponseDTO,
  WeatherForecastDTO,
  CapitalsWeatherResponseDTO,
  OceanForecastDTO,
} from "./dtos";

export class CptecService {
  static async getCitiesByName(
    cityName: string
  ): Promise<CitiesResponseDTO> {
    const encoded = encodeURIComponent(cityName);
    return apiFetch<CitiesResponseDTO>(`${CPTEC_API_PATH}/cidade/${encoded}`);
  }

  static async getCapitalsWeather(): Promise<CapitalsWeatherResponseDTO> {
    return apiFetch<CapitalsWeatherResponseDTO>(
      `${CPTEC_API_PATH}/clima/capital`
    );
  }

  static async getWeatherForecast(
    cityCode: number
  ): Promise<WeatherForecastDTO> {
    return apiFetch<WeatherForecastDTO>(
      `${CPTEC_API_PATH}/clima/previsao/${cityCode}`
    );
  }

  static async getWeatherForecastByDays(
    cityCode: number,
    days: 1 | 2 | 3 | 4 | 5 | 6
  ): Promise<WeatherForecastDTO> {
    return apiFetch<WeatherForecastDTO>(
      `${CPTEC_API_PATH}/clima/previsao/${cityCode}/${days}`
    );
  }

  static async getWeatherForecastByCoords(
    lat: number,
    lon: number
  ): Promise<WeatherForecastDTO> {
    return apiFetch<WeatherForecastDTO>(
      `${CPTEC_API_PATH}/clima/previsao/semana/${lat}/${lon}`
    );
  }

  static async getOceanForecast(
    cityCode: number
  ): Promise<OceanForecastDTO> {
    return apiFetch<OceanForecastDTO>(`${CPTEC_API_PATH}/ondas/${cityCode}`);
  }

  static async getOceanForecastByDays(
    cityCode: number,
    days: 1 | 2 | 3 | 4 | 5 | 6
  ): Promise<OceanForecastDTO> {
    return apiFetch<OceanForecastDTO>(
      `${CPTEC_API_PATH}/ondas/${cityCode}/${days}`
    );
  }
}
