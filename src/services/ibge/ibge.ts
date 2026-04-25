import { apiFetch } from "@/lib/api";
import { MunicipiosResponseDTO, UfDTO, UfsResponseDTO } from "@/lib/dtos";
import type { FeatureCollection } from "geojson";

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

  static async getMalhaEstado(ufId: number): Promise<FeatureCollection> {
    const params = new URLSearchParams({
      formato: "application/vnd.geo+json",
      qualidade: "minima",
      intrarregiao: "municipio",
    });
    const res = await fetch(`/api/ibge/v3/malhas/estados/${ufId}?${params}`);
    if (!res.ok) throw new Error(`Malha API ${res.status}`);
    return res.json() as Promise<FeatureCollection>;
  }
}
