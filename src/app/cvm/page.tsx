"use client";

import {
  Landmark,
  Loader2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Grid,
} from "lucide-react";
import { useState } from "react";
import {
  Header,
  PageMain,
  SectionHeader,
  SectionSubtitle,
  SectionTitle,
} from "@/components/layout";
import { useCorretoras, useFundos } from "@/hooks/useCvm";
import { Card } from "@/components/ui/Card.styles";
import { theme } from "@/styles/theme";
import {
  Status,
  Row,
  Label,
  Value,
  Controls,
  Select,
  Button,
} from "./cvmPage.styles";

export default function CvmPage() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(20);
  const [statusFilter, setStatusFilter] = useState("ALL");

  const corretoras = useCorretoras();
  const fundos = useFundos(page, size);

  const fundosData = fundos.data?.data ?? [];
  const statusOptions = Array.from(
    new Set(fundosData.map((f) => f.situacao).filter(Boolean)),
  ).sort();
  const filteredFundos =
    statusFilter === "ALL"
      ? fundosData
      : fundosData.filter((fundo) => fundo.situacao === statusFilter);

  return (
    <>
      <Header />
      <PageMain>
        <section>
          <SectionHeader>
            <Landmark size={18} color={theme.colors.secondary} />
            <SectionTitle>CVM - Corretoras</SectionTitle>
            <SectionSubtitle>via BrasilAPI</SectionSubtitle>
          </SectionHeader>

          {corretoras.isLoading ? (
            <Status>
              <Loader2
                size={16}
                style={{ animation: "spin 1s linear infinite" }}
              />
              Carregando corretoras...
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </Status>
          ) : corretoras.isError ? (
            <Status>
              <AlertCircle size={16} color={theme.colors.danger} />
              Erro ao carregar corretoras.
            </Status>
          ) : (
            <Grid>
              {(corretoras.data ?? []).slice(0, 12).map((item) => (
                <Card key={item.cnpj}>
                  <Row>
                    <div>
                      <Label>Nome Comercial</Label>
                      <Value>{item.nome_comercial || "-"}</Value>
                    </div>
                    <div>
                      <Label>Status</Label>
                      <Value>{item.status || "-"}</Value>
                    </div>
                  </Row>
                  <Row>
                    <div>
                      <Label>CNPJ</Label>
                      <Value>{item.cnpj || "-"}</Value>
                    </div>
                    <div>
                      <Label>UF</Label>
                      <Value>{item.uf || "-"}</Value>
                    </div>
                  </Row>
                </Card>
              ))}
            </Grid>
          )}
        </section>

        <section>
          <SectionHeader>
            <Landmark size={18} color={theme.colors.secondary} />
            <SectionTitle>CVM - Fundos</SectionTitle>
            <SectionSubtitle>
              página {page} · tamanho {size}
              {statusFilter !== "ALL" ? ` · status: ${statusFilter}` : ""}
            </SectionSubtitle>
          </SectionHeader>

          <Controls>
            <Select
              value={size}
              onChange={(e) => {
                setSize(Number(e.target.value));
                setPage(1);
              }}
            >
              {[10, 20, 50, 100, 200].map((option) => (
                <option key={option} value={option}>
                  {option} por página
                </option>
              ))}
            </Select>

            <Select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="ALL">Todos os status</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </Select>

            <Button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1 || fundos.isFetching}
            >
              <ChevronLeft size={14} /> Anterior
            </Button>
            <Button
              onClick={() => setPage((p) => p + 1)}
              disabled={
                fundos.isFetching || (fundos.data?.data?.length ?? 0) < size
              }
            >
              Próxima <ChevronRight size={14} />
            </Button>
          </Controls>

          {fundos.isLoading ? (
            <Status>
              <Loader2
                size={16}
                style={{ animation: "spin 1s linear infinite" }}
              />
              Carregando fundos...
            </Status>
          ) : fundos.isError ? (
            <Status>
              <AlertCircle size={16} color={theme.colors.danger} />
              Erro ao carregar fundos.
            </Status>
          ) : filteredFundos.length === 0 ? (
            <Status>
              <AlertCircle size={16} color={theme.colors.warning} />
              Nenhum fundo encontrado para o status selecionado.
            </Status>
          ) : (
            <Grid style={{ marginTop: theme.spacing.md }}>
              {filteredFundos.map((fundo) => (
                <Card key={`${fundo.codigo_cvm}-${fundo.cnpj}`}>
                  <Label>Denominação Social</Label>
                  <Value>{fundo.denominacao_social}</Value>
                  <Row>
                    <div>
                      <Label>CNPJ</Label>
                      <Value>{fundo.cnpj}</Value>
                    </div>
                    <div>
                      <Label>Situação</Label>
                      <Value>{fundo.situacao}</Value>
                    </div>
                  </Row>
                </Card>
              ))}
            </Grid>
          )}
        </section>
      </PageMain>
    </>
  );
}
