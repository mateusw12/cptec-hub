"use client";

import styled from "@emotion/styled";
import { CloudSun } from "lucide-react";
import { theme } from "@/styles/theme";
import { CitySearch } from "@/components/weather/CitySearch";

// ─── Styles ──────────────────────────────────────────────────────────────────

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 40;
  background: ${theme.colors.background}e6;
  backdrop-filter: blur(12px);
  border-bottom: 1px solid ${theme.colors.border};
`;

const Inner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xl};
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  flex-shrink: 0;
`;

const LogoText = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${theme.colors.text};
  letter-spacing: -0.01em;

  span {
    color: ${theme.colors.secondary};
  }
`;

const SearchWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

// ─── Component ───────────────────────────────────────────────────────────────

export function Header() {
  return (
    <HeaderWrapper>
      <Inner>
        <Logo>
          <CloudSun size={22} color={theme.colors.secondary} />
          <LogoText>
            CPTEC <span>HUB</span>
          </LogoText>
        </Logo>
        <SearchWrapper>
          <CitySearch />
        </SearchWrapper>
      </Inner>
    </HeaderWrapper>
  );
}
