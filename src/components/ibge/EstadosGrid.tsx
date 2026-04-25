"use client";

import { useState } from "react";
import { RefreshCw, MapPin } from "lucide-react";
import { theme } from "@/styles/theme";
import { useEstados } from "@/hooks/useIbge";
import { useLocations } from "@/hooks/useLocations";
import { UfCard } from "./UfCard";
import { UfSearch } from "./UfSearch";
import { SkeletonCard, SkeletonText, Skeleton } from "@/components/ui/Skeleton";
import {
  EmptyState,
  ErrorBox,
  ErrorHint,
  ErrorTitle,
  Grid,
  ResultCount,
  RetryButton,
  SkeletonBottomRow,
  SkeletonTopRow,
  Toolbar,
  Wrapper,
} from "./EstadosGrid.styles";

// ─── Skeleton ────────────────────────────────────────────────────────────────

function UfCardSkeleton() {
  return (
    <SkeletonCard>
      <SkeletonTopRow>
        <Skeleton width="48px" height="32px" borderRadius="4px" />
        <Skeleton width="36px" height="18px" borderRadius="999px" />
      </SkeletonTopRow>
      <SkeletonText width="75%" />
      <SkeletonBottomRow>
        <SkeletonText width="40%" />
        <SkeletonText width="40%" />
      </SkeletonBottomRow>
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
