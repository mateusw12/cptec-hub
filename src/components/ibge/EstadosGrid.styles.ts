import styled from "@emotion/styled";
import { theme } from "@/styles/theme";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
`;

export const ResultCount = styled.span`
  font-size: 0.8rem;
  color: ${theme.colors.textMuted};
  white-space: nowrap;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${theme.spacing.md};
`;

export const ErrorBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing["2xl"]};
  background: ${theme.colors.danger}0d;
  border: 1px solid ${theme.colors.danger}33;
  border-radius: ${theme.borderRadius.lg};
  text-align: center;
`;

export const ErrorTitle = styled.p`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${theme.colors.danger};
  margin: 0;
`;

export const ErrorHint = styled.p`
  font-size: 0.8rem;
  color: ${theme.colors.textMuted};
  margin: 0;
`;

export const RetryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: 8px 18px;
  background: transparent;
  border: 1px solid ${theme.colors.danger}66;
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.danger};
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: ${theme.colors.danger}1a;
  }
`;

export const EmptyState = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing["2xl"]};
  color: ${theme.colors.textMuted};
  font-size: 0.875rem;
`;

export const SkeletonTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SkeletonBottomRow = styled.div`
  display: flex;
  gap: 12px;
  padding-top: 8px;
  border-top: 1px solid ${theme.colors.border};
`;
