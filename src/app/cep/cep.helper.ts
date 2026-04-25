export function maskCep(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length > 5) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  return digits;
}

export function getErrorMessage(err: unknown): string {
  if (!err) return "Erro desconhecido.";
  const e = err as { status?: number; message?: string };
  if (e.status === 404) return "CEP não encontrado. Verifique se está correto.";
  if (e.message) return e.message;
  return "Erro ao buscar o CEP. Tente novamente.";
}
