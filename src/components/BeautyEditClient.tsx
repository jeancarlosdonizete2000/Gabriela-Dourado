"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Clock,
  ArrowRight,
  BookOpen,
  Sparkles,
  X,
} from "lucide-react";
import { Article, ArticleCategory } from "@/lib/types";
import { ScrollReveal } from "./ScrollReveal";

interface BeautyEditClientProps {
  articles: Article[];
  categories: ArticleCategory[];
}

export function BeautyEditClient({
  articles,
  categories,
}: BeautyEditClientProps) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("categoria") || "all";

  const [selectedCategory, setSelectedCategory] =
    useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const getCategory = (slug: string) =>
    categories.find((c) => c.slug === slug);

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchesCategory =
        selectedCategory === "all" || art.categorySlug === selectedCategory;

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        art.title.toLowerCase().includes(q) ||
        art.subtitle.toLowerCase().includes(q) ||
        art.excerpt.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  const featuredArticle = useMemo(() => {
    if (selectedCategory !== "all" || searchQuery.trim() !== "") {
      return null;
    }
    return articles.find((a) => a.featured) || articles[0] || null;
  }, [articles, selectedCategory, searchQuery]);

  const activeCategoryObj =
    selectedCategory !== "all" ? getCategory(selectedCategory) : null;

  return (
    <div className="space-y-16">
      {/* Search & Category Filter Bar in Wine */}
      <ScrollReveal className="bg-wine text-champagne p-6 sm:p-8 rounded-3xl border border-gold/50 shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Categories Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-[0.16em] font-medium transition-all duration-300 ${
                selectedCategory === "all"
                  ? "bg-champagne text-wine shadow-md scale-105"
                  : "bg-wine-dark/70 text-champagne/80 border border-gold/30 hover:bg-wine-light hover:text-champagne"
              }`}
            >
              Todas as edições
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-[0.16em] font-medium transition-all duration-300 ${
                  selectedCategory === cat.slug
                    ? "bg-champagne text-wine shadow-md scale-105"
                    : "bg-wine-dark/70 text-champagne/80 border border-gold/30 hover:bg-wine-light hover:text-champagne"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px] sm:min-w-[320px]">
            <Search className="w-4 h-4 text-gold absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por tema (ex: acne, manchas, peeling)..."
              aria-label="Buscar artigos no The Beauty Edit"
              className="w-full pl-10 pr-9 py-2.5 rounded-full bg-wine-dark/90 border border-gold/45 text-sm text-champagne placeholder:text-champagne/55 focus:outline-none focus:border-champagne"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Limpar busca"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-champagne/70 hover:text-champagne"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Explainer Banner */}
        {activeCategoryObj && (
          <div className="pt-4 border-t border-gold/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">
                Editoria • {activeCategoryObj.name}
              </span>
              <p className="font-serif text-xl text-champagne">
                {activeCategoryObj.tagline}
              </p>
              <p className="text-xs sm:text-sm text-champagne/80 mt-0.5">
                {activeCategoryObj.description}
              </p>
            </div>
          </div>
        )}
      </ScrollReveal>

      {/* Featured Editorial Cover Story */}
      {featuredArticle && (
        <ScrollReveal className="space-y-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-wine font-medium">
            <Sparkles className="w-3.5 h-3.5 text-wine" />
            <span>Destaque Editorial</span>
          </div>

          <article className="group grid grid-cols-1 lg:grid-cols-12 bg-wine-dark text-champagne rounded-[32px] border border-gold/55 overflow-hidden shadow-2xl">
            <Link
              href={`/the-beauty-edit/${featuredArticle.slug}`}
              className="lg:col-span-7 relative min-h-[300px] sm:min-h-[380px] overflow-hidden bg-wine"
            >
              <img
                src={featuredArticle.coverImageUrl}
                alt={featuredArticle.coverImageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wine-dark/70 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 bg-champagne text-wine px-4 py-1.5 rounded-full border border-gold">
                <span className="text-[11px] uppercase tracking-[0.18em] font-semibold">
                  {getCategory(featuredArticle.categorySlug)?.name ||
                    "Beauty Edit"}
                </span>
              </div>
            </Link>

            <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs text-champagne/75">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gold" />
                    {featuredArticle.readingTimeMinutes} min de leitura
                  </span>
                  <span>•</span>
                  <span>
                    {new Date(featuredArticle.publishedAt).toLocaleDateString(
                      "pt-BR",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </span>
                </div>

                <Link href={`/the-beauty-edit/${featuredArticle.slug}`}>
                  <h2 className="font-serif text-3xl sm:text-4xl text-champagne font-normal leading-tight group-hover:text-gold-light transition-colors">
                    {featuredArticle.title}
                  </h2>
                </Link>

                <p className="text-sm sm:text-base text-champagne/85 leading-relaxed">
                  {featuredArticle.subtitle}
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href={`/the-beauty-edit/${featuredArticle.slug}`}
                  className="btn-champagne-glow group"
                >
                  <BookOpen className="w-4 h-4 text-wine" />
                  <span>Ler matéria completa</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </article>
        </ScrollReveal>
      )}

      {/* Articles Grid */}
      <section className="space-y-8">
        <div className="flex items-center justify-between border-b border-wine/25 pb-4">
          <h2 className="font-serif text-2xl sm:text-3xl text-wine font-normal">
            {selectedCategory === "all"
              ? "Artigos & Conversas Recentes"
              : `Publicações em ${activeCategoryObj?.name}`}
          </h2>
          <span className="text-xs text-wine font-medium">
            {filteredArticles.length}{" "}
            {filteredArticles.length === 1 ? "artigo" : "artigos"}
          </span>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 bg-wine text-champagne rounded-3xl border border-gold/45 p-8 space-y-3">
            <p className="font-serif text-2xl text-champagne">
              Nenhum artigo encontrado para essa busca.
            </p>
            <p className="text-sm text-champagne/80">
              Experimente buscar por outra palavra ou selecionar todas as
              editorias acima.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="btn-champagne-glow mt-2"
            >
              Ver todos os artigos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.slice(0, visibleCount).map((article, idx) => (
              <ScrollReveal key={article.id} delayMs={idx * 100}>
                <article className="group h-full bg-wine text-champagne rounded-3xl border border-gold/50 overflow-hidden editorial-card-hover flex flex-col justify-between">
                  <div>
                    <Link
                      href={`/the-beauty-edit/${article.slug}`}
                      className="block relative h-60 overflow-hidden bg-wine-dark"
                    >
                      <img
                        src={article.coverImageUrl}
                        alt={article.coverImageAlt}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-wine-dark/75 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 bg-champagne text-wine px-3 py-1 rounded-full border border-gold">
                        <span className="text-[10px] uppercase tracking-[0.18em] font-semibold">
                          {getCategory(article.categorySlug)?.name ||
                            "Beauty Edit"}
                        </span>
                      </div>
                    </Link>

                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-2.5 text-xs text-champagne/75">
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
                      <span>Continuar lendo</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gold" />
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        )}

        {filteredArticles.length > visibleCount && (
          <div className="text-center pt-6">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="btn-wine"
            >
              Carregar mais artigos
            </button>
          </div>
        )}
      </section>

      {/* Editorial Guide to Categories */}
      <ScrollReveal className="pt-8 border-t border-wine/25 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] text-wine font-medium">
            Nossas Colunas Editoriais
          </span>
          <h3 className="font-serif text-3xl text-wine font-normal">
            Explore por editoria
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setSelectedCategory(cat.slug);
                window.scrollTo({ top: 240, behavior: "smooth" });
              }}
              className="text-left p-5 rounded-2xl bg-wine text-champagne border border-gold/45 hover:bg-wine-light hover:-translate-y-1 transition-all duration-300 space-y-1.5 shadow-md"
            >
              <span className="font-serif text-xl text-champagne font-medium block">
                {cat.name}
              </span>
              <span className="text-xs text-gold font-medium block">
                {cat.tagline}
              </span>
              <p className="text-xs text-champagne/80 leading-relaxed pt-1">
                {cat.description}
              </p>
            </button>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}
