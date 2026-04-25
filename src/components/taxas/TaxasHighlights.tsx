"use client";

import styled from "@emotion/styled";
import { Percent, Loader2, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { useTaxas } from "@/hooks/useTaxas";
import { theme } from "@/styles/theme";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: ${theme.spacing.md};
`;

const TaxaNome = styled.p`
  margin: 0 0 ${theme.spacing.xs};
  color: ${theme.colors.textMuted};
  font-size: 0.78rem;
`;

const TaxaValor = styled.strong`
  color: ${theme.colors.text};
  font-size: 1.15rem;
`;

const Status = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.textMuted};
  font-size: 0.875rem;
`;

export function TaxasHighlights() {
  const { data, isLoading, isError } = useTaxas();

  const topTaxas = [...(data ?? [])]
    .filter((taxa) => Number.isFinite(taxa.valor))
    .sort((a, b) => b.valor - a.valor)
    .slice(0, 3);

  if (isLoading) {
    return (
      <Status>
        <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
        Carregando taxas em destaque...
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </Status>
    );
  }

  if (isError) {
    return (
      <Status>
        <AlertCircle size={16} color={theme.colors.danger} />
        Não foi possível carregar as taxas em destaque.
      </Status>
    );
  }

  if (!topTaxas.length) {
    return (
      <Status>
        <Percent size={16} />
        Sem taxas para exibir.
      </Status>
    );
  }

  return (
    <Grid>
      {topTaxas.map((taxa) => (
        <Card key={taxa.nome}>
          <TaxaNome>{taxa.nome}</TaxaNome>
          <TaxaValor>
            {taxa.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}%
          </TaxaValor>
        </Card>
      ))}
    </Grid>
  );
}
