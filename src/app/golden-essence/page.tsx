import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  ArrowRight,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";
import { getDatabase, buildWhatsAppUrl } from "@/lib/db";
import { ScrollReveal } from "@/components/ScrollReveal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Golden Essence by Gabriela Dourado | Coleção Autoral de Protocolos",
  description:
    "Conheça a coleção Golden Essence by Gabriela Dourado: protocolos exclusivos e individualizados de limpeza de pele, peelings químicos e microagulhamento.",
};

export default async function GoldenEssencePage() {
  const db = await getDatabase();
  const { goldenEssencePage, settings } = db;
  const protocols = db.goldenEssenceProtocols
    .filter((p) => p.published)
    .sort((a, b) => a.order - b.order);

  const defaultWhatsappHref = buildWhatsAppUrl(
    settings.whatsappNumber,
    "Olá! Estava na página da coleção Golden Essence e gostaria de conversar sobre uma avaliação para a minha pele.",
    settings.whatsappDefaultMessage
  );

  return (
    <div className="bg-champagne text-graphite">
      {/* PRIMEIRA SEÇÃO: APRESENTAÇÃO DA COLEÇÃO (Fundo Vinho & Dourado) */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-wine-dark via-wine to-[#361422] text-champagne border-b border-gold/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <ScrollReveal direction="left" className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-wine-light border border-gold/50">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span className="text-xs uppercase tracking-[0.22em] text-champagne font-medium">
                  Coleção Autoral de Protocolos
                </span>
              </div>

              <div>
                <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-champagne font-normal tracking-tight">
                  {goldenEssencePage.heroTitle}
                </h1>
                <p className="font-serif text-xl sm:text-2xl italic text-gold-light mt-1">
                  {goldenEssencePage.heroSignature}
                </p>
              </div>

              <div className="w-24 h-[1.5px] bg-gold" />

              <div className="space-y-4">
                {goldenEssencePage.heroConceptParagraphs.map((paragraph, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? "font-serif text-2xl sm:text-3xl text-champagne leading-snug"
                        : "text-base sm:text-lg text-champagne/85 leading-relaxed"
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-4">
                <a href="#protocolos" className="btn-champagne-glow">
                  <Sparkles className="w-4 h-4 text-wine" />
                  <span>{goldenEssencePage.evaluationCtaText}</span>
                </a>
                <a
                  href={defaultWhatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold-subtle"
                >
                  <MessageCircle className="w-4 h-4 text-gold" />
                  <span>Agendar avaliação individual</span>
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delayMs={140} className="lg:col-span-5">
              <div className="group relative mx-auto max-w-md">
                <div className="absolute -inset-3 rounded-[28px] border border-gold/60 translate-x-3 translate-y-3 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-500 pointer-events-none" />
                <div className="relative rounded-[24px] overflow-hidden aspect-[4/5] shadow-2xl bg-wine-dark border border-gold/50">
                  <img
                    src={goldenEssencePage.heroImageUrl}
                    alt="Coleção Golden Essence by Gabriela Dourado"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-wine-dark/85 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 bg-wine/90 backdrop-blur-md p-4 rounded-2xl border border-gold/50 text-center">
                    <span className="font-serif text-lg text-champagne italic block">
                      “Cada pele tem sua história. E o cuidado deve começar
                      entendendo isso.”
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SEGUNDA SEÇÃO: APRESENTAÇÃO DOS PROTOCOLOS EM CARDS */}
      <section
        id="protocolos"
        className="py-16 lg:py-24 bg-champagne-light border-b border-gold/45"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <ScrollReveal className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-wine font-medium">
              Os Pilares da Coleção
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-wine font-normal">
              Três experiências pensadas para diferentes momentos da sua pele
            </h2>
            <p className="text-base text-graphite">
              Selecione um protocolo abaixo para explorar cada etapa, como
              funciona na pele, cuidados antes e depois e dúvidas frequentes.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {protocols.map((protocol, index) => (
              <ScrollReveal key={protocol.id} delayMs={index * 120}>
                <div className="group h-full bg-wine text-champagne rounded-3xl border border-gold/50 overflow-hidden editorial-card-hover flex flex-col justify-between">
                  <div>
                    <div className="relative h-64 overflow-hidden bg-wine-dark">
                      <img
                        src={protocol.imageUrl}
                        alt={protocol.imageAlt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-wine-dark/75 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4 bg-champagne text-wine px-3.5 py-1 rounded-full border border-gold">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold">
                          Protocolo 0{index + 1} • {protocol.technicalCategory}
                        </span>
                      </div>
                    </div>

                    <div className="p-7 space-y-3">
                      <h3 className="font-serif text-2xl text-champagne font-medium leading-snug">
                        {protocol.commercialName}
                      </h3>
                      <p className="text-xs uppercase tracking-[0.15em] text-gold-light font-medium">
                        {protocol.tagline}
                      </p>
                      <p className="text-sm text-champagne/85 leading-relaxed pt-1">
                        {protocol.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="px-7 pb-7 pt-3 flex items-center justify-between border-t border-gold/30 mt-2">
                    <a
                      href={`#${protocol.slug}`}
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-gold-light font-medium group-hover:gap-3 transition-all"
                    >
                      <span>Ver detalhes completos</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gold" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* TERCEIRA SEÇÃO: DETALHES COMPLETOS DE CADA PROTOCOLO */}
      <section className="py-16 lg:py-24 bg-champagne space-y-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {protocols.map((protocol, index) => {
            const protocolWhatsapp = buildWhatsAppUrl(
              settings.whatsappNumber,
              `Olá, Gabriela! Gostaria de saber mais sobre o protocolo ${protocol.commercialName} (${protocol.technicalCategory}) da coleção Golden Essence.`,
              settings.whatsappDefaultMessage
            );

            return (
              <ScrollReveal key={protocol.id}>
                <article
                  id={protocol.slug}
                  className="scroll-mt-28 bg-champagne-light rounded-[32px] border border-gold/55 shadow-2xl overflow-hidden"
                >
                  {/* Top Protocol Banner (Vinho Profundo) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 bg-wine text-champagne border-b border-gold/45">
                    <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full overflow-hidden">
                      <img
                        src={protocol.imageUrl}
                        alt={protocol.imageAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 space-y-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] uppercase tracking-[0.22em] bg-champagne text-wine font-semibold px-3.5 py-1 rounded-full">
                          Golden Essence 0{index + 1}
                        </span>
                        <span className="text-xs uppercase tracking-[0.18em] text-gold font-medium">
                          {protocol.technicalCategory}
                        </span>
                      </div>

                      <h2 className="font-serif text-3xl sm:text-4xl text-champagne font-normal">
                        {protocol.commercialName}
                      </h2>

                      <p className="font-serif text-lg italic text-gold-light">
                        {protocol.tagline}
                      </p>

                      <p className="text-sm sm:text-base text-champagne/85 leading-relaxed">
                        {protocol.fullDescription}
                      </p>

                      <div className="p-4 rounded-2xl bg-wine-dark/80 border border-gold/40">
                        <span className="text-[11px] uppercase tracking-[0.18em] text-gold block font-medium">
                          Objetivo do protocolo
                        </span>
                        <p className="text-sm text-champagne mt-1 leading-relaxed">
                          {protocol.objective}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Body of the Protocol */}
                  <div className="p-8 sm:p-10 lg:p-12 space-y-12">
                    {/* Necessidades da pele & Como funciona */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h3 className="font-serif text-2xl text-wine font-medium">
                          Necessidades da pele que podem ser avaliadas
                        </h3>
                        <ul className="space-y-2.5">
                          {protocol.skinNeeds.map((need, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2.5 text-sm text-graphite"
                            >
                              <Sparkles className="w-4 h-4 text-wine shrink-0 mt-0.5" />
                              <span>{need}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-serif text-2xl text-wine font-medium">
                          Como funciona na pele?
                        </h3>
                        <p className="text-sm sm:text-base text-graphite leading-relaxed">
                          {protocol.howItWorks}
                        </p>

                        <div className="pt-2">
                          <h4 className="font-serif text-xl text-wine font-medium mb-2.5">
                            Benefícios esperados
                          </h4>
                          <ul className="space-y-2">
                            {protocol.expectedBenefits.map((benefit, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2.5 text-sm text-graphite"
                              >
                                <CheckCircle2 className="w-4 h-4 text-wine shrink-0 mt-0.5" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Etapas do Protocolo */}
                    <div className="space-y-5 pt-4 border-t border-gold/35">
                      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                        <h3 className="font-serif text-2xl sm:text-3xl text-wine font-normal">
                          Etapas da experiência no consultório
                        </h3>
                        <span className="text-xs uppercase tracking-[0.18em] text-wine">
                          Cuidado passo a passo
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {protocol.steps.map((step, sIdx) => (
                          <div
                            key={sIdx}
                            className="p-5 rounded-2xl bg-wine text-champagne border border-gold/45 space-y-2 shadow-md"
                          >
                            <span className="font-serif text-2xl text-gold font-medium block">
                              {step.stepNumber}
                            </span>
                            <h4 className="font-serif text-lg text-champagne font-medium">
                              {step.title}
                            </h4>
                            <p className="text-xs text-champagne/80 leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Cuidados Antes e Depois + Contraindicações */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 border-t border-gold/35">
                      <div className="p-6 rounded-2xl bg-champagne border border-gold/40 space-y-3">
                        <h4 className="font-serif text-xl text-wine font-medium">
                          Cuidados antes da sessão
                        </h4>
                        <ul className="space-y-2 text-xs sm:text-sm text-graphite">
                          {protocol.preCare.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-wine font-bold">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-6 rounded-2xl bg-champagne border border-gold/40 space-y-3">
                        <h4 className="font-serif text-xl text-wine font-medium">
                          Cuidados depois da sessão
                        </h4>
                        <ul className="space-y-2 text-xs sm:text-sm text-graphite">
                          {protocol.postCare.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-wine font-bold">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-6 rounded-2xl bg-wine/10 border border-wine/30 space-y-3">
                        <h4 className="font-serif text-xl text-wine font-medium flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-wine shrink-0" />
                          <span>Contraindicações & Limitações</span>
                        </h4>
                        <ul className="space-y-2 text-xs sm:text-sm text-graphite">
                          {protocol.contraindicationsAndLimitations.map(
                            (item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-wine font-bold">•</span>
                                <span>{item}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>

                    {/* Nota de Avaliação Individual + Perguntas Frequentes */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 border-t border-gold/35 items-start">
                      <div className="lg:col-span-5 p-6 rounded-2xl bg-wine text-champagne border border-gold/50 space-y-4">
                        <div className="flex items-center gap-2 text-champagne">
                          <ShieldCheck className="w-5 h-5 text-gold" />
                          <h4 className="font-serif text-xl font-medium">
                            Necessidade de avaliação individual
                          </h4>
                        </div>
                        <p className="text-sm text-champagne/90 leading-relaxed">
                          {protocol.individualEvaluationNote}
                        </p>
                        <p className="text-xs text-gold-light italic">
                          Nota ética: A resposta biológica varia de pessoa para
                          pessoa. Não trabalhamos com promessas padronizadas,
                          mas com ciência aplicada à realidade da sua pele.
                        </p>
                        <div className="pt-2">
                          <a
                            href={protocolWhatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full btn-champagne-glow justify-center"
                          >
                            <MessageCircle className="w-4 h-4 text-wine" />
                            <span>Conversar sobre este protocolo</span>
                          </a>
                        </div>
                      </div>

                      <div className="lg:col-span-7 space-y-4">
                        <h4 className="font-serif text-2xl text-wine font-medium flex items-center gap-2">
                          <HelpCircle className="w-5 h-5 text-wine" />
                          <span>
                            Dúvidas comuns sobre {protocol.technicalCategory}
                          </span>
                        </h4>
                        <div className="space-y-3">
                          {protocol.faqs.map((faq, fIdx) => (
                            <div
                              key={fIdx}
                              className="p-5 rounded-2xl bg-champagne border border-gold/40 space-y-1.5"
                            >
                              <p className="font-serif text-lg text-wine font-medium">
                                {faq.question}
                              </p>
                              <p className="text-sm text-graphite leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* QUARTA SEÇÃO: AVALIAÇÃO */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-wine-dark via-wine to-wine-light text-champagne">
        <ScrollReveal className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Sparkles className="w-7 h-7 text-gold mx-auto" />
          <h2 className="font-serif text-3xl sm:text-5xl text-champagne font-normal">
            {goldenEssencePage.evaluationSectionTitle}
          </h2>
          <div className="space-y-4 text-base sm:text-lg text-champagne/85 leading-relaxed max-w-2xl mx-auto">
            {goldenEssencePage.evaluationSectionText.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={defaultWhatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-champagne-glow"
            >
              <MessageCircle className="w-4 h-4 text-wine" />
              <span>Vamos conversar sobre a sua pele</span>
            </a>
            <Link href="/procedimentos" className="btn-gold-subtle">
              <span>Ver catálogo de procedimentos</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
