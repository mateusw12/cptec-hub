"use client";

import {
  ArrowLeft,
  Users,
  Map,
  Building2,
  CloudOff,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";
import { theme } from "@/styles/theme";
import { Skeleton, SkeletonCard, SkeletonText } from "@/components/ui/Skeleton";
import { useEstado, useLocalidadesMunicipios } from "@/hooks/useIbge";
import { BadgeVariant, REGIAO_VARIANT } from "@/lib/enum";
import {
  BackLink,
  Container,
  EmptyMsg,
  ErrorBox,
  HeroCard,
  InfoBlock,
  MetaItem,
  MetaRow,
  MunicipioCode,
  MunicipioHeader,
  MunicipioItem,
  MunicipioList,
  MunicipioName,
  Nome,
  RetryButton,
  SearchIcon,
  SearchInput,
  SearchWrapper,
  SectionHeader,
  SectionSubtitle,
  SectionTitle,
  Sigla,
  SiglaBlock,
} from "./EstadoDetail.styles";
import { Badge } from "@/components/ui/Badge.styles";

interface EstadoDetailProps {
  sigla: string;
}

export function EstadoDetail({ sigla }: EstadoDetailProps) {
  const [search, setSearch] = useState("");

  const { data: uf, isLoading: ufLoading, isError: ufError } = useEstado(sigla);

  const {
    data: municipios,
    isLoading: munLoading,
    isError: munError,
    refetch: munRefetch,
  } = useLocalidadesMunicipios(sigla);

  const filtered = (municipios ?? []).filter((m) =>
    m.nome.toLowerCase().includes(search.toLowerCase()),
  );

  function formatPopulacao(pop: number | undefined | null): string {
    if (pop == null) return "–";
    return new Intl.NumberFormat("pt-BR").format(pop);
  }

  return (
    <Container>
      <BackLink href="/">
        <ArrowLeft size={16} />
        Todos os estados
      </BackLink>

      {ufLoading ? (
        <HeroCard>
          <SkeletonCard>
            <Skeleton
              width="96px"
              height="96px"
              borderRadius={theme.borderRadius.lg}
            />
          </SkeletonCard>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: theme.spacing.sm,
            }}
          >
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
            <Badge
              variant={
                REGIAO_VARIANT[uf.regiao.nome as keyof typeof REGIAO_VARIANT] ??
                BadgeVariant.DEFAULT
              }
            >
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
              <MunicipioItem key={m.codigo_ibge ?? String(m.id ?? m.nome)}>
                <MunicipioHeader>
                  <MunicipioName>
                    <Building2 size={13} color={theme.colors.textMuted} />
                    {m.nome}
                  </MunicipioName>
                  <MunicipioCode>
                    {m.codigo_ibge ?? String(m.id ?? "-")}
                  </MunicipioCode>
                </MunicipioHeader>
              </MunicipioItem>
            ))}
          </MunicipioList>
        )}
      </section>
    </Container>
  );
}
