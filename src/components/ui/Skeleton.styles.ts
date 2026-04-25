import styled from "@emotion/styled";
import { theme } from "@/styles/theme";

const skeletonAnimation = `
  @keyframes shimmer {
    0% { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
`;

const shimmerBg = `
  background: linear-gradient(
    90deg,
    ${theme.colors.surface} 25%,
    ${theme.colors.surfaceHover} 50%,
    ${theme.colors.surface} 75%
  );
  background-size: 800px 100%;
  animation: shimmer 1.4s infinite linear;
`;

export interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

export const Skeleton = styled.div<SkeletonProps>`
  ${skeletonAnimation}
  ${shimmerBg}
  width: ${({ width }) => width ?? "100%"};
  height: ${({ height }) => height ?? "16px"};
  border-radius: ${({ borderRadius }) => borderRadius ?? theme.borderRadius.sm};
`;

export const SkeletonText = styled(Skeleton)`
  height: 14px;
  border-radius: ${theme.borderRadius.sm};
`;

export const SkeletonCard = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;
