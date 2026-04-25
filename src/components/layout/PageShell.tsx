"use client";

import styled from "@emotion/styled";
import { theme } from "@/styles/theme";

export const PageMain = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${theme.spacing["2xl"]} ${theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing["2xl"]};

  @media (max-width: 640px) {
    padding: ${theme.spacing.lg} ${theme.spacing.md};
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.lg};
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${theme.colors.text};
  margin: 0;
`;

export const SectionSubtitle = styled.span`
  font-size: 0.8rem;
  color: ${theme.colors.textMuted};
`;
