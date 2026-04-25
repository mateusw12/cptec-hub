import { Header } from "@/components/layout";
import { EstadosGrid } from "@/components/ibge";
import { TaxasHighlights } from "@/components/taxas";
import Link from "next/link";
import styled from "@emotion/styled";
import {
  PageMain,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
} from "@/components/layout/PageShell";
import { Card } from "@/components/ui/Card";
import { theme } from "@/styles/theme";

const ModulesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: ${theme.spacing.md};
`;

const ModuleLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const ModuleTitle = styled.h3`
  margin: 0 0 ${theme.spacing.xs};
  color: ${theme.colors.text};
  font-size: 1rem;
`;

const ModuleSubtitle = styled.p`
  margin: 0;
  color: ${theme.colors.textMuted};
  font-size: 0.82rem;
`;

export default function HomePage() {
  return (
    <>
      <Header />
      <PageMain>
        <section>
          <SectionHeader>
            <SectionTitle>Taxas em destaque</SectionTitle>
            <SectionSubtitle>top 3 maiores valores</SectionSubtitle>
          </SectionHeader>
          <TaxasHighlights />
        </section>

        <section>
          <SectionHeader>
            <SectionTitle>Módulos BrasilAPI</SectionTitle>
            <SectionSubtitle>consultas rápidas</SectionSubtitle>
          </SectionHeader>
          <ModulesGrid>
            <ModuleLink href="/cep">
              <Card>
                <ModuleTitle>CEP</ModuleTitle>
                <ModuleSubtitle>Consulta de endereço por CEP</ModuleSubtitle>
              </Card>
            </ModuleLink>
            <ModuleLink href="/cnpj">
              <Card>
                <ModuleTitle>CNPJ</ModuleTitle>
                <ModuleSubtitle>Minha Receita e quadro societário</ModuleSubtitle>
              </Card>
            </ModuleLink>
            <ModuleLink href="/cvm">
              <Card>
                <ModuleTitle>CVM</ModuleTitle>
                <ModuleSubtitle>Corretoras e fundos com paginação</ModuleSubtitle>
              </Card>
            </ModuleLink>
            <ModuleLink href="/taxas">
              <Card>
                <ModuleTitle>Taxas</ModuleTitle>
                <ModuleSubtitle>Índices oficiais e taxas de juros</ModuleSubtitle>
              </Card>
            </ModuleLink>
          </ModulesGrid>
        </section>

        <section>
          <SectionHeader>
            <SectionTitle>Estados do Brasil</SectionTitle>
            <SectionSubtitle>dados IBGE e municípios</SectionSubtitle>
          </SectionHeader>
          <EstadosGrid />
        </section>
      </PageMain>
    </>
  );
}
