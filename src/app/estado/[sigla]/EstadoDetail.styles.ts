import styled from "@emotion/styled";
import Link from "next/link";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { theme } from "@/styles/theme";

export const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: ${theme.spacing["2xl"]} ${theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing["2xl"]};

  @media (max-width: 640px) {
    padding: ${theme.spacing.lg} ${theme.spacing.md};
  }
`;

export const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.textMuted};
  font-size: 0.875rem;
  text-decoration: none;
  width: fit-content;

  &:hover {
    color: ${theme.colors.text};
  }
`;

export const HeroCard = styled(Card)`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${theme.spacing.xl};
  align-items: center;

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`;

export const SiglaBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 96px;
  height: 96px;
  border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.surfaceHover};
  border: 1px solid ${theme.colors.primary}44;
  flex-shrink: 0;
`;

export const Sigla = styled.span`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${theme.colors.primary};
  letter-spacing: -1px;
`;

export const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

export const Nome = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${theme.colors.text};
  margin: 0;
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
`;

export const MetaItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-size: 0.875rem;
  color: ${theme.colors.textMuted};
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
`;

export const SectionTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${theme.colors.text};
  margin: 0;
`;

export const SectionSubtitle = styled.span`
  font-size: 0.8rem;
  color: ${theme.colors.textMuted};
`;

export const SearchInput = styled.input`
  width: 100%;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text};
  font-size: 0.875rem;
  padding: ${theme.spacing.sm} ${theme.spacing.md} ${theme.spacing.sm} 2.25rem;
  outline: none;
  margin-bottom: ${theme.spacing.md};

  &:focus {
    border-color: ${theme.colors.primary};
  }
  &::placeholder {
    color: ${theme.colors.textMuted};
  }
`;

export const SearchWrapper = styled.div`
  position: relative;
`;

export const SearchIcon = styled(Search)`
  position: absolute;
  left: 0.625rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;

export const MunicipioList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

export const MunicipioItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
`;

export const MunicipioHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.sm};
`;

export const MunicipioName = styled.span`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-size: 0.875rem;
  font-weight: 600;
  color: ${theme.colors.text};
`;

export const MunicipioCode = styled.span`
  font-size: 0.7rem;
  color: ${theme.colors.textMuted};
  background: ${theme.colors.surfaceHover};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.sm};
  padding: 1px 6px;
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
`;

export const MunicipioMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
`;

export const MunicipioMetaItem = styled.span`
  font-size: 0.75rem;
  color: ${theme.colors.textMuted};
`;

export const EmptyMsg = styled.p`
  color: ${theme.colors.textMuted};
  font-size: 0.875rem;
  text-align: center;
  padding: ${theme.spacing.xl} 0;
`;

export const ErrorBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing["2xl"]};
  color: ${theme.colors.textMuted};
  font-size: 0.875rem;
`;

export const RetryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  background: transparent;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.textMuted};
  font-size: 0.8rem;
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  cursor: pointer;

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.text};
  }
`;
