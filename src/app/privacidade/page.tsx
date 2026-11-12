import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { getDatabase } from "@/lib/db";

export const metadata: Metadata = {
  title: "Política de Privacidade & LGPD | Gabriela Dourado",
  description:
    "Saiba como protegemos seus dados pessoais e respeitamos a sua privacidade em conformidade com a Lei Geral de Proteção de Dados (LGPD).",
};

export default async function PrivacyPolicyPage() {
  const db = await getDatabase();
  const { settings } = db;

  return (
    <div className="bg-offwhite py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-wine hover:text-gold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para o Início</span>
        </Link>

        <div className="space-y-4 border-b border-gold/30 pb-8">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>Transparência & LGPD</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-wine font-normal">
            Política de Privacidade
          </h1>
          <p className="text-sm text-graphite-muted">
            Última atualização: Novembro de 2026 • {settings.brandName}
          </p>
        </div>

        <div className="space-y-8 text-sm sm:text-base text-graphite leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-wine font-medium">
              1. Nosso compromisso com a sua privacidade
            </h2>
            <p>
              Assim como cuidamos de cada detalhe da sua pele com respeito e
              responsabilidade, tratamos as suas informações pessoais com total
              transparência e segurança, em conformidade com a Lei Geral de
              Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-wine font-medium">
              2. Quais dados coletamos no site?
            </h2>
            <p>
              Seguimos o princípio da minimização de dados: coletamos apenas o
              estritamente necessário quando você decide entrar em contato
              conosco pelo formulário opcional ou pelo WhatsApp:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-graphite-muted">
              <li>Nome (para sabermos como chamar você);</li>
              <li>Telefone/WhatsApp ou E-mail (para respondermos sua mensagem);</li>
              <li>Assunto de interesse e mensagem enviada voluntariamente.</li>
            </ul>
            <p className="p-4 rounded-2xl bg-champagne/40 border border-gold/35 text-xs sm:text-sm">
              <strong>Importante sobre dados de saúde:</strong> Não coletamos
              prontuários médicos ou informações clínicas sensíveis através
              deste site informativo. Qualquer avaliação de saúde estética é
              realizada exclusivamente em ambiente clínico reservado e seguro.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-wine font-medium">
              3. Para que utilizamos essas informações?
            </h2>
            <p>
              Os dados fornecidos por você no formulário de contato são usados
              única e exclusivamente para responder às suas dúvidas e auxiliar
              no agendamento de avaliações presenciais. Não vendemos, alugamos
              ou compartilhamos seus dados com terceiros para fins publicitários.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-wine font-medium">
              4. Seus direitos como titular de dados (LGPD)
            </h2>
            <p>
              A qualquer momento, você pode solicitar a confirmação, alteração
              ou exclusão definitiva dos dados de contato enviados pelo site,
              bastando entrar em contato pelo e-mail{" "}
              <span className="text-wine font-medium">{settings.email}</span> ou
              pelo nosso WhatsApp oficial.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
