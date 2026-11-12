import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { getDatabase, buildWhatsAppUrl } from "@/lib/db";
import { ScrollReveal } from "@/components/ScrollReveal";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const db = await getDatabase();
  const proc = db.procedures.find((p) => p.slug === slug);

  if (!proc) {
    return { title: "Procedimento não encontrado" };
  }

  return {
    title: proc.seoTitle || `${proc.name} | Procedimentos Gabriela Dourado`,
    description: proc.seoDescription || proc.shortDescription,
  };
}

export default async function ProcedureDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const db = await getDatabase();
  const proc = db.procedures.find((p) => p.slug === slug && p.published);

  if (!proc) {
    notFound();
  }

  const whatsappHref = buildWhatsAppUrl(
    db.settings.whatsappNumber,
    `Olá, Gabriela! Li sobre o procedimento "${proc.name}" no site e gostaria de conversar sobre como funciona uma avaliação.`,
    db.settings.whatsappDefaultMessage
  );

  return (
    <div className="bg-champagne">
      {/* Top Breadcrumb + Hero em Vinho Profundo */}
      <section className="py-14 lg:py-22 bg-gradient-to-br from-wine-dark via-wine to-[#331320] text-champagne border-b border-gold/45">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <Link
            href="/procedimentos"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-gold-light hover:text-champagne transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para Procedimentos</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <ScrollReveal direction="left" className="lg:col-span-7 space-y-5">
              <span className="inline-block px-4 py-1 rounded-full bg-wine-light border border-gold/50 text-xs uppercase tracking-[0.18em] text-gold font-medium">
                {proc.category}
              </span>

              {/* 1. Nome do procedimento */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-champagne font-normal leading-tight">
                {proc.name}
              </h1>

              {/* 3. Apresentação */}
              <p className="font-serif text-xl sm:text-2xl text-gold-light italic leading-relaxed">
                {proc.presentation}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-champagne-glow"
                >
                  <MessageCircle className="w-4 h-4 text-wine" />
                  <span>Vamos conversar sobre o que faz sentido para você</span>
                </a>
              </div>
            </ScrollReveal>

            {/* 2. Imagem principal */}
            <ScrollReveal direction="right" delayMs={120} className="lg:col-span-5">
              <div className="group rounded-3xl overflow-hidden border border-gold/55 shadow-2xl aspect-[4/3] lg:aspect-[4/5] bg-wine-dark">
                <img
                  src={proc.imageUrl}
                  alt={proc.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24 bg-champagne-light">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {/* 4. O que é? & 5. Como funciona? */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal direction="left">
              <div className="h-full p-8 rounded-3xl bg-wine text-champagne border border-gold/45 shadow-xl space-y-3">
                <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">
                  Entendendo o cuidado
                </span>
                <h2 className="font-serif text-3xl text-champagne font-normal">
                  O que é?
                </h2>
                <p className="text-sm sm:text-base text-champagne/85 leading-relaxed">
                  {proc.whatIsIt}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delayMs={100}>
              <div className="h-full p-8 rounded-3xl bg-wine text-champagne border border-gold/45 shadow-xl space-y-3">
                <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">
                  Ciência descomplicada
                </span>
                <h2 className="font-serif text-3xl text-champagne font-normal">
                  Como funciona na pele?
                </h2>
                <p className="text-sm sm:text-base text-champagne/85 leading-relaxed">
                  {proc.howItWorks}
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* 6. Para quais necessidades pode ser indicado? & 7. Quais benefícios podem ser esperados? */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal>
              <div className="h-full p-8 rounded-3xl bg-champagne border border-gold/50 space-y-4">
                <h2 className="font-serif text-2xl sm:text-3xl text-wine font-normal">
                  Para quais necessidades pode ser indicado?
                </h2>
                <ul className="space-y-3">
                  {proc.indications.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm sm:text-base text-graphite"
                    >
                      <Sparkles className="w-4 h-4 text-wine shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delayMs={100}>
              <div className="h-full p-8 rounded-3xl bg-champagne border border-gold/50 space-y-4">
                <h2 className="font-serif text-2xl sm:text-3xl text-wine font-normal">
                  Quais benefícios podem ser esperados?
                </h2>
                <ul className="space-y-3">
                  {proc.expectedBenefits.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm sm:text-base text-graphite"
                    >
                      <CheckCircle2 className="w-4 h-4 text-wine shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>

          {/* 8. Como é realizado? */}
          <ScrollReveal>
            <div className="p-8 sm:p-10 rounded-3xl bg-wine-dark text-champagne border border-gold/45 shadow-xl space-y-3">
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">
                No consultório
              </span>
              <h2 className="font-serif text-3xl text-champagne font-normal">
                Como é realizado?
              </h2>
              <p className="text-base text-champagne/85 leading-relaxed">
                {proc.howItIsPerformed}
              </p>
            </div>
          </ScrollReveal>

          {/* 9. Cuidados antes e depois & 10. Contraindicações */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ScrollReveal>
              <div className="h-full p-7 rounded-3xl bg-champagne border border-gold/40 space-y-3">
                <h3 className="font-serif text-2xl text-wine font-normal">
                  Cuidados antes
                </h3>
                <ul className="space-y-2.5 text-sm text-graphite">
                  {proc.preCare.map((c, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-wine font-bold">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delayMs={100}>
              <div className="h-full p-7 rounded-3xl bg-champagne border border-gold/40 space-y-3">
                <h3 className="font-serif text-2xl text-wine font-normal">
                  Cuidados depois
                </h3>
                <ul className="space-y-2.5 text-sm text-graphite">
                  {proc.postCare.map((c, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-wine font-bold">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delayMs={200}>
              <div className="h-full p-7 rounded-3xl bg-wine text-champagne border border-gold/45 space-y-3">
                <h3 className="font-serif text-2xl text-champagne font-normal flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-gold" />
                  <span>Contraindicações</span>
                </h3>
                <ul className="space-y-2.5 text-sm text-champagne/85">
                  {proc.contraindications.map((c, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-gold font-bold">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>

          {/* 11. Perguntas frequentes */}
          {proc.faqs.length > 0 && (
            <ScrollReveal className="space-y-6 pt-4">
              <h2 className="font-serif text-3xl text-wine font-normal flex items-center gap-2.5">
                <HelpCircle className="w-6 h-6 text-wine" />
                <span>Perguntas frequentes</span>
              </h2>
              <div className="space-y-4">
                {proc.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-champagne border border-gold/45 space-y-2"
                  >
                    <h3 className="font-serif text-xl text-wine font-medium">
                      {faq.question}
                    </h3>
                    <p className="text-sm sm:text-base text-graphite leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          )}

          {/* 12. Botão para contato */}
          <ScrollReveal className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-wine-dark via-wine to-wine-light text-champagne text-center space-y-5 shadow-2xl border border-gold/50">
            <h2 className="font-serif text-3xl sm:text-4xl text-champagne font-normal">
              Ficou com alguma dúvida sobre {proc.name}?
            </h2>
            <p className="text-sm sm:text-base text-champagne/85 max-w-xl mx-auto leading-relaxed">
              Está pensando em cuidar melhor da sua pele? Vamos conversar sobre
              o que faz sentido para você e avaliar com carinho a sua
              individualidade.
            </p>
            <div className="pt-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-champagne-glow"
              >
                <MessageCircle className="w-4 h-4 text-wine" />
                <span>Conversar pelo WhatsApp</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
