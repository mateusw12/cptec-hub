import { apiFetch } from "@/lib/api";
import type { CepDTO } from "@/lib/dtos";

const API_PATH = "/cep/v1";

export class CepService {
  static async getCep(cep: string): Promise<CepDTO> {
    const digits = cep.replace(/\D/g, "");
    return apiFetch<CepDTO>(`${API_PATH}/${digits}`);
  }
}
