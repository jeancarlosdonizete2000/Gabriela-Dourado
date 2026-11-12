"use client";

import React, { useState, useRef } from "react";
import { Sparkles } from "lucide-react";

interface HeroPortraitProps {
  imageUrl: string;
  imageAlt: string;
  brandName: string;
}

export function HeroPortrait({
  imageUrl,
  imageAlt,
  brandName,
}: HeroPortraitProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = x / rect.width;
    const percentY = y / rect.height;

    const rotateY = (percentX - 0.5) * 10; // -5deg to +5deg
    const rotateX = (0.5 - percentY) * 10; // -5deg to +5deg

    setTilt({
      rotateX,
      rotateY,
      glowX: percentX * 100,
      glowY: percentY * 100,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative mx-auto max-w-md lg:max-w-none group cursor-pointer select-none"
      style={{ perspective: "1200px" }}
    >
      {/* Ambient Wine & Gold Halo behind the image */}
      <div
        className={`absolute -inset-6 rounded-[36px] bg-gradient-to-tr from-gold/30 via-wine-light/40 to-champagne/25 blur-2xl transition-all duration-700 pointer-events-none ${
          isHovered ? "opacity-100 scale-105" : "opacity-60 scale-95"
        }`}
      />

      {/* Double Editorial Gold Frames that shift on hover */}
      <div
        className={`absolute -inset-3.5 border border-gold/50 rounded-[30px] transition-all duration-700 ease-out pointer-events-none ${
          isHovered
            ? "translate-x-4 translate-y-4 border-gold"
            : "translate-x-2.5 translate-y-2.5"
        }`}
      />
      <div
        className={`absolute -inset-2 border border-champagne/30 rounded-[28px] transition-all duration-700 ease-out pointer-events-none ${
          isHovered
            ? "-translate-x-2.5 -translate-y-2.5 border-champagne/60"
            : "-translate-x-1 -translate-y-1"
        }`}
      />

      {/* Floating Top Badge on Hover */}
      <div
        className={`absolute -top-4 right-5 z-20 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-wine text-champagne border border-gold/60 shadow-lg transition-all duration-500 ${
          isHovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-85"
        }`}
      >
        <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
        <span className="text-[10px] uppercase tracking-[0.22em] font-medium">
          A beleza de ser você
        </span>
      </div>

      {/* Main 3D Tilted Portrait Card */}
      <div
        style={{
          transform: isHovered
            ? `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(1.015)`
            : "rotateX(0deg) rotateY(0deg) scale(1)",
          transition: isHovered
            ? "transform 120ms ease-out"
            : "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        className="relative rounded-[26px] overflow-hidden shadow-2xl bg-wine-dark aspect-[4/5] border border-gold/45"
      >
        {/* Portrait Image with slow zoom & warm saturation on hover */}
        <img
          src={imageUrl}
          alt={imageAlt}
          className={`w-full h-full object-cover object-center transition-all duration-1000 ease-out ${
            isHovered ? "scale-110 brightness-105 contrast-[1.03]" : "scale-100"
          }`}
        />

        {/* Interactive Cursor Spotlight Shimmer */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(420px circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(232, 216, 195, 0.24), rgba(177, 138, 80, 0.08) 40%, transparent 70%)`,
          }}
        />

        {/* Diagonal Editorial Light Sweep on Hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-tr from-transparent via-champagne/25 to-transparent -translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none ${
            isHovered ? "translate-x-full" : ""
          }`}
        />

        {/* Rich Wine Gradient Overlay at Bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-wine-dark/90 via-wine/25 to-transparent" />

        {/* Editorial Quote Card inside Portrait */}
        <div
          className={`absolute bottom-5 left-5 right-5 bg-wine/90 backdrop-blur-md p-5 rounded-2xl border border-gold/50 shadow-xl transition-all duration-500 ${
            isHovered ? "-translate-y-1.5 border-gold" : "translate-y-0"
          }`}
        >
          <p className="font-serif text-base sm:text-lg text-champagne italic leading-snug">
            “Cada pele tem sua própria história. E o cuidado deve começar
            entendendo isso.”
          </p>
          <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-gold/30">
            <p className="text-[11px] uppercase tracking-[0.22em] text-gold">
              {brandName}
            </p>
            <span className="text-[10px] uppercase tracking-[0.18em] text-champagne/80">
              Biomedicina Estética
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
