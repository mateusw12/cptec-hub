import { apiFetch } from "@/lib/api";
import type { CnpjDTO } from "@/lib/dtos";

const API_PATH = "/brasil/cnpj/v1";

export class CnpjService {
  static async getCnpj(cnpj: string): Promise<CnpjDTO> {
    const digits = cnpj.replace(/\D/g, "");
    return apiFetch<CnpjDTO>(`${API_PATH}/${digits}`);
  }
}
