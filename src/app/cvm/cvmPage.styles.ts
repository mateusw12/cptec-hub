import { theme } from "@/styles/theme";
import styled from "@emotion/styled";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${theme.spacing.md};

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${theme.spacing.md};
`;

export const Label = styled.span`
  font-size: 0.75rem;
  color: ${theme.colors.textMuted};
`;

export const Value = styled.p`
  margin: 2px 0 0;
  font-size: 0.88rem;
  color: ${theme.colors.text};
`;

export const Status = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.textMuted};
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
`;

export const Select = styled.select`
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.surface};
  color: ${theme.colors.text};
  padding: 6px 10px;
`;

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.surface};
  color: ${theme.colors.text};
  padding: 6px 10px;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;