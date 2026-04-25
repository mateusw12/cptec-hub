// DTO: Região
export interface RegiaoDTO {
  id: number;
  sigla: string;
  nome: string;
}

// DTO: Estado (UF)
export interface UfDTO {
  id: number;
  sigla: string;
  nome: string;
  regiao: RegiaoDTO;
  populacao_estimada: number;
  periodo: string;
}

export type UfsResponseDTO = UfDTO[];

// DTO: Erro 404 - UF não encontrada
export interface UfNotFoundErrorDTO {
  name: "NotFoundError";
  message: string;
  type: "not_found";
}

// DTO: Município do IBGE
export interface MunicipioDTO {
  nome: string;
  codigo_ibge: string;
}

export type MunicipiosResponseDTO = MunicipioDTO[];

// DTO: Erro 400 - UF inválida
export interface UfBadRequestDTO {
  name: "UfBadRequestException";
  message: string;
  type: "bad_request";
}

// DTO: Erro 404 - Estado não encontrado (municípios)
export interface EstadoNotFoundDTO {
  name: "EstadoNotFoundException";
  message: string;
  type: "not_found";
}
