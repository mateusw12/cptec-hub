// Mapa de condições climáticas do CPTEC para descrição e ícone sugerido
export const WEATHER_CONDITIONS: Record<
  string,
  { desc: string; icon: string }
> = {
  ec: { desc: "Encoberto com Chuvas Isoladas", icon: "cloud-rain" },
  ci: { desc: "Chuvas Isoladas", icon: "cloud-drizzle" },
  c: { desc: "Chuva", icon: "cloud-rain" },
  in: { desc: "Instável", icon: "cloud-lightning" },
  pp: { desc: "Poss. de Pancadas de Chuva", icon: "cloud-rain" },
  cm: { desc: "Chuva pela Manhã", icon: "cloud-rain" },
  cn: { desc: "Chuva à Noite", icon: "cloud-moon-rain" },
  pt: { desc: "Pancadas de Chuva à Tarde", icon: "cloud-rain" },
  pm: { desc: "Pancadas de Chuva pela Manhã", icon: "cloud-rain" },
  np: { desc: "Nublado e Pancadas de Chuva", icon: "cloud-rain" },
  pc: { desc: "Pancadas de Chuva", icon: "cloud-rain" },
  pn: { desc: "Parcialmente Nublado", icon: "cloud-sun" },
  ps: { desc: "Predomínio de Sol", icon: "sun" },
  e: { desc: "Encoberto", icon: "cloud" },
  n: { desc: "Nublado", icon: "cloud" },
  cl: { desc: "Céu Claro", icon: "sun" },
  nv: { desc: "Nevoeiro", icon: "cloud-fog" },
  g: { desc: "Geada", icon: "snowflake" },
  ne: { desc: "Neve", icon: "snowflake" },
  nd: { desc: "Não Definido", icon: "help-circle" },
  pnt: { desc: "Pancadas de Chuva à Noite", icon: "cloud-rain" },
  psc: { desc: "Poss. de Chuva", icon: "cloud-drizzle" },
  pcm: { desc: "Poss. de Chuva pela Manhã", icon: "cloud-drizzle" },
  pct: { desc: "Poss. de Chuva à Tarde", icon: "cloud-drizzle" },
  pcn: { desc: "Poss. de Chuva à Noite", icon: "cloud-drizzle" },
  npt: { desc: "Nublado com Pancadas à Tarde", icon: "cloud-rain" },
  npn: { desc: "Nublado com Pancadas à Noite", icon: "cloud-rain" },
  ncn: {
    desc: "Nublado com Poss. de Chuva à Noite",
    icon: "cloud-drizzle",
  },
  nct: {
    desc: "Nublado com Poss. de Chuva à Tarde",
    icon: "cloud-drizzle",
  },
  ncm: {
    desc: "Nublado com Poss. de Chuva pela Manhã",
    icon: "cloud-drizzle",
  },
  npm: {
    desc: "Nublado com Pancadas pela Manhã",
    icon: "cloud-rain",
  },
  npp: {
    desc: "Nublado com Poss. de Pancadas",
    icon: "cloud-rain",
  },
  vn: { desc: "Variação de Nebulosidade", icon: "cloud-sun" },
  ct: { desc: "Chuva à Tarde", icon: "cloud-rain" },
  ppn: {
    desc: "Poss. de Pancadas de Chuva à Noite",
    icon: "cloud-rain",
  },
  ppt: {
    desc: "Poss. de Pancadas de Chuva à Tarde",
    icon: "cloud-rain",
  },
  ppm: {
    desc: "Poss. de Pancadas de Chuva pela Manhã",
    icon: "cloud-rain",
  },
};

export function getWeatherCondition(code: string) {
  return WEATHER_CONDITIONS[code] ?? { desc: code, icon: "help-circle" };
}

export function getUvIndexLevel(uv: number): {
  label: string;
  color: string;
} {
  if (uv <= 2) return { label: "Baixo", color: "#22C55E" };
  if (uv <= 5) return { label: "Moderado", color: "#F59E0B" };
  if (uv <= 7) return { label: "Alto", color: "#F97316" };
  if (uv <= 10) return { label: "Muito Alto", color: "#EF4444" };
  return { label: "Extremo", color: "#9333EA" };
}
