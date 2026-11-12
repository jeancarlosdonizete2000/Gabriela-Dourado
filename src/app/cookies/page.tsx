import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Política de Cookies | Gabriela Dourado",
  description:
    "Entenda como utilizamos cookies para melhorar sua experiência de leitura e navegação no site Gabriela Dourado.",
};

export default function CookiesPolicyPage() {
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
            <span>Transparência Digital</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-wine font-normal">
            Política de Cookies
          </h1>
          <p className="text-sm text-graphite-muted">
            Explicada de forma simples, como tudo por aqui.
          </p>
        </div>

        <div className="space-y-8 text-sm sm:text-base text-graphite leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-wine font-medium">
              O que são cookies?
            </h2>
            <p>
              Cookies são pequenos arquivos salvos no seu navegador que ajudam o
              site a lembrar das suas preferências (como saber que você já
              fechou o aviso de privacidade na parte inferior da tela).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-wine font-medium">
              Quais tipos de cookies utilizamos?
            </h2>
            <ul className="list-disc list-inside space-y-2 text-graphite-muted">
              <li>
                <strong>Cookies Essenciais:</strong> Necessários para o
                funcionamento técnico das páginas, segurança do painel e
                registro do seu consentimento LGPD.
              </li>
              <li>
                <strong>Cookies Analíticos (Opcionais):</strong> Ajudam a
                entender, de forma agregada e anônima, quais artigos do{" "}
                <em>The Beauty Edit</em> e páginas de procedimentos são mais
                visitados.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
