"use client";

import styled from "@emotion/styled";
import { theme } from "@/styles/theme";

interface BadgeProps {
  variant?: "default" | "accent" | "warning" | "danger" | "secondary";
}

const variantStyles: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: `background: ${theme.colors.primary}22; color: ${theme.colors.primary};`,
  accent: `background: ${theme.colors.accent}22; color: ${theme.colors.accent};`,
  warning: `background: ${theme.colors.warning}22; color: ${theme.colors.warning};`,
  danger: `background: ${theme.colors.danger}22; color: ${theme.colors.danger};`,
  secondary: `background: ${theme.colors.secondary}22; color: ${theme.colors.secondary};`,
};

export const Badge = styled.span<BadgeProps>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: ${theme.borderRadius.full};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  ${({ variant = "default" }) => variantStyles[variant]}
`;
