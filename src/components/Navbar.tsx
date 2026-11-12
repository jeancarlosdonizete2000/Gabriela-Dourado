"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles, MessageCircle } from "lucide-react";
import { SiteSettings } from "@/lib/types";
import { buildWhatsAppUrl } from "@/lib/utils";

interface NavbarProps {
  settings: SiteSettings;
}

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/golden-essence", label: "Golden Essence", isSpecial: true },
  { href: "/procedimentos", label: "Procedimentos" },
  { href: "/the-beauty-edit", label: "The Beauty Edit" },
  { href: "/sobre", label: "Sobre Gabriela" },
  { href: "/contato", label: "Contato" },
];

export function Navbar({ settings }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(100, (window.scrollY / totalHeight) * 100));
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const whatsappHref = buildWhatsAppUrl(
    settings.whatsappNumber,
    undefined,
    settings.whatsappDefaultMessage
  );

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-wine-dark/95 backdrop-blur-md shadow-[0_10px_30px_-10px_rgba(36,28,32,0.5)] border-b border-gold/40 py-3.5"
          : "bg-wine/95 backdrop-blur-sm border-b border-gold/30 py-5"
      }`}
    >
      {/* Top Gold Scroll Progress Bar */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-gold-dark via-champagne to-gold transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Identity */}
        <Link href="/" className="group flex flex-col">
          <span className="font-serif text-2xl sm:text-3xl tracking-wide text-champagne group-hover:text-offwhite transition-colors font-normal leading-none">
            {settings.brandName}
          </span>
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-gold mt-1 font-sans">
            {settings.slogan}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Menu Principal"
          className="hidden lg:flex items-center space-x-7"
        >
          {navLinks.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm tracking-wide transition-all duration-300 py-1.5 flex items-center gap-1.5 group ${
                  isActive
                    ? "text-champagne font-medium"
                    : "text-champagne/80 hover:text-champagne"
                }`}
              >
                {item.isSpecial && (
                  <Sparkles className="w-3.5 h-3.5 text-gold inline-block group-hover:rotate-12 transition-transform" />
                )}
                <span>{item.label}</span>
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] bg-gold rounded-full transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-champagne-glow !px-5 !py-2.5 !text-xs uppercase !tracking-[0.14em]"
          >
            <MessageCircle className="w-3.5 h-3.5 text-wine" />
            <span>Agendar conversa</span>
          </a>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileMenuOpen}
          className="lg:hidden inline-flex items-center justify-center p-2.5 rounded-full text-champagne hover:bg-wine-light focus:outline-none"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-wine-dark border-b border-gold/40 px-6 pt-4 pb-8 space-y-4">
          <div className="flex flex-col space-y-2">
            {navLinks.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between py-3 px-4 rounded-xl text-base transition-colors ${
                    isActive
                      ? "bg-wine-light text-champagne font-medium border border-gold/30"
                      : "text-champagne/80 hover:bg-wine"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.isSpecial && (
                      <Sparkles className="w-4 h-4 text-gold" />
                    )}
                    {item.label}
                  </span>
                  {item.isSpecial && (
                    <span className="text-[10px] uppercase tracking-widest bg-gold/25 text-champagne px-2.5 py-0.5 rounded-full">
                      Coleção
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-gold/25 flex flex-col gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full btn-champagne-glow justify-center text-center py-3.5"
            >
              <MessageCircle className="w-4 h-4 text-wine" />
              <span>Conversar pelo WhatsApp</span>
            </a>
            <p className="text-center text-xs text-champagne/70">
              Atendimento acolhedor e individualizado • {settings.location}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
