"use client";

import styled from "@emotion/styled";
import { Map, Hash } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { theme } from "@/styles/theme";

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

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  margin-left: auto;
`;

const NavLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== "$active",
})<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${({ $active }) => ($active ? theme.colors.primary + "88" : "transparent")};
  color: ${({ $active }) => ($active ? theme.colors.text : theme.colors.textMuted)};
  background: ${({ $active }) => ($active ? theme.colors.primary + "18" : "transparent")};
  transition: color 0.15s, background 0.15s, border-color 0.15s;

  &:hover {
    color: ${theme.colors.text};
    background: ${theme.colors.surfaceHover};
  }
`;

// ─── Component ───────────────────────────────────────────────────────────────

export function Header() {
  const pathname = usePathname();

  return (
    <HeaderWrapper>
      <Inner>
        <Logo>
          <Map size={22} color={theme.colors.secondary} />
          <LogoText>
            IBGE <span>Hub</span>
          </LogoText>
        </Logo>
        <Nav>
          <NavLink href="/" $active={pathname === "/"}>
            <Map size={14} />
            Estados
          </NavLink>
          <NavLink href="/cep" $active={pathname === "/cep"}>
            <Hash size={14} />
            CEP
          </NavLink>
        </Nav>
      </Inner>
    </HeaderWrapper>
  );
}
