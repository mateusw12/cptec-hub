"use client";

import styled from "@emotion/styled";
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

const ErrorMessage = styled.p`
  color: ${theme.colors.danger};
  font-size: 0.875rem;
  padding: ${theme.spacing.md};
  background: ${theme.colors.danger}11;
  border: 1px solid ${theme.colors.danger}33;
  border-radius: ${theme.borderRadius.md};
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
  const { data, isLoading, isError } = useCapitalsWeather();

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
      <ErrorMessage>
        Não foi possível carregar as condições das capitais. Tente novamente.
      </ErrorMessage>
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
