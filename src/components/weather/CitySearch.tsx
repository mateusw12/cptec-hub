"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import styled from "@emotion/styled";
import { Search, X, MapPin, Loader2 } from "lucide-react";
import { theme } from "@/styles/theme";
import { useLocations } from "@/hooks/useLocations";
import { useWeatherStore } from "@/store/weatherStore";
import type { CityDTO } from "@/lib/dtos/cptec.dto";

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

const IconButton = styled.button`
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

const Dropdown = styled.ul`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  list-style: none;
  margin: 0;
  padding: ${theme.spacing.xs} 0;
  z-index: 50;
  box-shadow: ${theme.shadows.card};
  max-height: 280px;
  overflow-y: auto;
`;

const DropdownItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: 10px ${theme.spacing.md};
  cursor: pointer;
  transition: background 0.15s;

  &:hover,
  &[aria-selected="true"] {
    background: ${theme.colors.surfaceHover};
  }
`;

const CityName = styled.span`
  color: ${theme.colors.text};
  font-size: 0.9rem;
  flex: 1;
`;

const CityMeta = styled.span`
  color: ${theme.colors.textMuted};
  font-size: 0.78rem;
`;

const EmptyState = styled.li`
  padding: 12px ${theme.spacing.md};
  color: ${theme.colors.textMuted};
  font-size: 0.85rem;
  text-align: center;
`;

// ─── Component ───────────────────────────────────────────────────────────────

export function CitySearch() {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { cities, isLoading } = useLocations(inputValue);
  const { setSelectedCity } = useWeatherStore();

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = useCallback(
    (city: CityDTO) => {
      setSelectedCity(city.id, city.nome);
      setInputValue(`${city.nome} - ${city.estado}`);
      setIsOpen(false);
      setActiveIndex(-1);
    },
    [setSelectedCity]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || cities.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, cities.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(cities[activeIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    setInputValue("");
    setIsOpen(false);
    setActiveIndex(-1);
    inputRef.current?.focus();
  };

  const showDropdown = isOpen && inputValue.trim().length >= 2;

  return (
    <Wrapper ref={wrapperRef}>
      <InputWrapper>
        {isLoading ? (
          <Loader2 size={16} color={theme.colors.primary} className="spin" />
        ) : (
          <Search size={16} color={theme.colors.textMuted} />
        )}
        <Input
          ref={inputRef}
          value={inputValue}
          placeholder="Buscar cidade..."
          aria-label="Buscar cidade"
          aria-autocomplete="list"
          aria-expanded={showDropdown}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
        />
        {inputValue && (
          <IconButton onClick={handleClear} aria-label="Limpar busca">
            <X size={14} />
          </IconButton>
        )}
      </InputWrapper>

      {showDropdown && (
        <Dropdown role="listbox" aria-label="Resultados da busca">
          {cities.length === 0 && !isLoading && (
            <EmptyState>Nenhuma cidade encontrada</EmptyState>
          )}
          {cities.map((city, index) => (
            <DropdownItem
              key={city.id}
              role="option"
              aria-selected={index === activeIndex}
              onMouseDown={() => handleSelect(city)}
            >
              <MapPin size={14} color={theme.colors.textMuted} />
              <CityName>{city.nome}</CityName>
              <CityMeta>
                {city.estado} · {city.regiao}
              </CityMeta>
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </Wrapper>
  );
}
