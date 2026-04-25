import { apiFetch } from "./http-client";
import { IBGE_API_PATH } from "./constants";
import type { MunicipiosResponseDTO } from "./dtos";

export class IbgeService {
  static async getMunicipiosByUF(
    siglaUF: string
  ): Promise<MunicipiosResponseDTO> {
    const uf = siglaUF.toUpperCase();
    return apiFetch<MunicipiosResponseDTO>(
      `${IBGE_API_PATH}/municipios/v1/${uf}`
    );
  }
}
