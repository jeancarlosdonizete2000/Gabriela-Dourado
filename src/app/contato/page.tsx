import React from "react";
import type { Metadata } from "next";
import {
  MessageCircle,
  Instagram,
  MapPin,
  Clock,
  Sparkles,
  Mail,
} from "lucide-react";
import { getDatabase, buildWhatsAppUrl } from "@/lib/db";
import { ContactForm } from "@/components/ContactForm";
import { ScrollReveal } from "@/components/ScrollReveal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contato & Agendamento | Vamos conversar sobre a sua pele",
  description:
    "Entre em contato com Gabriela Dourado pelo WhatsApp, Instagram ou formulário para tirar dúvidas e agendar sua avaliação cutânea individualizada.",
};

export default async function ContactPage() {
  const db = await getDatabase();
  const { settings } = db;

  const whatsappHref = buildWhatsAppUrl(
    settings.whatsappNumber,
    undefined,
    settings.whatsappDefaultMessage
  );

  return (
    <div className="bg-champagne">
      {/* Header em Fundo Vinho */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-wine-dark via-wine to-[#331320] text-champagne border-b border-gold/45">
        <ScrollReveal className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-wine-light border border-gold/50">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="text-xs uppercase tracking-[0.22em] text-champagne font-medium">
              Contato & Avaliação
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-champagne font-normal">
            Está pensando em cuidar melhor da sua pele?
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-gold-light italic">
            Vamos conversar sobre o que faz sentido para você.
          </p>

          <p className="text-base text-champagne/85 max-w-2xl mx-auto leading-relaxed">
            Se você quer agendar uma avaliação, tirar alguma dúvida sobre os
            protocolos <em>Golden Essence</em> ou entender qual procedimento é o
            mais indicado para o seu momento atual, escolha abaixo o canal mais
            confortável para você.
          </p>
        </ScrollReveal>
      </section>

      {/* Main Grid: Direct Channels + Optional Form */}
      <section className="py-16 lg:py-24 bg-champagne-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: WhatsApp Highlight & Info */}
            <ScrollReveal direction="left" className="lg:col-span-6 space-y-6">
              {/* Primary WhatsApp Card */}
              <div className="p-8 sm:p-10 rounded-3xl bg-wine text-champagne space-y-6 shadow-2xl border border-gold/50">
                <span className="inline-block text-xs uppercase tracking-[0.22em] text-gold">
                  Canal Principal • Resposta Rápida
                </span>

                <h2 className="font-serif text-3xl sm:text-4xl text-champagne font-normal leading-snug">
                  Agendamento e dúvidas direto pelo WhatsApp
                </h2>

                <p className="text-sm sm:text-base text-champagne/85 leading-relaxed">
                  Ao clicar no botão abaixo, uma conversa será iniciada no seu
                  WhatsApp já com uma mensagem pronta para facilitar o seu
                  primeiro contato:
                </p>

                <blockquote className="p-4 rounded-2xl bg-wine-dark/80 border border-gold/40 text-xs sm:text-sm text-gold-light italic">
                  “{settings.whatsappDefaultMessage}”
                </blockquote>

                <div className="pt-2">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-champagne-glow justify-center"
                  >
                    <MessageCircle className="w-5 h-5 text-wine" />
                    <span>Abrir conversa no WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Instagram, Location & Hours Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 rounded-2xl bg-wine-dark text-champagne border border-gold/45 editorial-card-hover space-y-2"
                >
                  <Instagram className="w-5 h-5 text-gold" />
                  <h3 className="font-serif text-xl text-champagne font-medium">
                    Instagram
                  </h3>
                  <p className="text-sm text-gold-light font-medium">
                    {settings.instagramHandle}
                  </p>
                  <p className="text-xs text-champagne/75">
                    Acompanhe bastidores, dicas diárias de skincare e novidades.
                  </p>
                </a>

                <div className="p-6 rounded-2xl bg-wine-dark text-champagne border border-gold/45 space-y-2 shadow-lg">
                  <Mail className="w-5 h-5 text-gold" />
                  <h3 className="font-serif text-xl text-champagne font-medium">
                    E-mail
                  </h3>
                  <p className="text-sm text-gold-light break-all">
                    {settings.email}
                  </p>
                  <p className="text-xs text-champagne/75">
                    Para parcerias, convites e contato institucional.
                  </p>
                </div>
              </div>

              <div className="p-7 rounded-2xl bg-champagne border border-gold/50 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-wine shrink-0 mt-1" />
                  <div>
                    <h3 className="font-serif text-xl text-wine font-medium">
                      Local de Atendimento • {settings.location}
                    </h3>
                    <p className="text-sm text-graphite mt-1 leading-relaxed">
                      {settings.addressDetails}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-gold/35">
                  <Clock className="w-5 h-5 text-wine shrink-0 mt-1" />
                  <div>
                    <h3 className="font-serif text-xl text-wine font-medium">
                      Horários de Atendimento
                    </h3>
                    <p className="text-sm text-graphite mt-1">
                      {settings.businessHours}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Column: Optional Contact Form */}
            <ScrollReveal
              direction="right"
              delayMs={120}
              className="lg:col-span-6 bg-champagne p-8 sm:p-10 rounded-3xl border border-gold/55 shadow-2xl space-y-6"
            >
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.2em] text-wine font-medium">
                  Formulário Opcional
                </span>
                <h2 className="font-serif text-3xl text-wine font-normal">
                  Ou deixe um recado por aqui
                </h2>
                <p className="text-sm text-graphite">
                  Sua mensagem vai direto para o nosso painel e responderemos
                  pelo seu WhatsApp ou e-mail.
                </p>
              </div>

              <ContactForm />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
