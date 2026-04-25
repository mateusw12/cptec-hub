import { apiFetch } from "@/lib/api";
import type { TaxasResponseDTO } from "@/lib/dtos";

const API_PATH = "/brasil/taxas/v1";

export class TaxasService {
  static async getTaxas(): Promise<TaxasResponseDTO> {
    return apiFetch<TaxasResponseDTO>(API_PATH);
  }
}
