import { useQuery } from "@tanstack/react-query";
import { CvmService } from "@/services/cvm/cvm";

export function useCorretoras() {
  return useQuery({
    queryKey: ["cvm", "corretoras"],
    queryFn: CvmService.getCorretoras,
    staleTime: 1000 * 60 * 30,
  });
}

export function useFundos(page = 1, size = 20) {
  return useQuery({
    queryKey: ["cvm", "fundos", page, size],
    queryFn: () => CvmService.getFundos(page, size),
    staleTime: 1000 * 60 * 10,
  });
}
