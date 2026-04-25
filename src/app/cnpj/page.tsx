"use client";

import styled from "@emotion/styled";
import { Building2, Search, AlertCircle, Loader2, Users } from "lucide-react";
import { useState } from "react";
import { Header } from "@/components/layout";
import { Card } from "@/components/ui/Card";
import { useCnpj } from "@/hooks/useCnpj";
import { PageMain, SectionHeader, SectionTitle, SectionSubtitle } from "@/components/layout/PageShell";
import { theme } from "@/styles/theme";

const SearchWrapper = styled.div`
  position: relative;
  max-width: 460px;
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 0.875rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;

const Input = styled.input`
  width: 100%;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text};
  font-size: 1rem;
  letter-spacing: 0.02em;
  padding: ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} 2.75rem;
  outline: none;

  &:focus {
    border-color: ${theme.colors.primary};
  }
  &::placeholder {
    color: ${theme.colors.textMuted};
    letter-spacing: 0;
  }
`;

const Hint = styled.p`
  font-size: 0.8rem;
  color: ${theme.colors.textMuted};
  margin-top: ${theme.spacing.xs};
`;

const StatusBox = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.textMuted};
  font-size: 0.875rem;
  padding: ${theme.spacing.lg} 0;
`;

const ErrorBox = styled.div`
  display: inline-flex;
  align-items: flex-start;
  gap: ${theme.spacing.sm};
  background: ${theme.colors.danger}18;
  border: 1px solid ${theme.colors.danger}44;
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  font-size: 0.875rem;
  color: ${theme.colors.danger};
  max-width: 680px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${theme.spacing.md};

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const Label = styled.span`
  color: ${theme.colors.textMuted};
  font-size: 0.75rem;
`;

const Value = styled.p`
  color: ${theme.colors.text};
  margin: 2px 0 0;
  font-size: 0.9rem;
`;

const Socios = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const SocioItem = styled.li`
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.surface};
`;

function maskCnpj(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 14);
  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  if (digits.length <= 8) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  if (digits.length <= 12) {
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
  }
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;
}

function formatMoney(value: number | undefined) {
  if (value == null) return "-";
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

export default function CnpjPage() {
  const [input, setInput] = useState("");
  const digits = input.replace(/\D/g, "");
  const { data, isFetching, isError, error } = useCnpj(digits);

  return (
    <>
      <Header />
      <PageMain>
        <section>
          <SectionHeader>
            <Building2 size={18} color={theme.colors.secondary} />
            <SectionTitle>Busca de CNPJ</SectionTitle>
            <SectionSubtitle>via Minha Receita (BrasilAPI)</SectionSubtitle>
          </SectionHeader>

          <SearchWrapper>
            <SearchIcon size={16} color={theme.colors.textMuted} />
            <Input
              placeholder="00.000.000/0000-00"
              value={input}
              maxLength={18}
              onChange={(e) => setInput(maskCnpj(e.target.value))}
              inputMode="numeric"
              autoFocus
            />
          </SearchWrapper>
          <Hint>Digite os 14 dígitos do CNPJ para consultar os dados cadastrais.</Hint>

          {isFetching ? (
            <StatusBox>
              <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
              Consultando CNPJ...
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </StatusBox>
          ) : isError ? (
            <ErrorBox>
              <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
              {(error as { message?: string })?.message ?? "Erro ao consultar CNPJ."}
            </ErrorBox>
          ) : data ? (
            <>
              <Card>
                <Grid>
                  <div>
                    <Label>Razão Social</Label>
                    <Value>{data.razao_social || "-"}</Value>
                  </div>
                  <div>
                    <Label>Nome Fantasia</Label>
                    <Value>{data.nome_fantasia || "-"}</Value>
                  </div>
                  <div>
                    <Label>Situação</Label>
                    <Value>{data.descricao_situacao_cadastral || "-"}</Value>
                  </div>
                  <div>
                    <Label>Início de Atividade</Label>
                    <Value>{data.data_inicio_atividade || "-"}</Value>
                  </div>
                  <div>
                    <Label>CNAE Principal</Label>
                    <Value>{data.cnae_fiscal_descricao || "-"}</Value>
                  </div>
                  <div>
                    <Label>Capital Social</Label>
                    <Value>{formatMoney(data.capital_social)}</Value>
                  </div>
                  <div>
                    <Label>Telefone</Label>
                    <Value>{data.ddd_telefone_1 || "-"}</Value>
                  </div>
                  <div>
                    <Label>E-mail</Label>
                    <Value>{data.email || "-"}</Value>
                  </div>
                  <div>
                    <Label>Endereço</Label>
                    <Value>{`${data.logradouro || ""}, ${data.numero || "S/N"} ${data.complemento || ""}`.trim()}</Value>
                  </div>
                  <div>
                    <Label>Cidade/UF</Label>
                    <Value>{`${data.municipio || "-"}/${data.uf || "-"}`}</Value>
                  </div>
                </Grid>
              </Card>

              <SectionHeader style={{ marginTop: theme.spacing.lg }}>
                <Users size={18} color={theme.colors.secondary} />
                <SectionTitle>QSA</SectionTitle>
                <SectionSubtitle>{data.qsa?.length ?? 0} sócio(s)</SectionSubtitle>
              </SectionHeader>

              {data.qsa?.length ? (
                <Socios>
                  {data.qsa.map((socio, idx) => (
                    <SocioItem key={`${socio.nome_socio}-${idx}`}>
                      <Label>{socio.qualificacao_socio || "Sócio"}</Label>
                      <Value>{socio.nome_socio || "Não informado"}</Value>
                    </SocioItem>
                  ))}
                </Socios>
              ) : (
                <Hint>Sem quadro societário disponível.</Hint>
              )}
            </>
          ) : digits.length > 0 && digits.length < 14 ? (
            <StatusBox>
              <Search size={14} />
              {14 - digits.length} dígito{14 - digits.length > 1 ? "s" : ""} restante{14 - digits.length > 1 ? "s" : ""}...
            </StatusBox>
          ) : null}
        </section>
      </PageMain>
    </>
  );
}
