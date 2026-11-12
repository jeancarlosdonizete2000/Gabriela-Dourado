"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, ShieldCheck } from "lucide-react";
import { SiteSettings } from "@/lib/types";
import { buildWhatsAppUrl } from "@/lib/utils";

interface FloatingControlsProps {
  settings: SiteSettings;
}

export function FloatingControls({ settings }: FloatingControlsProps) {
  const pathname = usePathname();
  const [cookieConsent, setCookieConsent] = useState<string | null>("accepted");

  useEffect(() => {
    const saved = localStorage.getItem("gd_cookie_consent");
    setCookieConsent(saved);
  }, []);

  const handleAcceptCookies = (level: "all" | "essential") => {
    localStorage.setItem("gd_cookie_consent", level);
    setCookieConsent(level);
  };

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const whatsappHref = buildWhatsAppUrl(
    settings.whatsappNumber,
    undefined,
    settings.whatsappDefaultMessage
  );

  return (
    <>
      {/* Floating WhatsApp Button (Mobile & Desktop friendly) */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar pelo WhatsApp"
        className="fixed bottom-5 right-5 z-40 group flex items-center gap-2.5 bg-wine text-offwhite pl-4 pr-5 py-3 rounded-full shadow-lg border border-gold/40 hover:bg-wine-light transition-all duration-300"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-champagne opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold"></span>
        </span>
        <MessageCircle className="w-4 h-4 text-champagne" />
        <span className="text-xs font-medium tracking-wide">
          Vamos conversar?
        </span>
      </a>

      {/* LGPD Cookie Banner */}
      {!cookieConsent && (
        <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50 bg-offwhite border border-gold/40 rounded-2xl p-5 shadow-editorial">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-wine shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="font-serif text-lg text-wine font-medium">
                Sua privacidade importa por aqui
              </p>
              <p className="text-xs text-graphite-muted leading-relaxed">
                Utilizamos cookies essenciais para o funcionamento do site e
                análises anônimas para entender quais conteúdos do{" "}
                <em>The Beauty Edit</em> você mais gosta de ler. Veja nossa{" "}
                <Link
                  href="/privacidade"
                  className="underline text-wine hover:text-gold"
                >
                  Política de Privacidade
                </Link>{" "}
                e{" "}
                <Link
                  href="/cookies"
                  className="underline text-wine hover:text-gold"
                >
                  Política de Cookies
                </Link>
                .
              </p>
              <div className="pt-2 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => handleAcceptCookies("all")}
                  className="bg-wine text-offwhite text-xs px-4 py-2 rounded-full font-medium hover:bg-wine-light transition-colors"
                >
                  Aceitar e continuar
                </button>
                <button
                  type="button"
                  onClick={() => handleAcceptCookies("essential")}
                  className="border border-wine/30 text-wine text-xs px-3.5 py-2 rounded-full hover:bg-champagne/40 transition-colors"
                >
                  Apenas essenciais
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
