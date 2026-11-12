import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles, MessageCircle, CheckCircle2 } from "lucide-react";
import { getDatabase, buildWhatsAppUrl } from "@/lib/db";
import { ScrollReveal } from "@/components/ScrollReveal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Procedimentos Estéticos | Cuidado Individualizado com a Pele",
  description:
    "Conheça os procedimentos realizados por Gabriela Dourado: avaliação cutânea, limpeza de pele, peeling químico e microagulhamento explicados de forma clara e acessível.",
};

export default async function ProceduresPage() {
  const db = await getDatabase();
  const procedures = db.procedures
    .filter((p) => p.published)
    .sort((a, b) => a.order - b.order);

  const whatsappHref = buildWhatsAppUrl(
    db.settings.whatsappNumber,
    "Olá, Gabriela! Estava vendo os procedimentos no site e gostaria de conversar sobre o que faz sentido para a minha pele.",
    db.settings.whatsappDefaultMessage
  );

  return (
    <div className="bg-champagne">
      {/* Header Editorial em Fundo Vinho */}
      <section className="py-16 lg:py-24 border-b border-gold/45 bg-gradient-to-br from-wine-dark via-wine to-[#331320] text-champagne">
        <ScrollReveal className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <span className="inline-block px-4 py-1.5 rounded-full bg-wine-light border border-gold/50 text-xs uppercase tracking-[0.22em] text-gold font-medium">
            Catálogo de Cuidados & Ciência
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-champagne font-normal">
            Procedimentos pensados para conversar com a sua pele
          </h1>
          <p className="text-base sm:text-lg text-champagne/85 leading-relaxed max-w-2xl mx-auto">
            Antes de agendar qualquer sessão, gosto que você entenda o que é
            cada procedimento, como ele age lá dentro da pele e para quais
            necessidades pode ser indicado. Sem termos complicados e sempre com
            responsabilidade.
          </p>
        </ScrollReveal>
      </section>

      {/* Lista de Procedimentos */}
      <section className="py-16 lg:py-24 bg-champagne-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {procedures.map((proc, index) => (
              <ScrollReveal key={proc.id} delayMs={index * 110}>
                <article className="group h-full bg-wine text-champagne rounded-3xl border border-gold/50 overflow-hidden editorial-card-hover flex flex-col justify-between">
                  <div>
                    <Link
                      href={`/procedimentos/${proc.slug}`}
                      className="block relative h-72 overflow-hidden bg-wine-dark"
                    >
                      <img
                        src={proc.imageUrl}
                        alt={proc.imageAlt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-wine-dark/75 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4 bg-champagne text-wine px-3.5 py-1 rounded-full border border-gold">
                        <span className="text-[11px] uppercase tracking-[0.16em] font-semibold">
                          {proc.category}
                        </span>
                      </div>
                    </Link>

                    <div className="p-8 space-y-4">
                      <Link href={`/procedimentos/${proc.slug}`}>
                        <h2 className="font-serif text-3xl text-champagne font-normal group-hover:text-gold-light transition-colors">
                          {proc.name}
                        </h2>
                      </Link>

                      <p className="text-sm sm:text-base text-champagne/85 leading-relaxed">
                        {proc.shortDescription}
                      </p>

                      <div className="pt-2 space-y-2">
                        <span className="text-xs uppercase tracking-[0.16em] text-gold font-medium block">
                          Principais necessidades avaliadas:
                        </span>
                        <ul className="space-y-1.5">
                          {proc.indications.slice(0, 3).map((ind, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-xs sm:text-sm text-champagne/80"
                            >
                              <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                              <span>{ind}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="px-8 pb-8 pt-4 border-t border-gold/30 flex items-center justify-between">
                    <Link
                      href={`/procedimentos/${proc.slug}`}
                      className="btn-champagne-glow group"
                    >
                      <span>Entender procedimento</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Banner Golden Essence & Contato */}
      <section className="py-16 lg:py-20 bg-champagne border-t border-gold/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="bg-wine-dark text-champagne rounded-3xl p-8 sm:p-12 border border-gold/50 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold font-medium">
                <Sparkles className="w-4 h-4" />
                <span>Não sabe por qual começar?</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-champagne font-normal">
                Você não precisa escolher sozinha o procedimento da sua pele.
              </h2>
              <p className="text-sm sm:text-base text-champagne/85 leading-relaxed">
                É super normal ficar em dúvida entre limpeza, peeling ou
                microagulhamento. Vamos conversar sobre o que você sente hoje na
                sua pele e descobrir juntas o que faz sentido para você.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full sm:w-auto">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-champagne-glow justify-center"
              >
                <MessageCircle className="w-4 h-4 text-wine" />
                <span>Conversar pelo WhatsApp</span>
              </a>
              <Link
                href="/golden-essence"
                className="btn-gold-subtle justify-center"
              >
                <Sparkles className="w-4 h-4 text-gold" />
                <span>Conhecer Golden Essence</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
