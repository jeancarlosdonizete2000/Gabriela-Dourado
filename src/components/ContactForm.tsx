"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [whatsappOrEmail, setWhatsappOrEmail] = useState("");
  const [interest, setInterest] = useState(
    "Quero agendar uma avaliação cutânea"
  );
  const [message, setMessage] = useState("");
  const [consentGiven, setConsentGiven] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          whatsappOrEmail,
          interest,
          message,
          consentGiven,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Não foi possível enviar sua mensagem.");
      } else {
        setSubmitted(true);
        setName("");
        setWhatsappOrEmail("");
        setMessage("");
        setConsentGiven(false);
      }
    } catch {
      setErrorMsg("Erro de conexão ao enviar mensagem. Tente pelo WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 rounded-3xl bg-champagne/40 border border-gold/40 text-center space-y-4">
        <CheckCircle2 className="w-10 h-10 text-wine mx-auto" />
        <h3 className="font-serif text-3xl text-wine font-normal">
          Mensagem recebida com carinho!
        </h3>
        <p className="text-sm sm:text-base text-graphite-muted leading-relaxed">
          Obrigada por escrever! Vou ler sua mensagem com atenção e entrar em
          contato o mais breve possível. Se preferir uma resposta ainda mais
          rápida, você também pode me chamar diretamente no WhatsApp ao lado.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="btn-outline-wine mt-2"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-wine/10 border border-wine/30 text-wine text-xs sm:text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="space-y-1.5">
        <label
          htmlFor="contact-name"
          className="block text-xs uppercase tracking-[0.16em] text-wine font-medium"
        >
          Como você gosta de ser chamada(o)? *
        </label>
        <input
          id="contact-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome"
          className="w-full px-4 py-3 rounded-xl bg-offwhite border border-gold/35 text-sm text-graphite focus:outline-none focus:border-wine"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="contact-whatsapp"
          className="block text-xs uppercase tracking-[0.16em] text-wine font-medium"
        >
          Seu WhatsApp ou E-mail *
        </label>
        <input
          id="contact-whatsapp"
          type="text"
          required
          value={whatsappOrEmail}
          onChange={(e) => setWhatsappOrEmail(e.target.value)}
          placeholder="(34) 99999-9999 ou seu@email.com"
          className="w-full px-4 py-3 rounded-xl bg-offwhite border border-gold/35 text-sm text-graphite focus:outline-none focus:border-wine"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="contact-interest"
          className="block text-xs uppercase tracking-[0.16em] text-wine font-medium"
        >
          Sobre o que você gostaria de conversar?
        </label>
        <select
          id="contact-interest"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-offwhite border border-gold/35 text-sm text-graphite focus:outline-none focus:border-wine"
        >
          <option value="Quero agendar uma avaliação cutânea">
            Quero agendar uma avaliação cutânea
          </option>
          <option value="Quero conhecer a coleção Golden Essence">
            Quero conhecer a coleção Golden Essence
          </option>
          <option value="Tenho dúvidas sobre Limpeza de Pele / Peeling / Microagulhamento">
            Tenho dúvidas sobre Limpeza de Pele / Peeling / Microagulhamento
          </option>
          <option value="Sugestão de tema para o The Beauty Edit">
            Sugestão de tema para o The Beauty Edit
          </option>
          <option value="Outro assunto">Outro assunto</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="contact-message"
          className="block text-xs uppercase tracking-[0.16em] text-wine font-medium"
        >
          Me conte um pouquinho como posso te ajudar *
        </label>
        <textarea
          id="contact-message"
          rows={4}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Evite enviar dados clínicos sensíveis por aqui — deixamos os detalhes da avaliação para a nossa conversa reservada!"
          className="w-full px-4 py-3 rounded-xl bg-offwhite border border-gold/35 text-sm text-graphite focus:outline-none focus:border-wine"
        />
      </div>

      {/* LGPD Consent */}
      <label className="flex items-start gap-3 text-xs text-graphite-muted cursor-pointer pt-1">
        <input
          type="checkbox"
          required
          checked={consentGiven}
          onChange={(e) => setConsentGiven(e.target.checked)}
          className="mt-1 accent-wine rounded"
        />
        <span>
          Concordo com o uso dos dados informados acima exclusivamente para que
          a equipe de Gabriela Dourado responda ao meu contato, conforme a{" "}
          <Link href="/privacidade" className="underline text-wine">
            Política de Privacidade (LGPD)
          </Link>
          .
        </span>
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="w-full btn-wine justify-center disabled:opacity-60"
      >
        <Send className="w-4 h-4 text-champagne" />
        <span>{submitting ? "Enviando..." : "Enviar mensagem"}</span>
      </button>
    </form>
  );
}
