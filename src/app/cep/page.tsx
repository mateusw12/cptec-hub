"use client";

import styled from "@emotion/styled";
import { Search, Hash, AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { Header } from "@/components/layout";
import { PageMain, SectionHeader, SectionTitle, SectionSubtitle } from "@/components/layout/PageShell";
import { CepCard } from "@/components/cep";
import { useCep } from "@/hooks/useCep";
import { theme } from "@/styles/theme";

// ─── Styles ──────────────────────────────────────────────────────────────────

const SearchWrapper = styled.div`
  position: relative;
  max-width: 420px;
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 0.875rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;

const Input = styled.input`
  width: 100%;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text};
  font-size: 1rem;
  letter-spacing: 0.05em;
  padding: ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} 2.75rem;
  outline: none;
  transition: border-color 0.15s;

  &:focus {
    border-color: ${theme.colors.primary};
  }
  &::placeholder {
    color: ${theme.colors.textMuted};
    letter-spacing: 0;
  }
`;

const Hint = styled.p`
  font-size: 0.8rem;
  color: ${theme.colors.textMuted};
  margin-top: ${theme.spacing.xs};
`;

const StatusBox = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.textMuted};
  font-size: 0.875rem;
  padding: ${theme.spacing.xl} 0;
`;

const ErrorBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.sm};
  background: ${theme.colors.danger}18;
  border: 1px solid ${theme.colors.danger}44;
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  font-size: 0.875rem;
  color: ${theme.colors.danger};
  max-width: 520px;
`;

const Spacer = styled.div`
  height: ${theme.spacing.lg};
`;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function maskCep(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length > 5) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  return digits;
}

function getErrorMessage(err: unknown): string {
  if (!err) return "Erro desconhecido.";
  const e = err as { status?: number; message?: string };
  if (e.status === 404) return "CEP não encontrado. Verifique se está correto.";
  if (e.message) return e.message;
  return "Erro ao buscar o CEP. Tente novamente.";
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CepPage() {
  const [input, setInput] = useState("");
  const digits = input.replace(/\D/g, "");

  const { data, isFetching, isError, error } = useCep(digits);

  return (
    <>
      <Header />
      <PageMain>
        <section>
          <SectionHeader>
            <Hash size={18} color={theme.colors.secondary} />
            <SectionTitle>Busca de CEP</SectionTitle>
            <SectionSubtitle>via BrasilAPI</SectionSubtitle>
          </SectionHeader>

          <SearchWrapper>
            <SearchIcon size={16} color={theme.colors.textMuted} />
            <Input
              placeholder="00000-000"
              value={input}
              maxLength={9}
              onChange={(e) => setInput(maskCep(e.target.value))}
              inputMode="numeric"
              autoFocus
            />
          </SearchWrapper>
          <Hint>Digite os 8 dígitos do CEP para buscar automaticamente.</Hint>

          <Spacer />

          {isFetching ? (
            <StatusBox>
              <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
              Consultando CEP...
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </StatusBox>
          ) : isError ? (
            <ErrorBox>
              <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
              {getErrorMessage(error)}
            </ErrorBox>
          ) : data ? (
            <CepCard data={data} />
          ) : digits.length > 0 && digits.length < 8 ? (
            <StatusBox>
              <Search size={14} />
              {8 - digits.length} dígito{8 - digits.length > 1 ? "s" : ""} restante{8 - digits.length > 1 ? "s" : ""}…
            </StatusBox>
          ) : null}
        </section>
      </PageMain>
    </>
  );
}
