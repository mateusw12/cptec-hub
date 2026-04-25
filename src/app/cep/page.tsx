"use client";

import { Search, Hash, AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { Header } from "@/components/layout";
import {
  PageMain,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
} from "@/components/layout/PageShell";
import { CepCard } from "@/components/cep";
import { useCep } from "@/hooks/useCep";
import { theme } from "@/styles/theme";
import {
  ErrorBox,
  Hint,
  Input,
  SearchIcon,
  SearchWrapper,
  Spacer,
  StatusBox,
} from "./page.styles";
import { maskCep, getErrorMessage } from "./cep.helper";

export default function CepPage() {
  const [input, setInput] = useState("");
  const digits = input.replace(/\D/g, "");

  const { data, isFetching, isError, error } = useCep(digits);

  return (
    <>
      <Header />
      <PageMain>
        <section>
          <SectionHeader>
            <Hash size={18} color={theme.colors.secondary} />
            <SectionTitle>Busca de CEP</SectionTitle>
            <SectionSubtitle>via BrasilAPI</SectionSubtitle>
          </SectionHeader>

          <SearchWrapper>
            <SearchIcon size={16} color={theme.colors.textMuted} />
            <Input
              placeholder="00000-000"
              value={input}
              maxLength={9}
              onChange={(e) => setInput(maskCep(e.target.value))}
              inputMode="numeric"
              autoFocus
            />
          </SearchWrapper>
          <Hint>Digite os 8 dígitos do CEP para buscar automaticamente.</Hint>

          <Spacer />

          {isFetching ? (
            <StatusBox>
              <Loader2
                size={16}
                style={{ animation: "spin 1s linear infinite" }}
              />
              Consultando CEP...
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </StatusBox>
          ) : isError ? (
            <ErrorBox>
              <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
              {getErrorMessage(error)}
            </ErrorBox>
          ) : data ? (
            <CepCard data={data} />
          ) : digits.length > 0 && digits.length < 8 ? (
            <StatusBox>
              <Search size={14} />
              {8 - digits.length} dígito{8 - digits.length > 1 ? "s" : ""}{" "}
              restante{8 - digits.length > 1 ? "s" : ""}…
            </StatusBox>
          ) : null}
        </section>
      </PageMain>
    </>
  );
}
