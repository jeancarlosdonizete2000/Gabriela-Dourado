"use client";

import React, { useState } from "react";
import { Share2, Check, MessageCircle } from "lucide-react";

interface ShareArticleButtonsProps {
  title: string;
}

export function ShareArticleButtons({ title }: ShareArticleButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleWhatsAppShare = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = `Olha que artigo interessante da Gabriela Dourado no The Beauty Edit: "${title}" - ${url}`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-xs uppercase tracking-[0.18em] text-gold font-medium">
        Compartilhar leitura:
      </span>
      <button
        type="button"
        onClick={handleWhatsAppShare}
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-champagne/50 hover:bg-champagne text-wine text-xs font-medium border border-gold/30 transition-colors"
      >
        <MessageCircle className="w-3.5 h-3.5 text-wine" />
        <span>Enviar no WhatsApp</span>
      </button>
      <button
        type="button"
        onClick={handleCopyLink}
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-offwhite hover:bg-champagne/40 text-graphite text-xs font-medium border border-gold/30 transition-colors"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-wine" />
            <span>Link copiado!</span>
          </>
        ) : (
          <>
            <Share2 className="w-3.5 h-3.5 text-gold" />
            <span>Copiar link</span>
          </>
        )}
      </button>
    </div>
  );
}
