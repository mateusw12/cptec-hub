import { useQuery } from "@tanstack/react-query";
import { CnpjService } from "@/services/cnpj/cnpj";

export function useCnpj(cnpj: string) {
  const digits = cnpj.replace(/\D/g, "");

  return useQuery({
    queryKey: ["cnpj", digits],
    queryFn: () => CnpjService.getCnpj(digits),
    enabled: digits.length === 14,
    retry: (failureCount, error) => {
      const status = (error as { status?: number }).status;
      if (status === 400 || status === 404) return false;
      return failureCount < 2;
    },
    staleTime: 1000 * 60 * 60,
  });
}
