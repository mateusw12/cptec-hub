import styled from "@emotion/styled";
import { theme } from "@/styles/theme";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: ${theme.spacing.md};
`;

export const TaxaNome = styled.p`
  margin: 0 0 ${theme.spacing.xs};
  color: ${theme.colors.textMuted};
  font-size: 0.78rem;
`;

export const TaxaValor = styled.strong`
  color: ${theme.colors.text};
  font-size: 1.15rem;
`;

export const Status = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.textMuted};
  font-size: 0.875rem;
`;
