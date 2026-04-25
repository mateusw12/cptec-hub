"use client";

import { MapPin, Building2, Navigation, Hash, Wifi } from "lucide-react";
import { theme } from "@/styles/theme";
import type { CepDTO } from "@/lib/dtos";
import {
  AddressMain,
  CepBadge,
  Grid,
  MetaItem,
  ServiceTag,
  Street,
  StyledCard,
  TopRow,
} from "./CepCard.styles";

function formatCep(cep: string) {
  return cep.replace(/^(\d{5})(\d{3})$/, "$1-$2");
}

interface CepCardProps {
  data: CepDTO;
}

export function CepCard({ data }: CepCardProps) {
  return (
    <StyledCard>
      <TopRow>
        <CepBadge>
          <Hash size={14} />
          {formatCep(data.cep)}
        </CepBadge>
        <ServiceTag>
          <Wifi size={11} />
          via {data.service}
        </ServiceTag>
      </TopRow>

      <AddressMain>
        {data.street && <Street>{data.street}</Street>}
        <Grid>
          {data.neighborhood && (
            <MetaItem>
              <Navigation size={14} color={theme.colors.primary} />
              <span>Bairro: <strong>{data.neighborhood}</strong></span>
            </MetaItem>
          )}
          <MetaItem>
            <Building2 size={14} color={theme.colors.primary} />
            <span>Cidade: <strong>{data.city}</strong></span>
          </MetaItem>
          <MetaItem>
            <MapPin size={14} color={theme.colors.secondary} />
            <span>Estado: <strong>{data.state}</strong></span>
          </MetaItem>
        </Grid>
      </AddressMain>
    </StyledCard>
  );
}
