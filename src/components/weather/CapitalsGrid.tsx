"use client";

import styled from "@emotion/styled";
import { RefreshCw, CloudOff } from "lucide-react";
import { theme } from "@/styles/theme";
import { useCapitalsWeather } from "@/hooks/useWeather";
import { CapitalCard } from "./CapitalCard";
import { SkeletonCard, SkeletonText, Skeleton } from "@/components/ui/Skeleton";

// ─── Styles ──────────────────────────────────────────────────────────────────

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
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

// ─── Skeleton placeholder ─────────────────────────────────────────────────────

function CapitalCardSkeleton() {
  return (
    <SkeletonCard>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SkeletonText width="60%" />
        <SkeletonText width="20%" />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Skeleton width="28px" height="28px" borderRadius="50%" />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
          <SkeletonText width="40%" height="24px" />
          <SkeletonText width="70%" />
        </div>
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <SkeletonText width="30%" />
        <SkeletonText width="30%" />
        <SkeletonText width="30%" />
      </div>
    </SkeletonCard>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export function CapitalsGrid() {
  const { data, isLoading, isError, isFetching, refetch } =
    useCapitalsWeather();

  if (isLoading) {
    return (
      <Grid>
        {Array.from({ length: 12 }).map((_, i) => (
          <CapitalCardSkeleton key={i} />
        ))}
      </Grid>
    );
  }

  if (isError) {
    return (
      <ErrorBox>
        <CloudOff size={32} color={theme.colors.danger} />
        <div>
          <ErrorTitle>Serviço temporariamente indisponível</ErrorTitle>
          <ErrorHint>
            A API do CPTEC está instável no momento. Os dados serão
            exibidos assim que o serviço se recuperar.
          </ErrorHint>
        </div>
        <RetryButton onClick={() => refetch()} disabled={isFetching}>
          <RefreshCw size={13} />
          {isFetching ? "Tentando..." : "Tentar novamente"}
        </RetryButton>
      </ErrorBox>
    );
  }

  return (
    <Grid>
      {data?.map((capital) => (
        <CapitalCard key={capital.codigo_icao} data={capital} />
      ))}
    </Grid>
  );
}

