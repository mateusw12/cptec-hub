import styled from "@emotion/styled";
import { Card } from "@/components/ui/Card";
import { theme } from "@/styles/theme";

export const StyledCard = styled(Card)<{ $selected: boolean }>`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  outline: none;

  ${({ $selected }) =>
    $selected &&
    `
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.glow};
    background: ${theme.colors.surfaceHover};
  `}
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SiglaWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

export const Sigla = styled.span`
  font-size: 1.6rem;
  font-weight: 800;
  color: ${theme.colors.text};
  line-height: 1;
`;

export const Nome = styled.p`
  font-size: 0.85rem;
  color: ${theme.colors.textMuted};
  margin: 0;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding-top: ${theme.spacing.sm};
  border-top: 1px solid ${theme.colors.border};
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  color: ${theme.colors.textMuted};
`;
