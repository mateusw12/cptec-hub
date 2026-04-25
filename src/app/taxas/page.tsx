"use client";

import styled from "@emotion/styled";
import { Percent, Loader2, AlertCircle } from "lucide-react";
import { Header } from "@/components/layout";
import { useTaxas } from "@/hooks/useTaxas";
import { Card } from "@/components/ui/Card";
import { PageMain, SectionHeader, SectionSubtitle, SectionTitle } from "@/components/layout/PageShell";
import { theme } from "@/styles/theme";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${theme.spacing.md};
`;

const Name = styled.p`
  margin: 0 0 ${theme.spacing.xs};
  color: ${theme.colors.textMuted};
  font-size: 0.8rem;
`;

const Value = styled.strong`
  color: ${theme.colors.text};
  font-size: 1.2rem;
`;

const Status = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.textMuted};
`;

export default function TaxasPage() {
  const { data, isLoading, isError } = useTaxas();

  return (
    <>
      <Header />
      <PageMain>
        <section>
          <SectionHeader>
            <Percent size={18} color={theme.colors.secondary} />
            <SectionTitle>Taxas e Índices</SectionTitle>
            <SectionSubtitle>via BrasilAPI</SectionSubtitle>
          </SectionHeader>

          {isLoading ? (
            <Status>
              <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
              Carregando taxas...
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </Status>
          ) : isError ? (
            <Status>
              <AlertCircle size={16} color={theme.colors.danger} />
              Erro ao carregar taxas.
            </Status>
          ) : (
            <Grid>
              {(data ?? []).map((taxa) => (
                <Card key={taxa.nome}>
                  <Name>{taxa.nome}</Name>
                  <Value>{taxa.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}%</Value>
                </Card>
              ))}
            </Grid>
          )}
        </section>
      </PageMain>
    </>
  );
}
