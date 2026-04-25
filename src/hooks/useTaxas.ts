import { useQuery } from "@tanstack/react-query";
import { TaxasService } from "@/services/taxas/taxas";

export function useTaxas() {
  return useQuery({
    queryKey: ["taxas", "v1"],
    queryFn: TaxasService.getTaxas,
    staleTime: 1000 * 60 * 30,
  });
}
