/**
 * Utilitários de datas para o sistema de reservas (fuso local do visitante).
 * Todas as datas circulam em formato "AAAA-MM-DD" (ISO curto, sem hora).
 *
 * O servidor (Google Apps Script) é sempre quem decide na comunicação final;
 * aqui só fazemos validação de experiência do utilizador.
 */

const MS_DIA = 86400000;

/** Garante que a string é uma data real "AAAA-MM-DD". */
export function dataValidaISO(iso: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso || "")) return false;
  const [ano, mes, dia] = iso.split("-").map(Number);
  if (mes < 1 || mes > 12 || dia < 1 || dia > 31) return false;
  const d = new Date(Date.UTC(ano, mes - 1, dia));
  return d.getUTCFullYear() === ano && d.getUTCMonth() === mes - 1 && d.getUTCDate() === dia;
}

/** Data de hoje no fuso local do visitante, em "AAAA-MM-DD". */
export function hojeISO(): string {
  const d = new Date();
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const dia = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mes}-${dia}`;
}

/** Converte "AAAA-MM-DD" para milissegundos UTC (meia-noite UTC desse dia). */
export function isoParaMs(iso: string): number {
  const [ano, mes, dia] = iso.split("-").map(Number);
  return Date.UTC(ano, mes - 1, dia);
}

/** Converte milissegundos UTC (meia-noite) para "AAAA-MM-DD". */
export function msParaISO(ms: number): string {
  const d = new Date(ms);
  const mes = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dia = String(d.getUTCDate()).padStart(2, "0");
  return `${d.getUTCFullYear()}-${mes}-${dia}`;
}

/** dia = iso + n dias ("AAAA-MM-DD"). */
export function incrementarDia(iso: string, n: number): string {
  return msParaISO(isoParaMs(iso) + n * MS_DIA);
}

/** Número de noites entre check-in e check-out (0 se ordem inválida). */
export function contarNoites(checkIn: string, checkOut: string): number {
  if (!dataValidaISO(checkIn) || !dataValidaISO(checkOut)) return 0;
  const diff = Math.round((isoParaMs(checkOut) - isoParaMs(checkIn)) / MS_DIA);
  return diff > 0 ? diff : 0;
}

/**
 * Converte intervalos vindos do CRM em noites ocupadas.
 * Cada intervalo ocupa as noites de "de" até "ate" EXCLUINDO a noite de "ate":
 * o dia "ate" é de saída e fica livre para um novo check-in.
 */
export function noitesOcupadas(intervalos: { de: string; ate: string }[]): Set<string> {
  const ocupadas = new Set<string>();
  for (const it of intervalos || []) {
    if (!dataValidaISO(it?.de) || !dataValidaISO(it?.ate)) continue;
    for (let d = it.de; d < it.ate; d = incrementarDia(d, 1)) {
      // condição de paragem: d === it.ate significa que a noite de saída não conta
      if (d >= it.ate) break; // segurança
      ocupadas.add(d);
    }
  }
  return ocupadas;
}

/** Uma estadia [checkIn .. checkOut) está livre? (check-out nunca na mesma noite de outra saída... ver regra: dia "ate" livre) */
export function estadiaLivre(checkIn: string, checkOut: string, ocupadas: Set<string>): boolean {
  const noites = contarNoites(checkIn, checkOut);
  if (noites < 1) return false;
  for (let i = 0; i < noites; i++) {
    if (ocupadas.has(incrementarDia(checkIn, i))) return false;
  }
  return true;
}

/** Verifica as regras apresentadas ao cliente: ordenação e passado. */
export function validarDatasCliente(checkIn: string, checkOut: string): string[] {
  const erros: string[] = [];
  if (!dataValidaISO(checkIn) || !dataValidaISO(checkOut)) return erros; // falta de preenchimento tratada no formulário
  if (contarNoites(checkIn, checkOut) < 1) {
    erros.push("__datas_invalidas_ordem__");
  }
  if (checkIn < hojeISO()) {
    erros.push("__datas_invalidas_passado__");
  }
  return erros;
}

/** "2026-08-04" → "04/08/2026" (apresentação, em pt e en). */
export function formatarDataVisivel(iso: string): string {
  if (!dataValidaISO(iso)) return iso || "";
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}
