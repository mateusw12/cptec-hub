"use client";

import styled from "@emotion/styled";
import { Droplets, Thermometer, Wind } from "lucide-react";
import { theme } from "@/styles/theme";
import { Card } from "@/components/ui/Card";
import { WeatherIcon } from "./WeatherIcon";
import { getWeatherCondition } from "@/utils/weather";
import { formatTemp, formatWind } from "@/utils/format";
import type { CapitalWeatherDTO } from "@/lib/dtos/cptec.dto";

// ─── Styles ──────────────────────────────────────────────────────────────────

const StyledCard = styled(Card)`
  cursor: default;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${theme.spacing.sm};
`;

const CityName = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${theme.colors.text};
  margin: 0;
  line-height: 1.3;
`;

const UpdatedAt = styled.span`
  font-size: 0.7rem;
  color: ${theme.colors.textMuted};
  white-space: nowrap;
`;

const TempRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const Temperature = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: ${theme.colors.text};
  line-height: 1;
`;

const ConditionDesc = styled.span`
  font-size: 0.78rem;
  color: ${theme.colors.textMuted};
  line-height: 1.4;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.78rem;
  color: ${theme.colors.textMuted};
`;

// ─── Component ───────────────────────────────────────────────────────────────

// Mapa ICAO → nome legível das capitais brasileiras
const ICAO_NAMES: Record<string, string> = {
  SBAR: "Aracaju",
  SBBH: "Belo Horizonte",
  SBBR: "Brasília",
  SBBE: "Belém",
  SBCF: "Confins",
  SBCT: "Curitiba",
  SBCY: "Cuiabá",
  SBFL: "Florianópolis",
  SBFZ: "Fortaleza",
  SBGO: "Goiânia",
  SBIZ: "Imperatriz",
  SBJU: "Juazeiro do Norte",
  SBMQ: "Macapá",
  SBMO: "Maceió",
  SBMS: "Mossoró",
  SBNM: "Santo Ângelo",
  SBNT: "Natal",
  SBPA: "Porto Alegre",
  SBPB: "Parnaíba",
  SBPJ: "Palmas",
  SBPV: "Porto Velho",
  SBRB: "Rio Branco",
  SBRF: "Recife",
  SBRJ: "Rio de Janeiro",
  SBSL: "São Luís",
  SBSN: "Santarém",
  SBSP: "São Paulo",
  SBSR: "São José do Rio Preto",
  SBTE: "Teresina",
  SBVH: "Vilhena",
  SBVT: "Vitória",
  SBGR: "Guarulhos",
  SBCG: "Campo Grande",
  SBJP: "João Pessoa",
  SBMN: "Manaus",
  SBPK: "Pelotas",
  SBEG: "Eduardo Gomes",
  SBBV: "Boa Vista",
  SBST: "Santos",
  SBLO: "Londrina",
  SBPO: "Ponta Porã",
  SBNF: "Navegantes",
  SBKG: "Campina Grande",
  SBMC: "Macaé",
  SBMK: "Montes Claros",
  SBOW: "Ourinhos",
};

function formatUpdatedAt(isoDate: string): string {
  try {
    return new Date(isoDate).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

interface CapitalCardProps {
  data: CapitalWeatherDTO;
}

export function CapitalCard({ data }: CapitalCardProps) {
  const condition = getWeatherCondition(data.condicao);
  const cityName = ICAO_NAMES[data.codigo_icao] ?? data.codigo_icao;

  return (
    <StyledCard>
      <Header>
        <CityName>{cityName}</CityName>
        <UpdatedAt>{formatUpdatedAt(data.atualizado_em)}</UpdatedAt>
      </Header>

      <TempRow>
        <WeatherIcon
          iconKey={condition.icon}
          size={28}
          color={theme.colors.secondary}
        />
        <div>
          <Temperature>{formatTemp(data.temp)}</Temperature>
          <ConditionDesc style={{ display: "block", marginTop: 2 }}>
            {data.condicao_Desc}
          </ConditionDesc>
        </div>
      </TempRow>

      <MetaRow>
        <MetaItem>
          <Droplets size={12} color={theme.colors.secondary} />
          {data.umidade}%
        </MetaItem>
        <MetaItem>
          <Wind size={12} color={theme.colors.textMuted} />
          {formatWind(data.vento)}
        </MetaItem>
        <MetaItem>
          <Thermometer size={12} color={theme.colors.textMuted} />
          {data.pressao_atmosferica} hPa
        </MetaItem>
      </MetaRow>
    </StyledCard>
  );
}
