import { useQuery } from "@tanstack/react-query";
import { CepService } from "@/services/cep/cep";

export function useCep(cep: string) {
  const digits = cep.replace(/\D/g, "");

  return useQuery({
    queryKey: ["cep", digits],
    queryFn: () => CepService.getCep(digits),
    enabled: digits.length === 8,
    retry: (failureCount, error) => {
      if ((error as { status?: number }).status === 404) return false;
      return failureCount < 2;
    },
    staleTime: 1000 * 60 * 60,
  });
}
