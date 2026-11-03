import React, { useEffect, useRef, useState } from "react";
import { MessageSquare, CalendarCheck, ChevronDown, Loader2 } from "lucide-react";
import { CalendarioReserva } from "./CalendarioReserva";
import {
  descreverErro,
  enviarReserva,
  obterDisponibilidade,
  ErroCrm
} from "../crm/crmClient";
import {
  contarNoites,
  estadiaLivre,
  formatarDataVisivel,
  hojeISO,
  noitesOcupadas as malhaDeNoites,
  validarDatasCliente
} from "../crm/datas";
import { RoomOption } from "../types";

interface FormularioReservaProps {
  accommodationName: string;
  accommodationLocation?: string;
  pricePerNight?: number;
  /** ID estável de propriedade usado pelo CRM: chimoio | nyanga | greenside-mutare */
  propriedadeId?: string;
  cidade?: string;
  pais?: string;
  /** Opções de quarto vindas da acomodação (opcional). */
  roomOptions?: RoomOption[];
  /** Moeda da tarifa, ex.: "USD". */
  moeda?: string;
  destinationWhatsapp: string;
  language?: "pt" | "en";
  onClear?: () => void;
}

export const FormularioReserva: React.FC<FormularioReservaProps> = ({ 
  accommodationName, 
  accommodationLocation,
  pricePerNight,
  propriedadeId,
  cidade,
  pais,
  roomOptions,
  moeda,
  destinationWhatsapp,
  language: languagePedido = "pt",
  onClear
}) => {  // Estados do formulário
  const language: "pt" | "en" = languagePedido === "pt" ? "pt" : "en";
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [hospedes, setHospedes] = useState("1");
  const [opcao, setOpcao] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erros, setErros] = useState<string[]>([]);
  const [sucesso, setSucesso] = useState<{ id: string } | null>(null);
  const [enviando, setEnviando] = useState(false);

  // Estados do calendário e da disponibilidade
  const [calendarioAberto, setCalendarioAberto] = useState(false);
  const [noitesOcupadas, setNoitesOcupadas] = useState<Set<string>>(new Set());
  const [aCarregar, setACarregar] = useState(false);
  const [disponibilidadeFalhou, setDisponibilidadeFalhou] = useState(false);
  const areaDatasRef = useRef<HTMLDivElement>(null);

  const text = (pt: string, en: string) => language === "pt" ? pt : en;
  const guestLabel = (value: string) => {
    const labels: Record<string, [string, string]> = {
      "1": ["1 Hóspede", "1 Guest"],
      "2": ["2 Hóspedes", "2 Guests"],
      "3": ["3 Hóspedes", "3 Guests"],
      "4": ["4 Hóspedes", "4 Guests"],
      "5-6": ["5-6 Hóspedes", "5-6 Guests"],
      "7-8": ["7-8 Hóspedes", "7-8 Guests"]
    };
    const [pt, en] = labels[value] || labels["1"];
    return text(pt, en);
  };

  const noites = contarNoites(checkIn, checkOut);

  // Preço por noite: o da opção de quarto escolhida ou o preço anunciado
  const moedaActual = (moeda || "USD").toUpperCase();
  const opçãoEscolhida = (roomOptions || []).find((o) => o.name === opcao);
  const precoNoite = opçãoEscolhida && opçãoEscolhida.price !== undefined
    ? opçãoEscolhida.price
    : (pricePerNight || 0);
  const total = noites > 0 ? noites * precoNoite : 0;

  // Fechar o calendário com tecla Esc ou clique fora
  useEffect(() => {
    if (!calendarioAberto) return;
    const porFora = (e: MouseEvent | TouchEvent) => {
      if (areaDatasRef.current && !areaDatasRef.current.contains(e.target as Node)) {
        setCalendarioAberto(false);
      }
    };
    const noEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCalendarioAberto(false);
    };
    document.addEventListener("mousedown", porFora);
    document.addEventListener("touchstart", porFora);
    document.addEventListener("keydown", noEscape);
    return () => {
      document.removeEventListener("mousedown", porFora);
      document.removeEventListener("touchstart", porFora);
      document.removeEventListener("keydown", noEscape);
    };
  }, [calendarioAberto]);

  /** Recarrega a disponibilidade no CRM sempre que o calendário abre. */
  const abrirCalendario = () => {
    if (calendarioAberto) {
      setCalendarioAberto(false);
      return;
    }
    setCalendarioAberto(true);
    if (!propriedadeId) {
      setNoitesOcupadas(new Set());
      setDisponibilidadeFalhou(false);
      return;
    }
    setACarregar(true);
    setDisponibilidadeFalhou(false);
    obterDisponibilidade(propriedadeId)
      .then((intervalos) => {
        setNoitesOcupadas(malhaDeNoites(intervalos));
        setDisponibilidadeFalhou(false);
      })
      .catch(() => {
        // Falha de rede: deixa reservar na mesma — o servidor volta a validar o pedido.
        setNoitesOcupadas(new Set());
        setDisponibilidadeFalhou(true);
      })
      .finally(() => setACarregar(false));
  };

  /** Escolha de datas: sem noites ocupadas no intervalo; check-in não no passado. */
  const selecionarData = (iso: string) => {
    const hoje = hojeISO();
    setErros([]);
    if (!checkIn || (checkIn && checkOut)) {
      // começa (ou recomeça) uma selecção de entrada
      if (iso < hoje) return;
      if (noitesOcupadas.has(iso)) {
        setErros([
          text(
            "Essa noite já está reservada. Escolha outra data de entrada.",
            "That night is already booked. Pick another check-in date."
          )
        ]);
        return;
      }
      setCheckIn(iso);
      setCheckOut("");
      return;
    }
    if (iso <= checkIn) {
      // nova data de entrada escolhida
      if (iso < hoje || noitesOcupadas.has(iso)) {
        setErros([
          text(
            "Essa noite já está reservada. Escolha outra data de entrada.",
            "That night is already booked. Pick another check-in date."
          )
        ]);
        return;
      }
      setCheckIn(iso);
      setCheckOut("");
      return;
    }
    if (!estadiaLivre(checkIn, iso, noitesOcupadas)) {
      setErros([
        text(
          "O intervalo escolhido inclui noites já reservadas. Ajuste as datas no calendário.",
          "The selected range includes nights already booked. Adjust the dates on the calendar."
        )
      ]);
      return;
    }
    setCheckOut(iso);
    setCalendarioAberto(false);
  };

  const mensagemWhatsApp = () => {
    const detalhesReserva = [
      `${text("Acomodação", "Accommodation")}: ${accommodationName}`,
      accommodationLocation ? `${text("Destino", "Destination")}: ${accommodationLocation}` : "",
      precoNoite ? `${text("Tarifa", "Rate")}: ${moedaActual} ${precoNoite} ${text("por noite", "per night")}` : "",
      `${text("Nome", "Name")}: ${nome.trim()}`,
      `${text("Telefone", "Phone")}: ${telefone.trim()}`,
      `Check-in: ${formatarDataVisivel(checkIn)}`,
      `Check-out: ${formatarDataVisivel(checkOut)}`,
      `${text("Noites", "Nights")}: ${noites}`,
      `${text("Hóspedes", "Guests")}: ${guestLabel(hospedes)}`,
      opcao ? `${text("Opção de quarto", "Room option")}: ${opcao}` : "",
      total ? `${text("Total estimado", "Estimated total")}: ${moedaActual} ${total}` : "",
      `${text("Mensagem", "Message")}: ${mensagem.trim() || text("Sem observações adicionais.", "No additional notes.")}`
    ].filter((linha) => linha !== null && linha !== undefined).join("\n");

    return `${text("Olá!", "Hello!")}\n\n${text("Gostaria de reservar:", "I would like to book:")}\n${detalhesReserva}\n\n${text("Aguardo confirmação.", "I await confirmation.")}\n${text("Obrigado!", "Thank you!")}`;
  };

  const abrirWhatsApp = () => {
    const numeroLimpo = destinationWhatsapp.replace(/\D/g, "");
    if (!numeroLimpo) {
      setErros([text("O número de WhatsApp de destino não está configurado corretamente.", "The destination WhatsApp number is not configured correctly.")]);
      return;
    }
    const urlWhatsapp = `https://wa.me/${numeroLimpo}?text=${encodeURIComponent(mensagemWhatsApp())}`;
    window.open(urlWhatsapp, "_blank", "noopener,noreferrer");
  };

  const handleEnviarReserva = async (e: React.FormEvent) => {
    e.preventDefault();
    if (enviando) return;
    setEnviando(true);
    setErros([]);

    // 1. Validação no site (o servidor é sempre quem decide)
    const errosValidacao: string[] = [];
    if (!nome.trim()) {
      errosValidacao.push(text("Por favor, preencha o seu nome completo.", "Please enter your full name."));
    }
    if (!telefone.trim()) {
      errosValidacao.push(text("Por favor, preencha o seu número de WhatsApp/Telefone.", "Please enter your WhatsApp/phone number."));
    }
    if (!checkIn) {
      errosValidacao.push(text("Por favor, escolha a data de check-in.", "Please choose a check-in date."));
    }
    if (!checkOut) {
      errosValidacao.push(text("Por favor, escolha a data de check-out.", "Please choose a check-out date."));
    }
    if (checkIn && checkOut) {
      if (validarDatasCliente(checkIn, checkOut).length > 0) {
        errosValidacao.push(
          text(
            "Datas inválidas: o check-out deve ser depois do check-in e o check-in não pode ser no passado.",
            "Invalid dates: check-out must be after check-in and check-in cannot be in the past."
          )
        );
      } else if (noitesOcupadas.size > 0 && !estadiaLivre(checkIn, checkOut, noitesOcupadas)) {
        errosValidacao.push(
          text(
            "O intervalo escolhido inclui noites já reservadas. Escolha outras datas no calendário.",
            "The selected range includes nights already booked. Pick different dates on the calendar."
          )
        );
      }
    }
    if (errosValidacao.length > 0) {
      setErros(errosValidacao);
      setEnviando(false);
      return;
    }

    // 2. Envio ao CRM (Type = reserva)
    const resposta = await enviarReserva({
      propriedade: propriedadeId || "",
      acomodacao: accommodationName,
      nome: nome.trim(),
      telefone: telefone.trim(),
      email: email.trim(),
      cidade: cidade || "",
      pais: pais || "",
      opcao: opcao,
      tarifa: precoNoite ? `${moedaActual} ${precoNoite}` : "",
      hospedes: hospedes,
      total: total ? `${moedaActual} ${total}` : "",
      observacoes: mensagem.trim(),
      checkin: checkIn,
      checkout: checkOut,
      noites: String(noites),
      idioma: language
    });

    if (resposta.ok) {
      setSucesso({ id: resposta.id || "" });
      setNome("");
      setTelefone("");
      setEmail("");
      setCheckIn("");
      setCheckOut("");
      setHospedes("1");
      setOpcao("");
      setMensagem("");
      if (onClear) onClear();
    } else {
      setErros([descreverErro(resposta.erro as ErroCrm, language)]);
    }
    setEnviando(false);
  };

  const labelClasse = "block text-[10px] font-bold text-[#023625] uppercase tracking-wider mb-1";
  const inputClasse = "w-full border border-[#c0c9c2] rounded-lg px-3 py-2 text-sm bg-[#f9f9f9] focus:outline-none focus:ring-1 focus:ring-[#023625]";

  return (
    <form onSubmit={handleEnviarReserva} className="space-y-4">
      {/* Alertas de validação e erros do CRM */}
      {erros.length > 0 && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg text-xs font-medium space-y-1">
          {erros.map((err, i) => (
            <p key={i}>• {err}</p>
          ))}
        </div>
      )}

      {sucesso && (
        <div className="bg-[#bceed3] text-[#002114] p-4 rounded-lg text-xs font-semibold text-center border border-[#a1d1b8] space-y-2">
          <p>{text("✔ Pedido recebido! A confirmação da sua reserva depende da aprovação do proprietário e será comunicada por telefone ou e-mail.", "✔ Request received! Your booking confirmation depends on the owner's approval and will be communicated by phone or e-mail.")}</p>
          {sucesso.id && (
            <p className="text-[11px] font-mono opacity-90">
              {text("Referência", "Reference")}: {sucesso.id}
            </p>
          )}
          <button
            type="button"
            onClick={() => setSucesso(null)}
            className="text-[11px] font-bold underline underline-offset-2 cursor-pointer"
          >
            {text("Fazer nova reserva", "Make another booking")}
          </button>
        </div>
      )}

      {/* Nome Completo */}
      <div>
        <label className={labelClasse}>
          {text("Nome Completo", "Full Name")}
        </label>
        <input 
          type="text" 
          required
          placeholder={text("Insira o seu nome", "Enter your name")}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className={inputClasse}
          disabled={enviando}
        />
      </div>

      {/* Telefone / WhatsApp */}
      <div>
        <label className={labelClasse}>
          {text("Telefone / WhatsApp", "Phone / WhatsApp")}
        </label>
        <input 
          type="tel" 
          required
          placeholder="Ex: +258 84 123 4567"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          className={inputClasse}
          disabled={enviando}
        />
      </div>

      {/* Email */}
      <div>
        <label className={labelClasse}>
          {text("Email (opcional)", "Email (optional)")}
        </label>
        <input 
          type="email" 
          placeholder="ex: nome@exemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClasse}
          disabled={enviando}
        />
      </div>

      {/* Check-in e Check-out (calendário com disponibilidade do CRM) */}
      <div className="grid grid-cols-2 gap-3 relative" ref={areaDatasRef}>
        <div>
          <label className={labelClasse}>
            Check-in
          </label>
          <button
            type="button"
            onClick={abrirCalendario}
            disabled={enviando}
            className={`w-full border border-[#c0c9c2] rounded-lg px-2 py-1.5 text-xs bg-[#f9f9f9] flex items-center justify-between gap-1 transition-colors ${checkIn ? "text-[#023625] font-semibold" : "text-[#414944]/50"} hover:border-[#023625] focus:outline-none focus:ring-1 focus:ring-[#023625]`}
          >
            <span>{checkIn ? formatarDataVisivel(checkIn) : text("Escolher", "Choose")}</span>
            <ChevronDown size={13} className="text-[#414944]/60" />
          </button>
        </div>
        <div>
          <label className={labelClasse}>
            Check-out
          </label>
          <button
            type="button"
            onClick={abrirCalendario}
            disabled={enviando}
            className={`w-full border border-[#c0c9c2] rounded-lg px-2 py-1.5 text-xs bg-[#f9f9f9] flex items-center justify-between gap-1 transition-colors ${checkOut ? "text-[#023625] font-semibold" : "text-[#414944]/50"} hover:border-[#023625] focus:outline-none focus:ring-1 focus:ring-[#023625]`}
          >
            <span>{checkOut ? formatarDataVisivel(checkOut) : text("Escolher", "Choose")}</span>
            <ChevronDown size={13} className="text-[#414944]/60" />
          </button>
        </div>

        {calendarioAberto && (
          <div className="col-span-2">
            <CalendarioReserva
              idioma={language}
              checkIn={checkIn}
              checkOut={checkOut}
              ocupadas={noitesOcupadas}
              aCarregar={aCarregar}
              disponibilidadeFalhou={disponibilidadeFalhou}
              onSelecionarData={selecionarData}
              onFechar={() => setCalendarioAberto(false)}
            />
          </div>
        )}
      </div>

      {/* Noites e total estimado */}
      {noites > 0 && (
        <p className="text-[11px] font-semibold text-[#7b580b] -mt-1">
          {noites} {noites === 1 ? text("noite", "night") : text("noites", "nights")}
          {total > 0 && (
            <span className="text-[#414944] font-medium">
              {" "}· {text("Total estimado", "Estimated total")}: {moedaActual} {total.toLocaleString("pt-MZ")}
            </span>
          )}
        </p>
      )}

      {/* Número de Hóspedes */}
      <div>
        <label className={labelClasse}>
          {text("Número de Hóspedes", "Number of Guests")}
        </label>
        <select 
          value={hospedes}
          onChange={(e) => setHospedes(e.target.value)}
          className="w-full border border-[#c0c9c2] rounded-lg px-3 py-2 text-xs bg-[#f9f9f9] focus:outline-none focus:ring-1 focus:ring-[#023625]"
          disabled={enviando}
        >
          {["1", "2", "3", "4", "5-6", "7-8"].map((value) => (
            <option key={value} value={value}>{guestLabel(value)}</option>
          ))}
        </select>
      </div>

      {/* Opção de quarto (quando a acomodação tem opções cadastradas) */}
      {roomOptions && roomOptions.length > 0 && (
        <div>
          <label className={labelClasse}>
            {text("Opção de Quarto", "Room Option")}
          </label>
          <select 
            value={opcao}
            onChange={(e) => setOpcao(e.target.value)}
            className="w-full border border-[#c0c9c2] rounded-lg px-3 py-2 text-xs bg-[#f9f9f9] focus:outline-none focus:ring-1 focus:ring-[#023625]"
            disabled={enviando}
          >
            <option value="">{text("Sem preferência", "No preference")}</option>
            {roomOptions.map((op) => (
              <option key={op.id} value={op.name}>
                {op.name}
                {op.price !== undefined ? ` — ${moedaActual} ${op.price}/${text("noite", "night")}` : ""}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Mensagem Adicional */}
      <div>
        <label className={labelClasse}>
          {text("Mensagem Adicional (Opcional)", "Additional Message (Optional)")}
        </label>
        <textarea 
          rows={2}
          placeholder={text("Indique pedidos especiais de cama ou horário de chegada...", "Share special bed requests or arrival time...")}
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          className="w-full border border-[#c0c9c2] rounded-lg px-3 py-2 text-xs bg-[#f9f9f9] focus:outline-none focus:ring-1 focus:ring-[#023625]"
          disabled={enviando}
        />
      </div>

      {/* Botão principal: envia a reserva ao CRM; a confirmação é do proprietário */}
      <button 
        type="submit"
        disabled={sucesso !== null || enviando}
        className="w-full bg-[#023625] text-white py-3.5 rounded-xl font-sans font-bold text-sm hover:bg-[#1f4d3a] transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-70"
      >
        {enviando ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <CalendarCheck size={16} />
        )}
        <span>{enviando ? text("A enviar...", "Sending...") : text("Enviar Pedido de Reserva", "Send Booking Request")}</span>
      </button>

      {/* Canal WhatsApp alternativo */}
      <button 
        type="button"
        onClick={abrirWhatsApp}
        disabled={enviando || sucesso !== null}
        className="w-full bg-[#25D366] text-white py-3 rounded-xl font-sans font-bold text-sm hover:brightness-95 transition-all shadow-sm active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
      >
        <MessageSquare size={16} />
        <span>{text("Enviar também pelo WhatsApp", "Also send via WhatsApp")}</span>
      </button>

      {/* Rodapé informativo */}
      <div className="mt-4 border-t border-gray-100 pt-3 text-center">
        <p className="text-[10px] text-[#414944] leading-relaxed">
          {text("O seu pedido é registado no sistema do proprietário. Só ele confirma ou cancela reservas. Sem custos ocultos nem necessidade de cartões neste canal.", "Your request goes straight to the owner's system. Only the owner confirms or cancels bookings. No hidden costs or card details in this channel.")}
        </p>
      </div>
    </form>
  );
};
