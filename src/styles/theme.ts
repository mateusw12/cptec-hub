export const theme = {
  colors: {
    primary: "#2563EB",
    secondary: "#38BDF8",
    accent: "#22C55E",
    warning: "#F59E0B",
    danger: "#EF4444",
    background: "#0F172A",
    surface: "#1E293B",
    surfaceHover: "#263347",
    border: "#2D3F55",
    text: "#E2E8F0",
    textMuted: "#94A3B8",
  },
  borderRadius: {
    sm: "6px",
    md: "10px",
    lg: "16px",
    full: "9999px",
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    "2xl": "48px",
  },
  typography: {
    fontFamily: "var(--font-geist-sans), sans-serif",
    fontFamilyMono: "var(--font-geist-mono), monospace",
  },
  shadows: {
    card: "0 4px 24px rgba(0, 0, 0, 0.4)",
    glow: "0 0 20px rgba(37, 99, 235, 0.3)",
  },
} as const;

export type Theme = typeof theme;
