import { create } from "zustand";
import type { UfDTO } from "@/lib/dtos";

interface IbgeStore {
  selectedUf: UfDTO | null;
  setSelectedUf: (uf: UfDTO) => void;
  clearSelectedUf: () => void;
}

export const useIbgeStore = create<IbgeStore>((set) => ({
  selectedUf: null,
  setSelectedUf: (uf) => set({ selectedUf: uf }),
  clearSelectedUf: () => set({ selectedUf: null }),
}));
