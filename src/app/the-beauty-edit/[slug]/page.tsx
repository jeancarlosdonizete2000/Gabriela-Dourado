import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  BookOpen,
  ExternalLink,
  Sparkles,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { getDatabase, buildWhatsAppUrl } from "@/lib/db";
import { ShareArticleButtons } from "@/components/ShareArticleButtons";
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
  const article = db.articles.find((a) => a.slug === slug);

  if (!article) {
    return { title: "Artigo não encontrado" };
  }

  return {
    title: article.seoTitle || `${article.title} | The Beauty Edit`,
    description: article.seoDescription || article.excerpt,
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const db = await getDatabase();
  const article = db.articles.find(
    (a) => a.slug === slug && a.status === "published"
  );

  if (!article) {
    notFound();
  }

  const category = db.articleCategories.find(
    (c) => c.slug === article.categorySlug
  );

  const relatedArticles = db.articles
    .filter((a) => a.slug !== article.slug && a.status === "published")
    .slice(0, 3);

  const whatsappHref = buildWhatsAppUrl(
    db.settings.whatsappNumber,
    `Olá, Gabriela! Acabei de ler o seu artigo "${article.title}" no The Beauty Edit e gostaria de conversar sobre a minha pele.`,
    db.settings.whatsappDefaultMessage
  );

  return (
    <div className="bg-champagne">
      {/* Article Header em Fundo Vinho */}
      <header className="py-14 lg:py-22 bg-gradient-to-br from-wine-dark via-wine to-[#331320] text-champagne border-b border-gold/45">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/the-beauty-edit"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-gold-light hover:text-champagne transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar ao The Beauty Edit</span>
            </Link>

            {category && (
              <Link
                href={`/the-beauty-edit?categoria=${category.slug}`}
                className="px-4 py-1.5 rounded-full bg-champagne text-wine text-xs uppercase tracking-[0.18em] font-semibold border border-gold"
              >
                {category.name}
              </Link>
            )}
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-champagne font-normal leading-tight">
            {article.title}
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-gold-light italic leading-relaxed">
            {article.subtitle}
          </p>

          {/* Meta Info: Date, Updated Date, Reading Time & Author */}
          <div className="pt-4 border-t border-gold/30 flex flex-wrap items-center justify-between gap-4 text-xs text-champagne/80">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-medium text-gold-light">
                Por {db.settings.brandName}
              </span>
              <span>•</span>
              <span>
                Publicado em{" "}
                {new Date(article.publishedAt).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              {article.updatedAt && (
                <>
                  <span>•</span>
                  <span>
                    Atualizado em{" "}
                    {new Date(article.updatedAt).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </>
              )}
              <span>•</span>
              <span className="inline-flex items-center gap-1 text-gold-light font-medium">
                <Clock className="w-3.5 h-3.5 text-gold" />
                {article.readingTimeMinutes} min de leitura
              </span>
            </div>

            <ShareArticleButtons title={article.title} />
          </div>
        </div>
      </header>

      {/* Cover Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="rounded-3xl overflow-hidden border border-gold/55 shadow-2xl aspect-[16/9] bg-wine-dark">
          <img
            src={article.coverImageUrl}
            alt={article.coverImageAlt}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Article Body */}
      <article className="py-14 lg:py-20 bg-champagne-light mt-8 border-t border-gold/35">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {article.sections.map((section, idx) => (
            <ScrollReveal key={idx} className="space-y-5">
              {section.heading && (
                <h2 className="font-serif text-3xl sm:text-4xl text-wine font-normal pt-2">
                  {section.heading}
                </h2>
              )}

              {section.paragraphs.map((p, pIdx) => (
                <p
                  key={pIdx}
                  className="text-base sm:text-lg text-graphite leading-[1.85]"
                >
                  {p}
                </p>
              ))}

              {section.bulletList && section.bulletList.length > 0 && (
                <ul className="space-y-3 pl-2 py-2">
                  {section.bulletList.map((item, bIdx) => (
                    <li
                      key={bIdx}
                      className="flex items-start gap-3 text-base text-graphite leading-relaxed"
                    >
                      <Sparkles className="w-4 h-4 text-wine shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.highlightBox && (
                <div className="p-6 sm:p-8 rounded-3xl bg-wine text-champagne border border-gold/50 space-y-2 my-6 shadow-xl">
                  <span className="text-xs uppercase tracking-[0.18em] text-gold font-medium block">
                    Nota de Cuidado
                  </span>
                  <h3 className="font-serif text-2xl text-champagne font-medium">
                    {section.highlightBox.title}
                  </h3>
                  <p className="text-sm sm:text-base text-champagne/90 leading-relaxed">
                    {section.highlightBox.text}
                  </p>
                </div>
              )}

              {section.imageUrl && (
                <figure className="my-6 space-y-2">
                  <div className="rounded-2xl overflow-hidden border border-gold/40">
                    <img
                      src={section.imageUrl}
                      alt={section.imageCaption || article.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  {section.imageCaption && (
                    <figcaption className="text-xs text-center text-wine italic">
                      {section.imageCaption}
                    </figcaption>
                  )}
                </figure>
              )}
            </ScrollReveal>
          ))}

          {/* Conclusion */}
          {article.conclusion && (
            <ScrollReveal className="p-7 sm:p-8 rounded-3xl bg-champagne border-l-4 border-wine shadow-md space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-wine font-medium">
                Para guardar com carinho
              </span>
              <p className="font-serif text-xl sm:text-2xl text-wine italic leading-relaxed">
                “{article.conclusion}”
              </p>
            </ScrollReveal>
          )}

          {/* Share Bar */}
          <div className="py-6 border-y border-gold/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-graphite">
              Gostou desse conteúdo? Envie para uma amiga que também gosta de
              cuidar da pele!
            </p>
            <ShareArticleButtons title={article.title} />
          </div>

          {/* Scientific References (10.4) */}
          {article.references && article.references.length > 0 && (
            <ScrollReveal className="p-7 sm:p-8 rounded-3xl bg-champagne border border-gold/45 space-y-4">
              <div className="flex items-center gap-2 text-wine">
                <BookOpen className="w-4 h-4 text-wine" />
                <h3 className="font-serif text-2xl font-medium">
                  Referências Científicas
                </h3>
              </div>
              <p className="text-xs text-graphite">
                Estudos e publicações consultados para construir este conteúdo
                de forma responsável e baseada em evidências:
              </p>
              <ol className="space-y-3 text-xs sm:text-sm text-graphite list-decimal list-inside">
                {article.references.map((ref, rIdx) => (
                  <li key={rIdx} className="leading-relaxed">
                    <span className="font-medium text-wine">{ref.authors}</span>{" "}
                    {ref.title} <em>{ref.journal}</em> ({ref.year}).
                    {ref.doiOrUrl && (
                      <a
                        href={ref.doiOrUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-wine font-medium underline ml-2 hover:text-gold-dark"
                      >
                        <span>Acessar referência</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </li>
                ))}
              </ol>
            </ScrollReveal>
          )}

          {/* Soft WhatsApp Conversation Invite */}
          <ScrollReveal className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-wine-dark via-wine to-wine-light text-champagne border border-gold/50 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="font-serif text-2xl sm:text-3xl text-champagne font-normal">
                Se identificou com esse tema?
              </h3>
              <p className="text-sm text-champagne/85 leading-relaxed max-w-md">
                Está pensando em cuidar melhor da sua pele? Vamos conversar
                sobre o que faz sentido para você.
              </p>
            </div>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 btn-champagne-glow"
            >
              <MessageCircle className="w-4 h-4 text-wine" />
              <span>Conversar com a Gabi</span>
            </a>
          </ScrollReveal>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-champagne border-t border-gold/45">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-3xl text-wine font-normal">
                Continue lendo no The Beauty Edit
              </h2>
              <Link
                href="/the-beauty-edit"
                className="text-xs uppercase tracking-[0.18em] text-wine hover:text-gold-dark inline-flex items-center gap-1.5 font-medium"
              >
                <span>Ver todos</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((rel, i) => (
                <ScrollReveal key={rel.id} delayMs={i * 100}>
                  <Link
                    href={`/the-beauty-edit/${rel.slug}`}
                    className="group block h-full bg-wine text-champagne rounded-2xl border border-gold/45 overflow-hidden editorial-card-hover p-5 space-y-3"
                  >
                    <div className="h-44 rounded-xl overflow-hidden bg-wine-dark">
                      <img
                        src={rel.coverImageUrl}
                        alt={rel.coverImageAlt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-gold block">
                      {rel.readingTimeMinutes} min de leitura
                    </span>
                    <h3 className="font-serif text-xl text-champagne font-medium group-hover:text-gold-light leading-snug">
                      {rel.title}
                    </h3>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
