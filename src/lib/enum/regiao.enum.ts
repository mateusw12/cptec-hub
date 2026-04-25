import { BadgeVariant } from "./badge-variant.enum";

export enum RegiaoNome {
  NORTE = "Norte",
  NORDESTE = "Nordeste",
  CENTRO_OESTE = "Centro-Oeste",
  SUDESTE = "Sudeste",
  SUL = "Sul",
}

export const REGIAO_VARIANT: Record<RegiaoNome, BadgeVariant> = {
  [RegiaoNome.NORTE]: BadgeVariant.SECONDARY,
  [RegiaoNome.NORDESTE]: BadgeVariant.WARNING,
  [RegiaoNome.CENTRO_OESTE]: BadgeVariant.ACCENT,
  [RegiaoNome.SUDESTE]: BadgeVariant.DEFAULT,
  [RegiaoNome.SUL]: BadgeVariant.DANGER,
};
