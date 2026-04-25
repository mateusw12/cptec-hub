"use client";

import styled from "@emotion/styled";
import {
  ArrowLeft,
  Users,
  Map,
  Building2,
  Search,
  CloudOff,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";
import { theme } from "@/styles/theme";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Skeleton, SkeletonCard, SkeletonText } from "@/components/ui/Skeleton";
import { useEstado, useMunicipios, useMalhaEstado } from "@/hooks/useIbge";
import { EstadoMapDynamic } from "@/components/ibge/EstadoMapDynamic";

type BadgeVariant = "default" | "accent" | "warning" | "danger" | "secondary";

// ─── Styles ──────────────────────────────────────────────────────────────────

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: ${theme.spacing["2xl"]} ${theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing["2xl"]};

  @media (max-width: 640px) {
    padding: ${theme.spacing.lg} ${theme.spacing.md};
  }
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.textMuted};
  font-size: 0.875rem;
  text-decoration: none;
  width: fit-content;

  &:hover {
    color: ${theme.colors.text};
  }
`;

const HeroCard = styled(Card)`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${theme.spacing.xl};
  align-items: center;

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`;

const SiglaBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 96px;
  height: 96px;
  border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.surfaceHover};
  border: 1px solid ${theme.colors.primary}44;
  flex-shrink: 0;
`;

const Sigla = styled.span`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${theme.colors.primary};
  letter-spacing: -1px;
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const Nome = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${theme.colors.text};
  margin: 0;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
`;

const MetaItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-size: 0.875rem;
  color: ${theme.colors.textMuted};
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
`;

const SectionTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${theme.colors.text};
  margin: 0;
`;

const SectionSubtitle = styled.span`
  font-size: 0.8rem;
  color: ${theme.colors.textMuted};
`;

const SearchInput = styled.input`
  width: 100%;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text};
  font-size: 0.875rem;
  padding: ${theme.spacing.sm} ${theme.spacing.md} ${theme.spacing.sm} 2.25rem;
  outline: none;
  margin-bottom: ${theme.spacing.md};

  &:focus {
    border-color: ${theme.colors.primary};
  }
  &::placeholder {
    color: ${theme.colors.textMuted};
  }
`;

const SearchWrapper = styled.div`
  position: relative;
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 0.625rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;

const MunicipioList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const MunicipioItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.875rem;
  color: ${theme.colors.text};
`;

const EmptyMsg = styled.p`
  color: ${theme.colors.textMuted};
  font-size: 0.875rem;
  text-align: center;
  padding: ${theme.spacing.xl} 0;
`;

const ErrorBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing["2xl"]};
  color: ${theme.colors.textMuted};
  font-size: 0.875rem;
`;

const RetryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  background: transparent;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.textMuted};
  font-size: 0.8rem;
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  cursor: pointer;

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.text};
  }
`;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatPopulacao(pop: number | undefined | null): string {
  if (pop == null) return "–";
  return new Intl.NumberFormat("pt-BR").format(pop);
}

const REGIAO_VARIANT: Record<string, BadgeVariant> = {
  Norte: "secondary",
  Nordeste: "warning",
  "Centro-Oeste": "accent",
  Sudeste: "default",
  Sul: "danger",
};

// ─── Component ───────────────────────────────────────────────────────────────

interface EstadoDetailProps {
  sigla: string;
}

