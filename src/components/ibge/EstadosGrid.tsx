"use client";

import { useState } from "react";
import styled from "@emotion/styled";
import { RefreshCw, MapPin } from "lucide-react";
import { theme } from "@/styles/theme";
import { useEstados } from "@/hooks/useIbge";
import { useLocations } from "@/hooks/useLocations";
import { UfCard } from "./UfCard";
import { UfSearch } from "./UfSearch";
import { SkeletonCard, SkeletonText, Skeleton } from "@/components/ui/Skeleton";

// ─── Styles ──────────────────────────────────────────────────────────────────

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
`;

const ResultCount = styled.span`
  font-size: 0.8rem;
  color: ${theme.colors.textMuted};
  white-space: nowrap;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${theme.spacing.md};
`;

const ErrorBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing["2xl"]};
  background: ${theme.colors.danger}0d;
  border: 1px solid ${theme.colors.danger}33;
  border-radius: ${theme.borderRadius.lg};
  text-align: center;
`;

const ErrorTitle = styled.p`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${theme.colors.danger};
  margin: 0;
`;

const ErrorHint = styled.p`
  font-size: 0.8rem;
  color: ${theme.colors.textMuted};
  margin: 0;
`;

const RetryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: 8px 18px;
  background: transparent;
  border: 1px solid ${theme.colors.danger}66;
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.danger};
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: ${theme.colors.danger}1a;
  }
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing["2xl"]};
  color: ${theme.colors.textMuted};
  font-size: 0.875rem;
`;

// ─── Skeleton ────────────────────────────────────────────────────────────────

function UfCardSkeleton() {
  return (
    <SkeletonCard>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Skeleton width="48px" height="32px" borderRadius="4px" />
        <Skeleton width="36px" height="18px" borderRadius="999px" />
      </div>
      <SkeletonText width="75%" />
      <div style={{ display: "flex", gap: 12, paddingTop: 8, borderTop: `1px solid ${theme.colors.border}` }}>
        <SkeletonText width="40%" />
        <SkeletonText width="40%" />
      </div>
    </SkeletonCard>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export function EstadosGrid() {
  const [search, setSearch] = useState("");
  const { isLoading, isError, isFetching, refetch } = useEstados();
  const { states } = useLocations(search);

  if (isLoading) {
    return (
      <Wrapper>
        <Grid>
          {Array.from({ length: 27 }).map((_, i) => (
            <UfCardSkeleton key={i} />
          ))}
        </Grid>
      </Wrapper>
    );
  }

  if (isError) {
    return (
      <ErrorBox>
        <MapPin size={32} color={theme.colors.danger} />
        <div>
          <ErrorTitle>Não foi possível carregar os estados</ErrorTitle>
          <ErrorHint>Verifique sua conexão e tente novamente.</ErrorHint>
        </div>
        <RetryButton onClick={() => refetch()} disabled={isFetching}>
          <RefreshCw size={13} />
          {isFetching ? "Tentando..." : "Tentar novamente"}
        </RetryButton>
      </ErrorBox>
    );
  }

  return (
    <Wrapper>
      <Toolbar>
        <UfSearch value={search} onSearch={setSearch} />
        <ResultCount>
          {states.length} estado{states.length !== 1 ? "s" : ""}
        </ResultCount>
      </Toolbar>

      <Grid>
        {states.length === 0 ? (
          <EmptyState>
            <MapPin size={24} />
            <span>Nenhum estado encontrado para &ldquo;{search}&rdquo;</span>
          </EmptyState>
        ) : (
          states.map((uf) => <UfCard key={uf.sigla} data={uf} />)
        )}
      </Grid>
    </Wrapper>
  );
}
