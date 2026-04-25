"use client";

import { Map, Hash, Building2, Landmark, Percent } from "lucide-react";
import { usePathname } from "next/navigation";
import { theme } from "@/styles/theme";
import {
  HeaderWrapper,
  Inner,
  Logo,
  LogoText,
  Nav,
  NavLink,
} from "./Header.styles";

// ─── Component ───────────────────────────────────────────────────────────────

export function Header() {
  const pathname = usePathname();

  return (
    <HeaderWrapper>
      <Inner>
        <Logo>
          <Map size={22} color={theme.colors.secondary} />
          <LogoText>
            Brasil API <span>Hub</span>
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
          <NavLink href="/cnpj" $active={pathname === "/cnpj"}>
            <Building2 size={14} />
            CNPJ
          </NavLink>
          <NavLink href="/cvm" $active={pathname === "/cvm"}>
            <Landmark size={14} />
            CVM
          </NavLink>
          <NavLink href="/taxas" $active={pathname === "/taxas"}>
            <Percent size={14} />
            Taxas
          </NavLink>
        </Nav>
      </Inner>
    </HeaderWrapper>
  );
}
