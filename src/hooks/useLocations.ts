import { useQuery } from "@tanstack/react-query";
import { getCitiesByName } from "@/services/api/cptec";
import { getMunicipiosByUF } from "@/services/api/ibge";

const QUERY_KEYS = {
  cities: (term: string) => ["locations", "cities", term] as const,
  municipios: (uf: string) => ["locations", "municipios", uf] as const,
};

export function useLocations(searchTerm: string) {
  const trimmed = searchTerm.trim();

  const query = useQuery({
    queryKey: QUERY_KEYS.cities(trimmed),
    queryFn: () => getCitiesByName(trimmed),
    enabled: trimmed.length >= 2,
    staleTime: 1000 * 60 * 30, // 30 min - localidades mudam pouco
  });

  return {
    cities: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}

export function useMunicipios(siglaUF: string) {
  const uf = siglaUF.trim().toUpperCase();

  return useQuery({
    queryKey: QUERY_KEYS.municipios(uf),
    queryFn: () => getMunicipiosByUF(uf),
    enabled: uf.length === 2,
    staleTime: 1000 * 60 * 60, // 1 hora
  });
}
