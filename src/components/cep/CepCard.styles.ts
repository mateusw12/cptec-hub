import styled from "@emotion/styled";
import { Card } from "@/components/ui/Card";
import { theme } from "@/styles/theme";

export const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
`;

export const CepBadge = styled.div`
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

export const AddressMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

export const Street = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${theme.colors.text};
  margin: 0;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.sm};

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const MetaItem = styled.div`
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

export const ServiceTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-size: 0.75rem;
  color: ${theme.colors.textMuted};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.full};
  padding: 2px ${theme.spacing.sm};
`;
