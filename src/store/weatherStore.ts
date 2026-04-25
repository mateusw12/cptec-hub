import { create } from "zustand";

interface WeatherStore {
  selectedCityCode: number | null;
  selectedCityName: string | null;
  setSelectedCity: (code: number, name: string) => void;
  clearSelectedCity: () => void;
}

export const useWeatherStore = create<WeatherStore>((set) => ({
  selectedCityCode: null,
  selectedCityName: null,
  setSelectedCity: (code, name) =>
    set({ selectedCityCode: code, selectedCityName: name }),
  clearSelectedCity: () =>
    set({ selectedCityCode: null, selectedCityName: null }),
}));
