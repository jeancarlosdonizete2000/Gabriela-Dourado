"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Instagram, MessageCircle, MapPin, Sparkles, Lock } from "lucide-react";
import { SiteSettings } from "@/lib/types";
import { buildWhatsAppUrl } from "@/lib/utils";

interface FooterProps {
  settings: SiteSettings;
}

export function Footer({ settings }: FooterProps) {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const whatsappHref = buildWhatsAppUrl(
    settings.whatsappNumber,
    undefined,
    settings.whatsappDefaultMessage
  );

  return (
    <footer className="bg-graphite text-offwhite border-t border-gold/30">
      {/* Subtle Top Line */}
      <div className="editorial-divider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-gold/20">
          {/* Column 1: Brand & Concept */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <Link
                href="/"
                className="font-serif text-3xl tracking-wide text-champagne block"
              >
                {settings.brandName}
              </Link>
              <p className="text-xs uppercase tracking-[0.22em] text-gold mt-1">
                {settings.slogan}
              </p>
            </div>

            <p className="text-sm text-offwhite/80 leading-relaxed max-w-sm">
              Ciência, cuidado e individualidade em cada detalhe da sua pele. Um
              espaço digital pensado para descomplicar a estética e valorizar a
              sua beleza natural.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-wine hover:bg-wine-light text-offwhite px-4 py-2.5 rounded-full text-xs tracking-wider uppercase transition-colors border border-gold/30"
              >
                <MessageCircle className="w-3.5 h-3.5 text-gold" />
                <span>WhatsApp</span>
              </a>

              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-offwhite/5 hover:bg-offwhite/10 text-champagne px-4 py-2.5 rounded-full text-xs tracking-wider uppercase transition-colors border border-gold/25"
              >
                <Instagram className="w-3.5 h-3.5 text-gold" />
                <span>{settings.instagramHandle}</span>
              </a>
            </div>
          </div>

          {/* Column 2: Menu Resumido */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-sans uppercase tracking-[0.2em] text-gold">
              Navegação
            </h3>
            <ul className="space-y-2.5 text-sm text-offwhite/80">
              <li>
                <Link
                  href="/"
                  className="hover:text-champagne transition-colors"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/golden-essence"
                  className="hover:text-champagne transition-colors inline-flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  <span>Golden Essence</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/procedimentos"
                  className="hover:text-champagne transition-colors"
                >
                  Procedimentos
                </Link>
              </li>
              <li>
                <Link
                  href="/the-beauty-edit"
                  className="hover:text-champagne transition-colors"
                >
                  The Beauty Edit (Revista)
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre"
                  className="hover:text-champagne transition-colors"
                >
                  Sobre Gabriela
                </Link>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="hover:text-champagne transition-colors"
                >
                  Contato & Avaliação
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Informações Profissionais & Local */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-sans uppercase tracking-[0.2em] text-gold">
              Informações Profissionais
            </h3>
            <div className="space-y-2.5 text-sm text-offwhite/80">
              <p className="font-medium text-champagne">{settings.brandName}</p>
              <p className="text-xs text-offwhite/70">{settings.crbm}</p>
              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="text-offwhite/90">{settings.location}</p>
                  <p className="text-xs text-offwhite/65 mt-0.5">
                    {settings.addressDetails}
                  </p>
                </div>
              </div>
              <p className="text-xs text-offwhite/65 pt-1">
                {settings.businessHours}
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-offwhite/5 border border-gold/20 text-xs text-offwhite/70 leading-relaxed">
              Todos os conteúdos deste site têm caráter informativo e educativo.
              A indicação de qualquer protocolo ou procedimento depende de
              avaliação presencial e individualizada.
            </div>
          </div>
        </div>

        {/* Bottom Legal & Admin Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-offwhite/60">
          <p>
            © {new Date().getFullYear()} {settings.brandName} •{" "}
            {settings.subBrandName}. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <Link
              href="/privacidade"
              className="hover:text-champagne transition-colors"
            >
              Política de Privacidade
            </Link>
            <Link
              href="/cookies"
              className="hover:text-champagne transition-colors"
            >
              Política de Cookies
            </Link>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 text-gold/80 hover:text-gold transition-colors"
            >
              <Lock className="w-3 h-3" />
              <span>Painel Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
