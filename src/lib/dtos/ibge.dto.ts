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

// DTO: Erro 404 - Estado não encontrado
export interface EstadoNotFoundDTO {
  name: "EstadoNotFoundException";
  message: string;
  type: "not_found";
}
