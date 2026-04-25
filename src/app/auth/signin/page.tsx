"use client";

import { Suspense } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import styled from "@emotion/styled";
import { CloudSun } from "lucide-react";
import { theme } from "@/styles/theme";

// ─── Styles ──────────────────────────────────────────────────────────────────

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.background};
  padding: ${theme.spacing.lg};
`;

const Card = styled.div`
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

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const LogoText = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${theme.colors.text};
  letter-spacing: -0.02em;

  span {
    color: ${theme.colors.secondary};
  }
`;

const Headline = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 1.15rem;
  font-weight: 600;
  color: ${theme.colors.text};
  margin: 0 0 6px;
`;

const Subtitle = styled.p`
  font-size: 0.82rem;
  color: ${theme.colors.textMuted};
  margin: 0;
  line-height: 1.5;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${theme.colors.border};
`;

const GoogleButton = styled.button`
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

const Footer = styled.p`
  font-size: 0.72rem;
  color: ${theme.colors.textMuted};
  text-align: center;
  margin: 0;
  line-height: 1.6;
`;

// ─── Google SVG logo ──────────────────────────────────────────────────────────

function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
      />
    </svg>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

function SignInContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl });
  };

  return (
    <Page>
      <Card>
        <Logo>
          <CloudSun size={26} color={theme.colors.secondary} />
          <LogoText>
            CPTEC <span>HUB</span>
          </LogoText>
        </Logo>

        <Headline>
          <Title>Bem-vindo ao CPTEC Hub</Title>
          <Subtitle>
            Dashboard de dados meteorológicos do Brasil. Acesse com sua conta
            Google para continuar.
          </Subtitle>
        </Headline>

        <Divider />

        <GoogleButton onClick={handleGoogleSignIn} type="button">
          <GoogleLogo />
          Entrar com Google
        </GoogleButton>

        <Footer>
          Ao entrar, você concorda com o uso dos dados climáticos do CPTEC via
          BrasilAPI para fins de visualização.
        </Footer>
      </Card>
    </Page>
  );
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignInContent />
    </Suspense>
  );
}
