"use client";

import { Users, MapPin } from "lucide-react";
import { theme } from "@/styles/theme";
import { useRouter } from "next/navigation";
import { useIbgeStore } from "@/store/ibgeStore";
import { BadgeVariant, REGIAO_VARIANT } from "@/lib/enum";
import type { UfDTO } from "@/lib/dtos";
import {
  Footer,
  Header,
  MetaItem,
  Nome,
  Sigla,
  SiglaWrapper,
  StyledCard,
} from "./UfCard.styles";
import { Badge } from "../ui/Badge.styles";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatPopulacao(pop: number | undefined | null): string {
  if (pop == null) return "–";
  if (pop >= 1_000_000) return `${(pop / 1_000_000).toFixed(1)}M`;
  if (pop >= 1_000) return `${(pop / 1_000).toFixed(0)}K`;
  return pop.toString();
}

// ─── Component ───────────────────────────────────────────────────────────────

interface UfCardProps {
  data: UfDTO;
}

export function UfCard({ data }: UfCardProps) {
  const router = useRouter();
  const { selectedUf, setSelectedUf } = useIbgeStore();
  const isSelected = selectedUf?.sigla === data.sigla;

  function handleSelect() {
    setSelectedUf(data);
    router.push(`/estado/${data.sigla}`);
  }

  return (
    <StyledCard
      $selected={isSelected}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onClick={handleSelect}
      onKeyDown={(e) => e.key === "Enter" && handleSelect()}
    >
      <Header>
        <SiglaWrapper>
          <Sigla>{data.sigla}</Sigla>
        </SiglaWrapper>
        <Badge
          variant={
            REGIAO_VARIANT[data.regiao.nome as keyof typeof REGIAO_VARIANT] ??
            BadgeVariant.DEFAULT
          }
        >
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
