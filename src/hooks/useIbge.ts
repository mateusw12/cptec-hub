import { useQuery } from "@tanstack/react-query";
import { IbgeService } from "@/services/ibge/ibge";

const QUERY_KEYS = {
  estados: () => ["ibge", "estados"] as const,
  estado: (code: string | number) => ["ibge", "estado", code] as const,
  municipios: (uf: string) => ["ibge", "municipios", uf] as const,
};

export function useEstados() {
  return useQuery({
    queryKey: QUERY_KEYS.estados(),
    queryFn: IbgeService.getEstados,
    staleTime: 1000 * 60 * 60, // 1 hora — dados mudam raramente
  });
}

export function useEstado(code: string | number | null) {
  return useQuery({
    queryKey: QUERY_KEYS.estado(code!),
    queryFn: () => IbgeService.getEstadoByCode(code!),
    enabled: code !== null && code !== "",
    staleTime: 1000 * 60 * 60,
    retry: (failureCount, error) => {
      if ((error as { status?: number }).status === 404) return false;
      return failureCount < 3;
    },
  });
}

export function useMunicipios(siglaUF: string) {
  const uf = siglaUF.trim().toUpperCase();

  return useQuery({
    queryKey: QUERY_KEYS.municipios(uf),
    queryFn: () => IbgeService.getMunicipiosByUF(uf),
    enabled: uf.length === 2,
    staleTime: 1000 * 60 * 60,
  });
}
