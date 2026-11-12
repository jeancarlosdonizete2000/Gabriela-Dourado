import type { Metadata } from "next";
import "./globals.css";
import { getDatabase } from "@/lib/db";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingControls } from "@/components/FloatingControls";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const db = await getDatabase();
  return {
    title: {
      default: `${db.settings.brandName} | ${db.settings.slogan}`,
      template: `%s | ${db.settings.brandName}`,
    },
    description:
      "Biomedicina estética, cuidados com a pele, coleção autoral Golden Essence e revista digital The Beauty Edit. Ciência, cuidado e individualidade em cada detalhe da sua pele.",
    keywords: [
      "Gabriela Dourado",
      "Golden Essence",
      "The Beauty Edit",
      "Biomedicina Estética",
      "Limpeza de pele em Uberlândia",
      "Peeling químico",
      "Microagulhamento",
      "Cuidados com a pele",
      "Tratamento de manchas",
      "Acne e cicatrizes de acne",
      "Skincare",
    ],
    openGraph: {
      title: `${db.settings.brandName} — ${db.settings.slogan}`,
      description:
        "Ciência, cuidado e individualidade em cada detalhe da sua pele. Conheça os procedimentos, a coleção Golden Essence e a revista digital The Beauty Edit.",
      locale: "pt_BR",
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const db = await getDatabase();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: db.settings.brandName,
    alternateName: db.settings.subBrandName,
    slogan: db.settings.slogan,
    description:
      "Biomedicina Estética, protocolos de cuidados com a pele Golden Essence e educação científica em beleza.",
    address: {
      "@type": "PostalAddress",
      addressLocality: db.settings.location,
      addressCountry: "BR",
    },
  };

  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-champagne text-graphite min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar settings={db.settings} />
        <main className="flex-1">{children}</main>
        <Footer settings={db.settings} />
        <FloatingControls settings={db.settings} />
      </body>
    </html>
  );
}
