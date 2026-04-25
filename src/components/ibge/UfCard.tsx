"use client";

import styled from "@emotion/styled";
import { Users, MapPin } from "lucide-react";
import { theme } from "@/styles/theme";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useIbgeStore } from "@/store/ibgeStore";
import type { UfDTO } from "@/lib/dtos";

// ─── Styles ──────────────────────────────────────────────────────────────────

const StyledCard = styled(Card)<{ $selected: boolean }>`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  outline: none;

  ${({ $selected }) =>
    $selected &&
    `
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.glow};
    background: ${theme.colors.surfaceHover};
  `}
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SiglaWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const Sigla = styled.span`
  font-size: 1.6rem;
  font-weight: 800;
  color: ${theme.colors.text};
  line-height: 1;
`;

const Nome = styled.p`
  font-size: 0.85rem;
  color: ${theme.colors.textMuted};
  margin: 0;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding-top: ${theme.spacing.sm};
  border-top: 1px solid ${theme.colors.border};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  color: ${theme.colors.textMuted};
`;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatPopulacao(pop: number): string {
  if (pop >= 1_000_000) return `${(pop / 1_000_000).toFixed(1)}M`;
  if (pop >= 1_000) return `${(pop / 1_000).toFixed(0)}K`;
  return pop.toString();
}

const REGIAO_VARIANT: Record<
  string,
  "default" | "accent" | "warning" | "danger" | "secondary"
> = {
  Norte: "accent",
  Nordeste: "warning",
  "Centro-Oeste": "secondary",
  Sudeste: "default",
  Sul: "danger",
};

// ─── Component ───────────────────────────────────────────────────────────────

interface UfCardProps {
  data: UfDTO;
}

export function UfCard({ data }: UfCardProps) {
  const { selectedUf, setSelectedUf } = useIbgeStore();
  const isSelected = selectedUf?.sigla === data.sigla;

  return (
    <StyledCard
      $selected={isSelected}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onClick={() => setSelectedUf(data)}
      onKeyDown={(e) => e.key === "Enter" && setSelectedUf(data)}
    >
      <Header>
        <SiglaWrapper>
          <Sigla>{data.sigla}</Sigla>
        </SiglaWrapper>
        <Badge variant={REGIAO_VARIANT[data.regiao.nome] ?? "default"}>
          {data.regiao.sigla}
        </Badge>
      </Header>

      <Nome>{data.nome}</Nome>

      <Footer>
        <MetaItem>
          <Users size={12} color={theme.colors.primary} />
          {formatPopulacao(data.populacao_estimada)} hab.
        </MetaItem>
        <MetaItem style={{ marginLeft: "auto" }}>
          <MapPin size={12} color={theme.colors.textMuted} />
          {data.regiao.nome}
        </MetaItem>
      </Footer>
    </StyledCard>
  );
}
