"use client";

import styled from "@emotion/styled";
import { theme } from "@/styles/theme";

export const Card = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;

  &:hover {
    background: ${theme.colors.surfaceHover};
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.glow};
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.md};
`;

export const CardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${theme.colors.text};
  margin: 0;
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;
