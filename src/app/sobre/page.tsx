import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  GraduationCap,
  Heart,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import { getDatabase, buildWhatsAppUrl } from "@/lib/db";
import { ScrollReveal } from "@/components/ScrollReveal";
import { HeroPortrait } from "@/components/HeroPortrait";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Muito prazer, Gabriela! | Sobre Gabriela Dourado",
  description:
    "Conheça a trajetória, a formação em Biomedicina Estética e a visão sobre beleza natural e cuidados com a pele de Gabriela Dourado.",
};

export default async function AboutPage() {
  const db = await getDatabase();
  const { about, settings } = db;

  const whatsappHref = buildWhatsAppUrl(
    settings.whatsappNumber,
    "Olá, Gabriela! Li um pouquinho sobre sua história no site e gostaria de conversar sobre a minha pele.",
    settings.whatsappDefaultMessage
  );

  return (
    <div className="bg-champagne-light">
      {/* 1 & 2. Hero: Fotografia profissional interativa + Apresentação em Fundo Vinho */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-wine-dark via-wine to-[#331320] text-champagne border-b border-gold/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <ScrollReveal direction="left" className="lg:col-span-5">
              <HeroPortrait
                imageUrl={about.heroImageUrl}
                imageAlt={about.heroImageAlt}
                brandName={settings.brandName}
              />
            </ScrollReveal>

            <ScrollReveal
              direction="right"
              delayMs={120}
              className="lg:col-span-7 space-y-6 lg:pl-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-wine-light border border-gold/50">
                <Heart className="w-3.5 h-3.5 text-gold" />
                <span className="text-xs uppercase tracking-[0.18em] text-champagne font-medium">
                  Quem está por trás do cuidado
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl text-champagne font-normal leading-tight">
                {about.heroTitle}
              </h1>

              <p className="font-serif text-xl sm:text-2xl text-gold-light italic leading-relaxed">
                {about.heroSubtitle}
              </p>

              <div className="w-20 h-[1.5px] bg-gold" />

              <div className="space-y-4 text-base sm:text-lg text-champagne/85 leading-relaxed">
                {about.personalIntro.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3 & 4. Relação com a Biomedicina e Visão sobre Beleza */}
      <section className="py-16 lg:py-24 bg-champagne border-b border-gold/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
            {/* Biomedicina (Card Vinho) */}
            <ScrollReveal direction="left">
              <div className="h-full bg-wine text-champagne p-8 sm:p-10 rounded-3xl border border-gold/50 shadow-xl space-y-5 editorial-card-hover">
                <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">
                  Ciência & Sensibilidade
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-champagne font-normal">
                  {about.biomedicineRelationTitle}
                </h2>
                <div className="space-y-4 text-base text-champagne/85 leading-relaxed">
                  {about.biomedicineRelationText.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Visão sobre beleza (Card Champagne Escuro / Vinho Borda) */}
            <ScrollReveal direction="right" delayMs={120}>
              <div className="h-full bg-champagne-light p-8 sm:p-10 rounded-3xl border border-wine/30 shadow-xl space-y-5 editorial-card-hover">
                <span className="text-xs uppercase tracking-[0.2em] text-wine font-medium">
                  Filosofia de Cuidado
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-wine font-normal">
                  {about.visionTitle}
                </h2>

                <blockquote className="p-5 rounded-2xl bg-wine text-champagne border-l-4 border-gold font-serif text-xl italic">
                  “{about.visionQuote}”
                </blockquote>

                <div className="space-y-4 text-base text-graphite leading-relaxed">
                  {about.visionText.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 5 & 6. Formação, Trajetória e Qualificações (Fundo Vinho Profundo) */}
      <section className="py-16 lg:py-24 bg-wine-dark text-champagne border-b border-gold/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <ScrollReveal className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-gold font-medium">
              <GraduationCap className="w-4 h-4" />
              <span>Estudo & Dedicação</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-champagne font-normal">
              {about.timelineTitle}
            </h2>
            <p className="text-base text-champagne/80">
              {about.timelineSubtitle}
            </p>
          </ScrollReveal>

          {/* Visual Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {about.educationTimeline.map((item, idx) => (
              <ScrollReveal key={idx} delayMs={idx * 100}>
                <div className="h-full p-7 rounded-2xl bg-wine border border-gold/40 editorial-card-hover space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.18em] text-gold font-medium">
                      {item.yearOrPeriod}
                    </span>
                    <span className="font-serif text-base text-gold">
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-champagne font-medium">
                    {item.title}
                  </h3>
                  {item.institution && (
                    <p className="text-xs uppercase tracking-wider text-gold-light">
                      {item.institution}
                    </p>
                  )}
                  <p className="text-sm text-champagne/80 leading-relaxed pt-1">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Qualifications Pill Grid */}
          <ScrollReveal className="bg-champagne text-graphite rounded-3xl p-8 sm:p-10 border border-gold/50 space-y-6">
            <h3 className="font-serif text-2xl sm:text-3xl text-wine font-normal text-center">
              {about.qualificationsTitle}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {about.qualifications.map((q, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-wine text-champagne p-4 rounded-xl border border-gold/40"
                >
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-1" />
                  <span className="text-sm leading-snug">{q}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 7 & 8. Apresentação Golden Essence + Link para Procedimentos */}
      <section className="py-16 lg:py-24 bg-champagne">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="bg-wine text-champagne rounded-3xl p-8 sm:p-12 border border-gold/50 shadow-2xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-gold font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Coleção Autoral by Gabriela Dourado</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl text-champagne font-normal">
              {about.goldenEssenceCalloutTitle}
            </h2>

            <p className="text-base sm:text-lg text-champagne/85 max-w-2xl mx-auto leading-relaxed">
              {about.goldenEssenceCalloutText}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/golden-essence" className="btn-champagne-glow">
                <Sparkles className="w-4 h-4 text-wine" />
                <span>Conhecer a coleção Golden Essence</span>
              </Link>

              <Link href="/procedimentos" className="btn-gold-subtle">
                <span>Conhecer todos os procedimentos</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-subtle"
              >
                <MessageCircle className="w-4 h-4 text-gold" />
                <span>Conversar comigo</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
