// Formata data "YYYY-MM-DD" → "dd/mm/yyyy"
export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}

// Formata temperatura com símbolo de grau
export function formatTemp(temp: number): string {
  return `${temp}°C`;
}

// Formata velocidade do vento
export function formatWind(speed: number): string {
  return `${speed} km/h`;
}

// Formata altura de onda
export function formatWaveHeight(height: number): string {
  return `${height.toFixed(1)} m`;
}

// Capitaliza primeira letra
export function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
