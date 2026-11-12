import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Clock,
  BookOpen,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import { getDatabase, buildWhatsAppUrl } from "@/lib/db";
import { ScrollReveal } from "@/components/ScrollReveal";
import { HeroPortrait } from "@/components/HeroPortrait";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const db = await getDatabase();
  const { home, settings } = db;

  const publishedProcedures = db.procedures
    .filter((p) => p.published && p.featuredOnHome)
    .sort((a, b) => a.order - b.order);

  const recentArticles = db.articles
    .filter((a) => a.status === "published")
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, 3);

  const getCategoryName = (slug: string) => {
    return (
      db.articleCategories.find((c) => c.slug === slug)?.name || "Beauty Edit"
    );
  };

  const whatsappHref = buildWhatsAppUrl(
    settings.whatsappNumber,
    undefined,
    settings.whatsappDefaultMessage
  );

  return (
    <div className="space-y-0">
      {/* SEÇÃO 1: HERO (Imersão em Vinho Editorial & Dourado) */}
      <section className="relative overflow-hidden pt-10 pb-24 lg:pt-18 lg:pb-32 bg-gradient-to-br from-wine-dark via-wine to-[#331320] text-champagne border-b border-gold/40">
        {/* Subtle Ambient Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[28rem] h-[28rem] rounded-full bg-wine-light/30 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Column: Editorial Typography */}
            <ScrollReveal
              direction="left"
              className="lg:col-span-7 space-y-6 lg:pr-8"
            >
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-wine-light/80 border border-gold/50 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <span className="text-xs uppercase tracking-[0.2em] text-champagne font-medium">
                  {home.hero.badge}
                </span>
              </div>

              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.28em] text-gold font-medium">
                  {settings.brandName}
                </p>
                <h1 className="font-serif text-5xl sm:text-6xl lg:text-[68px] text-champagne leading-[1.06] font-normal">
                  {home.hero.title}
                </h1>
              </div>

              <p className="font-serif text-xl sm:text-2xl text-gold-light italic leading-relaxed">
                {home.hero.subtitle}
              </p>

              <p className="text-base sm:text-lg text-champagne/85 leading-relaxed max-w-xl">
                {home.hero.description}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href={home.hero.primaryCtaLink}
                  className="btn-champagne-glow group"
                >
                  <span>{home.hero.primaryCtaText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <Link
                  href={home.hero.secondaryCtaLink}
                  className="btn-gold-subtle group"
                >
                  <Sparkles className="w-4 h-4 text-gold transition-transform duration-300 group-hover:rotate-12" />
                  <span>{home.hero.secondaryCtaText}</span>
                </Link>
              </div>

              {/* Micro-trust indicators */}
              <div className="pt-8 border-t border-gold/30 grid grid-cols-3 gap-4 max-w-lg text-xs text-champagne/80">
                <div>
                  <span className="block font-serif text-lg sm:text-xl text-gold-light font-medium">
                    Ciência leve
                  </span>
                  <span>Explicada sem complicar</span>
                </div>
                <div>
                  <span className="block font-serif text-lg sm:text-xl text-gold-light font-medium">
                    Sem padrões
                  </span>
                  <span>Respeito à sua pele real</span>
                </div>
                <div>
                  <span className="block font-serif text-lg sm:text-xl text-gold-light font-medium">
                    Individual
                  </span>
                  <span>Protocolos sob medida</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Column: Interactive Hero Portrait */}
            <ScrollReveal direction="right" delayMs={150} className="lg:col-span-5">
              <HeroPortrait
                imageUrl={home.hero.imageUrl}
                imageAlt={home.hero.imageAlt}
                brandName={settings.brandName}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SEÇÃO 2: APRESENTAÇÃO GOLDEN ESSENCE (Champagne & Vinho) */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-b from-champagne via-champagne-light to-champagne border-b border-gold/45">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Composition */}
            <ScrollReveal
              direction="left"
              className="lg:col-span-5 order-2 lg:order-1"
            >
              <div className="group relative rounded-[26px] overflow-hidden border border-gold/60 shadow-2xl bg-wine aspect-[4/5]">
                <img
                  src={home.goldenEssenceSection.imageUrl}
                  alt={home.goldenEssenceSection.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wine-dark/70 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 bg-wine/90 backdrop-blur-sm px-4 py-1.5 rounded-full border border-gold/50">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-champagne font-medium flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-gold" />
                    Coleção Autoral
                  </span>
                </div>
              </div>
            </ScrollReveal>

            {/* Golden Essence Editorial Story */}
            <ScrollReveal
              direction="right"
              delayMs={120}
              className="lg:col-span-7 order-1 lg:order-2 space-y-6 lg:pl-8"
            >
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-wine font-medium">
                  <span className="w-8 h-[1.5px] bg-wine" />
                  <span>Assinatura Exclusiva</span>
                </div>
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-wine font-normal tracking-tight">
                  {home.goldenEssenceSection.title}
                </h2>
                <p className="font-serif text-lg sm:text-xl italic text-gold-dark">
                  {home.goldenEssenceSection.signature}
                </p>
              </div>

              <div className="w-20 h-[1.5px] bg-gold" />

              <p className="font-serif text-xl sm:text-2xl text-wine-dark leading-relaxed">
                {home.goldenEssenceSection.description}
              </p>

              <p className="text-base text-graphite leading-relaxed">
                {home.goldenEssenceSection.secondParagraph}
              </p>

              {/* Protocol Pills Preview in Rich Wine */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {db.goldenEssenceProtocols
                  .filter((p) => p.published)
                  .slice(0, 3)
                  .map((protocol, idx) => (
                    <Link
                      key={protocol.id}
                      href={`/golden-essence#${protocol.slug}`}
                      className="group p-4 rounded-2xl bg-wine text-champagne border border-gold/45 hover:bg-wine-light hover:-translate-y-1 transition-all duration-300 shadow-md"
                    >
                      <span className="text-[10px] uppercase tracking-[0.22em] text-gold block">
                        Protocolo 0{idx + 1}
                      </span>
                      <span className="font-serif text-lg text-champagne font-medium group-hover:text-offwhite block mt-1">
                        {protocol.technicalCategory}
                      </span>
                    </Link>
                  ))}
              </div>

              <div className="pt-4">
                <Link
                  href={home.goldenEssenceSection.ctaLink}
                  className="btn-wine group"
                >
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span>{home.goldenEssenceSection.ctaText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3: PROCEDIMENTOS (Fundo Vinho Profundo com Cards Champagne) */}
      <section className="py-20 lg:py-28 bg-wine text-champagne border-b border-gold/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gold/35 pb-8">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs uppercase tracking-[0.24em] text-gold font-medium">
                {home.proceduresSection.eyebrow}
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-champagne font-normal">
                {home.proceduresSection.title}
              </h2>
              <p className="text-base text-champagne/80 leading-relaxed">
                {home.proceduresSection.description}
              </p>
            </div>
            <Link
              href="/procedimentos"
              className="btn-champagne-glow shrink-0 self-start md:self-auto group"
            >
              <span>{home.proceduresSection.ctaText}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </ScrollReveal>

          {/* Procedures Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
            {publishedProcedures.map((proc, index) => (
              <ScrollReveal key={proc.id} delayMs={index * 110}>
                <article className="group h-full bg-champagne-light text-graphite rounded-2xl border border-gold/50 overflow-hidden editorial-card-hover flex flex-col justify-between">
                  <div>
                    <div className="relative h-60 overflow-hidden bg-wine-dark">
                      <img
                        src={proc.imageUrl}
                        alt={proc.imageAlt}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-wine-dark/60 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 bg-wine/95 text-champagne px-3 py-1 rounded-full border border-gold/40">
                        <span className="text-[10px] uppercase tracking-[0.16em] font-medium">
                          {proc.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <h3 className="font-serif text-2xl text-wine font-medium leading-snug group-hover:text-wine-light transition-colors">
                        {proc.name}
                      </h3>
                      <p className="text-sm text-graphite-muted leading-relaxed line-clamp-4">
                        {proc.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-3 border-t border-gold/25">
                    <Link
                      href={`/procedimentos/${proc.slug}`}
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-wine font-medium group-hover:gap-3 transition-all"
                    >
                      <span>Saiba mais</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gold" />
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 4: THE BEAUTY EDIT (Fundo Champagne Quente com Cards Vinho/Champagne) */}
      <section className="py-20 lg:py-28 bg-champagne/80 border-b border-gold/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Editorial Header */}
          <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-wine/20 pb-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-wine font-medium">
                <BookOpen className="w-3.5 h-3.5 text-gold-dark" />
                <span>{home.beautyEditSection.eyebrow}</span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl text-wine font-normal">
                {home.beautyEditSection.title}
              </h2>
              <p className="text-base text-graphite leading-relaxed">
                {home.beautyEditSection.description}
              </p>
            </div>

            <Link
              href="/the-beauty-edit"
              className="btn-wine shrink-0 self-start md:self-auto group"
            >
              <span>{home.beautyEditSection.ctaText}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </ScrollReveal>

          {/* Categories Pill Bar */}
          <ScrollReveal className="flex flex-wrap items-center gap-2.5">
            {db.articleCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/the-beauty-edit?categoria=${cat.slug}`}
                className="px-4 py-2 rounded-full bg-wine/10 border border-wine/30 text-xs uppercase tracking-[0.15em] text-wine font-medium hover:bg-wine hover:text-champagne hover:-translate-y-0.5 transition-all duration-300"
              >
                {cat.name}
              </Link>
            ))}
          </ScrollReveal>

          {/* Articles Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentArticles.map((article, idx) => (
              <ScrollReveal key={article.id} delayMs={idx * 120}>
                <article className="group h-full bg-wine-dark text-champagne rounded-2xl border border-gold/45 overflow-hidden editorial-card-hover flex flex-col justify-between">
                  <div>
                    <Link
                      href={`/the-beauty-edit/${article.slug}`}
                      className="block relative h-60 overflow-hidden bg-wine"
                    >
                      <img
                        src={article.coverImageUrl}
                        alt={article.coverImageAlt}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-wine-dark via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 bg-champagne text-wine px-3.5 py-1 rounded-full border border-gold">
                        <span className="text-[10px] uppercase tracking-[0.18em] font-semibold">
                          {getCategoryName(article.categorySlug)}
                        </span>
                      </div>
                    </Link>

                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-3 text-xs text-champagne/70">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-gold" />
                          {article.readingTimeMinutes} min de leitura
                        </span>
                        <span>•</span>
                        <span>
                          {new Date(article.publishedAt).toLocaleDateString(
                            "pt-BR",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>

                      <Link href={`/the-beauty-edit/${article.slug}`}>
                        <h3 className="font-serif text-2xl text-champagne font-medium leading-snug group-hover:text-gold-light transition-colors">
                          {article.title}
                        </h3>
                      </Link>

                      <p className="text-sm text-champagne/80 leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-3 border-t border-gold/25">
                    <Link
                      href={`/the-beauty-edit/${article.slug}`}
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-gold-light font-medium group-hover:gap-3 transition-all"
                    >
                      <span>Ler artigo completo</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gold" />
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 5: SOBRE GABRIELA (Atmosfera Champagne & Moldura Vinho) */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-champagne-light to-champagne border-b border-gold/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <ScrollReveal direction="left" className="lg:col-span-5">
              <div className="group relative max-w-sm mx-auto">
                <div className="absolute -inset-3 rounded-[26px] bg-wine/15 border border-wine/40 -rotate-2 group-hover:rotate-0 transition-transform duration-500 pointer-events-none" />
                <div className="relative rounded-[22px] overflow-hidden aspect-[4/5] shadow-2xl bg-wine border border-gold/50">
                  <img
                    src={home.aboutSection.imageUrl}
                    alt={home.aboutSection.imageAlt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal
              direction="right"
              delayMs={120}
              className="lg:col-span-7 space-y-6"
            >
              <span className="inline-block px-3.5 py-1 rounded-full bg-wine text-champagne text-xs uppercase tracking-[0.22em] font-medium">
                {home.aboutSection.eyebrow}
              </span>

              <h2 className="font-serif text-4xl sm:text-5xl text-wine font-normal">
                {home.aboutSection.title}
              </h2>

              <div className="space-y-4 text-base sm:text-lg text-graphite leading-relaxed">
                {home.aboutSection.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-wine font-medium">
                <div className="flex items-center gap-2.5 bg-champagne p-3.5 rounded-xl border border-gold/40">
                  <CheckCircle2 className="w-4 h-4 text-wine shrink-0" />
                  <span>Comunicação descomplicada e acolhedora</span>
                </div>
                <div className="flex items-center gap-2.5 bg-champagne p-3.5 rounded-xl border border-gold/40">
                  <CheckCircle2 className="w-4 h-4 text-wine shrink-0" />
                  <span>Protocolos pautados em evidências</span>
                </div>
              </div>

              <div className="pt-3">
                <Link
                  href={home.aboutSection.ctaLink}
                  className="btn-wine group"
                >
                  <span>{home.aboutSection.ctaText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SEÇÃO 6: CHAMADA PARA CONTATO (Vinho Intenso) */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-wine-dark via-wine to-wine-light text-champagne relative overflow-hidden">
        <ScrollReveal className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <span className="inline-block text-xs uppercase tracking-[0.25em] text-gold">
            {home.contactBanner.eyebrow}
          </span>

          <h2 className="font-serif text-4xl sm:text-5xl text-champagne font-normal leading-tight">
            {home.contactBanner.title}
          </h2>

          <p className="text-base sm:text-lg text-champagne/85 max-w-2xl mx-auto leading-relaxed">
            {home.contactBanner.description}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-champagne-glow"
            >
              <MessageCircle className="w-4 h-4 text-wine" />
              <span>Conversar pelo WhatsApp</span>
            </a>

            <Link href="/contato" className="btn-gold-subtle group">
              <span>{home.contactBanner.ctaText}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
