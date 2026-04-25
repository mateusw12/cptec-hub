import { apiFetch } from "@/lib/api";
import { LocalidadeMunicipiosResponseDTO, UfDTO, UfsResponseDTO } from "@/lib/dtos";

const IAPI_PATH = "/ibge";

export class IbgeService {
  static async getEstados(): Promise<UfsResponseDTO> {
    return apiFetch<UfsResponseDTO>(`${IAPI_PATH}/uf/v1`);
  }

  static async getEstadoByCode(code: string | number): Promise<UfDTO> {
    return apiFetch<UfDTO>(`${IAPI_PATH}/uf/v1/${code}`);
  }

  static async getLocalidadesMunicipios(
    siglaUF: string,
  ): Promise<LocalidadeMunicipiosResponseDTO> {
    const uf = siglaUF.toUpperCase();
    return apiFetch<LocalidadeMunicipiosResponseDTO>(
      `${IAPI_PATH}/v1/localidades/estados/${uf}/municipios`,
    );
  }
}
