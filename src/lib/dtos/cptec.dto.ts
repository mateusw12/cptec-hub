// DTO: Busca de cidades pelo nome
export interface CityDTO {
  nome: string;
  estado: string;
  regiao: string;
  id: number;
}

export type CitiesResponseDTO = CityDTO[];

// DTO: Erro de cidade não encontrada
export interface CityNotFoundErrorDTO {
  name: string;
  message: string;
  type: "NO_CITY_NOT_FOUND";
}

// DTO: Condição climática por dia
export interface DailyClimateDTO {
  data: string;
  condicao: string;
  min: number;
  max: number;
  indice_uv: number;
  condicao_desc: string;
}

// DTO: Previsão meteorológica de uma cidade
export interface WeatherForecastDTO {
  cidade: string;
  estado: string;
  atualizado_em: string;
  clima: DailyClimateDTO[];
}

// DTO: Erro de cidade não localizada (previsão)
export interface CityForecastNotFoundErrorDTO {
  message: string;
  type: "CITY_NOT_FOUND";
}

// DTO: Condições atuais nas capitais
export interface CapitalWeatherDTO {
  codigo_icao: string;
  atualizado_em: string;
  pressao_atmosferica: string;
  visibilidade: string;
  vento: number;
  direcao_vento: number;
  umidade: number;
  condicao: string;
  condicao_Desc: string;
  temp: number;
}

export type CapitalsWeatherResponseDTO = CapitalWeatherDTO[];

// DTO: Dados de ondas por horário
export interface WaveDataDTO {
  vento: number;
  direcao_vento: string;
  direcao_vento_desc: string;
  altura_onda: number;
  direcao_onda: string;
  direcao_onda_desc: string;
  agitacao: string;
  hora: string;
}

// DTO: Previsão oceânica por dia
export interface OceanDayForecastDTO {
  data: string;
  dados_ondas: WaveDataDTO[];
}

// DTO: Previsão oceânica de uma cidade
export interface OceanForecastDTO {
  cidade: string;
  estado: string;
  atualizado_em: string;
  ondas: OceanDayForecastDTO[];
}
