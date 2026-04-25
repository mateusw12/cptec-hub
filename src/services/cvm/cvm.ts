import { apiFetch } from "@/lib/api";
import type { CvmCorretorasResponseDTO, CvmFundosResponseDTO } from "@/lib/dtos";

const API_PATH = "/brasil/cvm";

export class CvmService {
  static async getCorretoras(): Promise<CvmCorretorasResponseDTO> {
    return apiFetch<CvmCorretorasResponseDTO>(`${API_PATH}/corretoras/v1`);
  }

  static async getFundos(page = 1, size = 20): Promise<CvmFundosResponseDTO> {
    const params = new URLSearchParams({
      page: String(page),
      size: String(size),
    });

    return apiFetch<CvmFundosResponseDTO>(`${API_PATH}/fundos/v1?${params.toString()}`);
  }
}