export function EstadoDetail({ sigla }: EstadoDetailProps) {
  const [search, setSearch] = useState("");

  const {
    data: uf,
    isLoading: ufLoading,
    isError: ufError,
  } = useEstado(sigla);

  const {
    data: municipios,
    isLoading: munLoading,
    isError: munError,
    refetch: munRefetch,
  } = useMunicipios(sigla);

  const { data: malha, isLoading: malhaLoading } = useMalhaEstado(uf?.id);

  const nomesPorCodigo = useMemo(() => {
    const lookup: Record<string, string> = {};
    for (const m of municipios ?? []) {
      lookup[m.codigo_ibge] = m.nome;
    }
    return lookup;
  }, [municipios]);

  const filtered = (municipios ?? []).filter((m) =>
    m.nome.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Container>
      <BackLink href="/">
        <ArrowLeft size={16} />
        Todos os estados
      </BackLink>

      {/* UF Hero */}
      {ufLoading ? (
        <HeroCard>
          <SkeletonCard>
            <Skeleton width="96px" height="96px" borderRadius={theme.borderRadius.lg} />
          </SkeletonCard>
          <div style={{ display: "flex", flexDirection: "column", gap: theme.spacing.sm }}>
            <Skeleton width="180px" height="28px" />
            <Skeleton width="120px" height="16px" />
            <Skeleton width="220px" height="16px" />
          </div>
        </HeroCard>
      ) : ufError || !uf ? (
        <ErrorBox>
          <CloudOff size={32} />
          Não foi possível carregar os dados do estado.
        </ErrorBox>
      ) : (
        <HeroCard>
          <SiglaBlock>
            <Sigla>{uf.sigla}</Sigla>
          </SiglaBlock>
          <InfoBlock>
            <Badge variant={REGIAO_VARIANT[uf.regiao.nome] ?? "default"}>
              {uf.regiao.nome}
            </Badge>
            <Nome>{uf.nome}</Nome>
            <MetaRow>
              <MetaItem>
                <Users size={14} color={theme.colors.primary} />
                {formatPopulacao(uf.populacao_estimada)} habitantes
                {uf.periodo ? ` (${uf.periodo})` : ""}
              </MetaItem>
              <MetaItem>
                <Map size={14} color={theme.colors.textMuted} />
                Região {uf.regiao.nome}
              </MetaItem>
            </MetaRow>
          </InfoBlock>
        </HeroCard>
      )}

      {/* Mapa */}
      <section>
        <SectionHeader>
          <Map size={18} color={theme.colors.secondary} />
          <SectionTitle>Mapa por município</SectionTitle>
        </SectionHeader>
        {malhaLoading ? (
          <Skeleton height="420px" borderRadius={theme.borderRadius.lg} />
        ) : malha ? (
          <EstadoMapDynamic geoJson={malha} nomesPorCodigo={nomesPorCodigo} />
        ) : null}
      </section>

      {/* Municípios */}
      <section>
        <SectionHeader>
          <Building2 size={18} color={theme.colors.secondary} />
          <SectionTitle>Municípios</SectionTitle>
          {!munLoading && !munError && municipios && (
            <SectionSubtitle>{municipios.length} municípios</SectionSubtitle>
          )}
        </SectionHeader>

        <SearchWrapper>
          <SearchIcon size={14} color={theme.colors.textMuted} />
          <SearchInput
            placeholder="Buscar município..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchWrapper>

        {munLoading ? (
          <MunicipioList>
            {Array.from({ length: 8 }).map((_, i) => (
              <li key={i}>
                <SkeletonCard style={{ padding: theme.spacing.sm }}>
                  <SkeletonText width={`${60 + (i % 4) * 10}%`} />
                </SkeletonCard>
              </li>
            ))}
          </MunicipioList>
        ) : munError ? (
          <ErrorBox>
            <CloudOff size={28} />
            Erro ao carregar municípios.
            <RetryButton onClick={() => munRefetch()}>
              <RefreshCw size={12} /> Tentar novamente
            </RetryButton>
          </ErrorBox>
        ) : filtered.length === 0 ? (
          <EmptyMsg>Nenhum município encontrado.</EmptyMsg>
        ) : (
          <MunicipioList>
            {filtered.map((m) => (
              <MunicipioItem key={m.nome}>
                <Building2 size={13} color={theme.colors.textMuted} />
                {m.nome}
              </MunicipioItem>
            ))}
          </MunicipioList>
        )}
      </section>
    </Container>
  );
}
