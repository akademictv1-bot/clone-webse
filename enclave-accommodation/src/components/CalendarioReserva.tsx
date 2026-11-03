import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Loader2, AlertTriangle } from "lucide-react";
import { dataValidaISO, formatarDataVisivel, hojeISO } from "../crm/datas";

interface CalendarioReservaProps {
  idioma: "pt" | "en";
  checkIn: string;
  checkOut: string;
  /** Noites ocupadas vindas do CRM (set de "AAAA-MM-DD"). O dia "ate" de uma saída fica livre. */
  ocupadas: Set<string>;
  aCarregar: boolean;
  disponibilidadeFalhou: boolean;
  onSelecionarData: (iso: string) => void;
  onFechar: () => void;
}

const NOMES_MESES = {
  pt: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
};

const DIAS_SEMANA = {
  pt: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
  en: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
};

/** Cabeçalho do mês em versão curta, ex.: "Ago 2026". */
function rotuloMes(ano: number, mes: number, idioma: "pt" | "en"): string {
  const abrev = NOMES_MESES[idioma][mes].slice(0, 3);
  return idioma === "pt"
    ? `${abrev.charAt(0).toUpperCase() + abrev.slice(1)} ${ano}`
    : `${abrev} ${ano}`;
}

export const CalendarioReserva: React.FC<CalendarioReservaProps> = ({
  idioma,
  checkIn,
  checkOut,
  ocupadas,
  aCarregar,
  disponibilidadeFalhou,
  onSelecionarData,
  onFechar
}) => {
  const hoje = hojeISO();
  const mesInicial = useMemo(() => {
    if (dataValidaISO(checkIn)) {
      const [ano, mes] = checkIn.split("-").map(Number);
      return { ano, mes: mes - 1 };
    }
    const agora = new Date();
    return { ano: agora.getFullYear(), mes: agora.getMonth() };
  }, [checkIn]);
  const [mesVisivel, setMesVisivel] = useState(mesInicial);

  // Se o check-in mudar para outro mês, mostra esse mês ao reabrir
  useEffect(() => { setMesVisivel(mesInicial); }, [mesInicial]);

  // Limite de navegação: do mês actual até 12 meses à frente
  const agora = new Date();
  const limiteInferior = { ano: agora.getFullYear(), mes: agora.getMonth() };
  const limiteSuperiorDt = new Date(agora.getFullYear(), agora.getMonth() + 12, 1);

  const podeAnterior =
    anosMes(mesVisivel) > anosMes(limiteInferior);
  const podeSeguinte =
    anosMes(mesVisivel) < anosMes({ ano: limiteSuperiorDt.getFullYear(), mes: limiteSuperiorDt.getMonth() });

  const dias = useMemo(() => {
    const primeiro = new Date(mesVisivel.ano, mesVisivel.mes, 1);
    const desfase = (primeiro.getDay() + 6) % 7; // semana começa à segunda-feira
    const total = new Date(mesVisivel.ano, mesVisivel.mes + 1, 0).getDate();
    const noMes = Array.from({ length: total }, (_, i) => {
      const mes = String(mesVisivel.mes + 1).padStart(2, "0");
      const dia = String(i + 1).padStart(2, "0");
      const iso = `${mesVisivel.ano}-${mes}-${dia}`;
      return {
        iso,
        dia: i + 1,
        passada: iso < hoje,
        ocupada: ocupadas.has(iso),
        eCheckIn: iso === checkIn,
        eCheckOut: !!checkOut && iso === checkOut,
        dentroDoIntervalo: !!checkIn && !!checkOut && iso > checkIn && iso < checkOut
      };
    });
    return { desfase, noMes };
  }, [mesVisivel, checkIn, checkOut, ocupadas, hoje]);

  const t = (pt: string, en: string) => (idioma === "pt" ? pt : en);

  return (
    <div
      className="mt-[-4px] absolute left-0 right-0 top-full z-30 bg-white rounded-xl shadow-2xl border border-[#c0c9c2]/60 p-3 sm:p-4 text-[#023625]"
      role="dialog"
      aria-label={t("Calendário de disponibilidade", "Availability calendar")}
    >
      {/* Cabeçalho do mês */}
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          onClick={() => podeAnterior && setMesVisivel(({ ano, mes }) => (mes === 0 ? { ano: ano - 1, mes: 11 } : { ano, mes: mes - 1 }))}
          disabled={!podeAnterior}
          aria-label={t("Mês anterior", "Previous month")}
          className={`p-1.5 rounded-lg transition-colors ${podeAnterior ? "hover:bg-[#f3f3f3] cursor-pointer text-[#023625]" : "opacity-30 cursor-default"}`}
        >
          <ChevronLeft size={18} />
        </button>
        <span className="font-display font-bold text-sm tracking-wide">
          {rotuloMes(mesVisivel.ano, mesVisivel.mes, idioma)}
        </span>
        <button
          type="button"
          onClick={() => podeSeguinte && setMesVisivel(({ ano, mes }) => (mes === 11 ? { ano: ano + 1, mes: 0 } : { ano, mes: mes + 1 }))}
          disabled={!podeSeguinte}
          aria-label={t("Mês seguinte", "Next month")}
          className={`p-1.5 rounded-lg transition-colors ${podeSeguinte ? "hover:bg-[#f3f3f3] cursor-pointer text-[#023625]" : "opacity-30 cursor-default"}`}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Estado de carga / falha da disponibilidade */}
      {aCarregar ? (
        <div className="flex items-center justify-center gap-2 text-[11px] text-[#414944] py-1.5">
          <Loader2 size={13} className="animate-spin" />
          <span>{t("A buscar disponibilidade...", "Fetching availability...")}</span>
        </div>
      ) : disponibilidadeFalhou ? (
        <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#7b580b] py-1">
          <AlertTriangle size={12} />
          <span>{t("Sem confirmação de disponibilidade — o servidor valida no fim.", "Availability unverified — the server validates at the end.")}</span>
        </div>
      ) : null}

      {/* Rótulos dos dias da semana */}
      <div className="grid grid-cols-7 gap-y-1 text-center mb-1">
        {DIAS_SEMANA[idioma].map((d) => (
          <span key={d} className="text-[9px] font-bold uppercase tracking-wider text-[#414944]/70 py-1">
            {d}
          </span>
        ))}
      </div>

      {/* Grelha de dias */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {Array.from({ length: dias.desfase }).map((_, i) => (
          <span key={`vazio-${i}`} />
        ))}
        {dias.noMes.map((d) => {
          const classes = [
            "aspect-square text-[11px] font-semibold rounded-lg transition-colors select-none",
            d.passada
              ? "text-[#9aa7a0]/45 cursor-default bg-transparent"
              : d.eCheckIn
                ? "bg-[#023625] text-white shadow-sm cursor-pointer"
                : d.eCheckOut
                  ? "bg-[#7b580b] text-white shadow-sm cursor-pointer"
                  : d.dentroDoIntervalo
                    ? "bg-[#bceed3]/70 text-[#002114] cursor-pointer"
                    : d.ocupada
                      ? "text-[#b91c1c]/70 line-through decoration-1 bg-red-50/70 hover:bg-red-100 cursor-pointer"
                      : "hover:bg-[#f3f3f3] cursor-pointer"
          ].join(" ");
          return (
            <button
              key={d.iso}
              type="button"
              disabled={d.passada}
              aria-label={formatarDataVisivel(d.iso)}
              aria-pressed={d.eCheckIn || d.eCheckOut}
              data-dia={d.iso}
              onClick={() => onSelecionarData(d.iso)}
              className={classes}
            >
              {d.dia}
            </button>
          );
        })}
      </div>

      {/* Legenda */}
      <div className="mt-2.5 pt-2 border-t border-gray-100 flex flex-wrap items-center gap-x-4 gap-y-1 text-[9px] text-[#414944]/80">
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded bg-[#023625] inline-block" />
          {t("Entrada", "Check-in")}
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded bg-[#7b580b] inline-block" />
          {t("Saída", "Check-out")}
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded bg-red-50 border border-red-200 inline-block" />
          {t("Noite já reservada", "Night already booked")}
        </span>
        <button
          type="button"
          onClick={onFechar}
          className="ml-auto font-bold text-[#7b580b] hover:text-[#023625] cursor-pointer uppercase tracking-wider"
        >
          {t("Fechar", "Close")}
        </button>
      </div>
    </div>
  );
};

function anosMes(x: { ano: number; mes: number }): number {
  return x.ano * 12 + x.mes;
}
