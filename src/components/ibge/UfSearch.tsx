"use client";

import { useState } from "react";
import styled from "@emotion/styled";
import { Search, X } from "lucide-react";
import { theme } from "@/styles/theme";
import { useLocations } from "@/hooks/useLocations";
import { useIbgeStore } from "@/store/ibgeStore";
import type { UfDTO } from "@/lib/dtos";

// ─── Styles ──────────────────────────────────────────────────────────────────

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 480px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  padding: 10px ${theme.spacing.md};
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus-within {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}33;
  }
`;

const Input = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: ${theme.colors.text};
  font-size: 0.95rem;
  font-family: ${theme.typography.fontFamily};

  &::placeholder {
    color: ${theme.colors.textMuted};
  }
`;

const ClearButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${theme.colors.textMuted};
  display: flex;
  align-items: center;
  padding: 0;
  transition: color 0.15s;

  &:hover {
    color: ${theme.colors.text};
  }
`;

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
