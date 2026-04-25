import styled from "@emotion/styled";
import { Search } from "lucide-react";
import { theme } from "@/styles/theme";

export const SearchWrapper = styled.div`
  position: relative;
  max-width: 420px;
`;

export const SearchIcon = styled(Search)`
  position: absolute;
  left: 0.875rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;

export const Input = styled.input`
  width: 100%;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text};
  font-size: 1rem;
  letter-spacing: 0.05em;
  padding: ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} 2.75rem;
  outline: none;
  transition: border-color 0.15s;

  &:focus {
    border-color: ${theme.colors.primary};
  }
  &::placeholder {
    color: ${theme.colors.textMuted};
    letter-spacing: 0;
  }
`;

export const Hint = styled.p`
  font-size: 0.8rem;
  color: ${theme.colors.textMuted};
  margin-top: ${theme.spacing.xs};
`;

export const StatusBox = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.textMuted};
  font-size: 0.875rem;
  padding: ${theme.spacing.xl} 0;
`;

export const ErrorBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.sm};
  background: ${theme.colors.danger}18;
  border: 1px solid ${theme.colors.danger}44;
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  font-size: 0.875rem;
  color: ${theme.colors.danger};
  max-width: 520px;
`;

export const Spacer = styled.div`
  height: ${theme.spacing.lg};
`;
