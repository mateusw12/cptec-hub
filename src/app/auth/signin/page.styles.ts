import styled from "@emotion/styled";
import { theme } from "@/styles/theme";

export const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.background};
  padding: ${theme.spacing.lg};
`;

export const Card = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing["2xl"]};
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.card};
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

export const LogoText = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${theme.colors.text};
  letter-spacing: -0.02em;

  span {
    color: ${theme.colors.secondary};
  }
`;

export const Headline = styled.div`
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 1.15rem;
  font-weight: 600;
  color: ${theme.colors.text};
  margin: 0 0 6px;
`;

export const Subtitle = styled.p`
  font-size: 0.82rem;
  color: ${theme.colors.textMuted};
  margin: 0;
  line-height: 1.5;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${theme.colors.border};
`;

export const GoogleButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  padding: 12px ${theme.spacing.lg};
  background: #fff;
  color: #3c4043;
  border: 1px solid #dadce0;
  border-radius: ${theme.borderRadius.md};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s, box-shadow 0.15s;

  &:hover {
    background: #f8f9fa;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  }

  &:active {
    background: #f1f3f4;
  }
`;

export const Footer = styled.p`
  font-size: 0.72rem;
  color: ${theme.colors.textMuted};
  text-align: center;
  margin: 0;
  line-height: 1.6;
`;
