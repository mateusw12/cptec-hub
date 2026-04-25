import { apiFetch } from "./http-client";
import type { MunicipiosResponseDTO } from "./dtos";

// Retorna os municípios de uma unidade federativa (sigla UF ex: SP, RJ)
export async function getMunicipiosByUF(
  siglaUF: string
): Promise<MunicipiosResponseDTO> {
  const uf = siglaUF.toUpperCase();
  return apiFetch<MunicipiosResponseDTO>(`/ibge/municipios/v1/${uf}`);
}
