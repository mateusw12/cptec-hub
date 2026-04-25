import { apiFetch } from "@/lib/api";
import { MunicipiosResponseDTO } from "@/lib/dtos";

const IAPI_PATH = "/ibge";

export class IbgeService {
  static async getMunicipiosByUF(
    siglaUF: string,
  ): Promise<MunicipiosResponseDTO> {
    const uf = siglaUF.toUpperCase();
    return apiFetch<MunicipiosResponseDTO>(`${IAPI_PATH}/municipios/v1/${uf}`);
  }
}
