import { apiFetch } from "@/lib/api";
import { MunicipiosResponseDTO, UfDTO, UfsResponseDTO } from "@/lib/dtos";

const IAPI_PATH = "/ibge";

export class IbgeService {
  static async getEstados(): Promise<UfsResponseDTO> {
    return apiFetch<UfsResponseDTO>(`${IAPI_PATH}/uf/v1`);
  }

  static async getEstadoByCode(code: string | number): Promise<UfDTO> {
    return apiFetch<UfDTO>(`${IAPI_PATH}/uf/v1/${code}`);
  }

  static async getMunicipiosByUF(
    siglaUF: string,
  ): Promise<MunicipiosResponseDTO> {
    const uf = siglaUF.toUpperCase();
    return apiFetch<MunicipiosResponseDTO>(`${IAPI_PATH}/municipios/v1/${uf}`);
  }
}
