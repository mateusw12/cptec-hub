"use client";

import { Search, X } from "lucide-react";
import { theme } from "@/styles/theme";
import {
  ClearButton,
  Input,
  InputWrapper,
  Wrapper,
} from "./UfSearch.styles";

// ─── Component ───────────────────────────────────────────────────────────────

interface UfSearchProps {
  onSearch: (term: string) => void;
  value: string;
}

export function UfSearch({ onSearch, value }: UfSearchProps) {
  const handleClear = () => onSearch("");

  return (
    <Wrapper>
      <InputWrapper>
        <Search size={16} color={theme.colors.textMuted} />
        <Input
          value={value}
          placeholder="Filtrar por estado ou região..."
          aria-label="Filtrar estados"
          onChange={(e) => onSearch(e.target.value)}
        />
        {value && (
          <ClearButton onClick={handleClear} aria-label="Limpar filtro">
            <X size={14} />
          </ClearButton>
        )}
      </InputWrapper>
    </Wrapper>
  );
}
