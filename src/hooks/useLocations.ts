import { useEstados } from "./useIbge";
import type { UfDTO } from "@/lib/dtos";

// Filtra estados localmente a partir da lista já carregada — evita requisições extras
export function useLocations(searchTerm: string) {
  const { data: estados, isLoading, isError, error } = useEstados();
  const trimmed = searchTerm.trim().toLowerCase();

  const filtered: UfDTO[] =
    trimmed.length >= 1
      ? (estados ?? []).filter(
          (uf) =>
            uf.nome.toLowerCase().includes(trimmed) ||
            uf.sigla.toLowerCase().includes(trimmed) ||
            uf.regiao.nome.toLowerCase().includes(trimmed),
        )
      : (estados ?? []);

  return { states: filtered, isLoading, isError, error };
}
