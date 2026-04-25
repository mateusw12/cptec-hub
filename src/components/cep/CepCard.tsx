"use client";

import styled from "@emotion/styled";
import { MapPin, Building2, Navigation, Hash, Wifi } from "lucide-react";
import { theme } from "@/styles/theme";
import { Card } from "@/components/ui/Card";
import type { CepDTO } from "@/lib/dtos";

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const CepBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  background: ${theme.colors.primary}22;
  border: 1px solid ${theme.colors.primary}55;
  border-radius: ${theme.borderRadius.full};
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  color: ${theme.colors.secondary};
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  width: fit-content;
`;

const AddressMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const Street = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${theme.colors.text};
  margin: 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.sm};

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: 0.875rem;
  color: ${theme.colors.textMuted};

  strong {
    color: ${theme.colors.text};
    font-weight: 500;
  }
`;

const ServiceTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-size: 0.75rem;
  color: ${theme.colors.textMuted};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.full};
  padding: 2px ${theme.spacing.sm};
`;

function formatCep(cep: string) {
  return cep.replace(/^(\d{5})(\d{3})$/, "$1-$2");
}

interface CepCardProps {
  data: CepDTO;
}

export function CepCard({ data }: CepCardProps) {
  return (
    <StyledCard>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: theme.spacing.sm }}>
        <CepBadge>
          <Hash size={14} />
          {formatCep(data.cep)}
        </CepBadge>
        <ServiceTag>
          <Wifi size={11} />
          via {data.service}
        </ServiceTag>
      </div>

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
