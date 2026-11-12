import React, { Suspense } from "react";
import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { getDatabase } from "@/lib/db";
import { BeautyEditClient } from "@/components/BeautyEditClient";
import { ScrollReveal } from "@/components/ScrollReveal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The Beauty Edit | Revista Digital de Beleza & Ciência da Pele",
  description:
    "Um espaço para conversar sobre pele, beleza e tudo o que existe por trás delas. Artigos, curiosidades científicas, rotina de skincare e tendências por Gabriela Dourado.",
};

export default async function TheBeautyEditPage() {
  const db = await getDatabase();
  const publishedArticles = db.articles
    .filter((a) => a.status === "published")
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  return (
    <div className="bg-champagne">
      {/* Magazine Masthead em Vinho Profundo */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-wine-dark via-wine to-[#331320] text-champagne border-b border-gold/45">
        <ScrollReveal className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-wine-light border border-gold/50">
            <BookOpen className="w-3.5 h-3.5 text-gold" />
            <span className="text-xs uppercase tracking-[0.22em] text-champagne font-medium">
              Revista Digital por Gabriela Dourado
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-champagne font-normal tracking-tight">
            The Beauty Edit
          </h1>

          <div className="w-24 h-[1.5px] bg-gold mx-auto" />

          <div className="space-y-2 text-base sm:text-lg text-champagne/85 max-w-2xl mx-auto leading-relaxed">
            <p className="font-serif text-2xl text-gold-light italic">
              “Um espaço para conversar sobre pele, beleza e tudo o que existe
              por trás delas.”
            </p>
            <p>
              Aqui você encontra informações, curiosidades, descobertas e
              novidades sobre o universo da estética. Sem complicação, mas
              sempre com ciência.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-20 bg-champagne-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense
            fallback={
              <div className="py-12 text-center text-sm text-wine">
                Carregando edições do The Beauty Edit...
              </div>
            }
          >
            <BeautyEditClient
              articles={publishedArticles}
              categories={db.articleCategories}
            />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
