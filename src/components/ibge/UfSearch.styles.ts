import styled from "@emotion/styled";
import { theme } from "@/styles/theme";

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 480px;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  padding: 10px ${theme.spacing.md};
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus-within {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}33;
  }
`;

export const Input = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: ${theme.colors.text};
  font-size: 0.95rem;
  font-family: ${theme.typography.fontFamily};

  &::placeholder {
    color: ${theme.colors.textMuted};
  }
`;

export const ClearButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${theme.colors.textMuted};
  display: flex;
  align-items: center;
  padding: 0;
  transition: color 0.15s;

  &:hover {
    color: ${theme.colors.text};
  }
`;
