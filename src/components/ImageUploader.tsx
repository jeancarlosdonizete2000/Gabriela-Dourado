"use client";

import React, { useRef, useState } from "react";
import { Upload, Image as ImageIcon, CheckCircle2, Loader2 } from "lucide-react";

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (newImageDataUrl: string) => void;
  helperText?: string;
  aspectRatioClass?: string;
}

export function ImageUploader({
  label,
  value,
  onChange,
  helperText = "Formatos aceitos: JPG, PNG ou WEBP. A imagem é otimizada automaticamente.",
  aspectRatioClass = "aspect-[16/10]",
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [processing, setProcessing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState<string>("");

  const compressAndConvertToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const MAX_WIDTH = 1400;
          const MAX_HEIGHT = 1400;
          let width = img.width;
          let height = img.height;

          if (width > MAX_WIDTH || height > MAX_HEIGHT) {
            const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(event.target?.result as string);
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.85);
          resolve(compressedDataUrl);
        };
        img.onerror = (err) => reject(err);
        img.src = event.target?.result as string;
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const handleFileSelect = async (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Por favor, selecione um arquivo de imagem válido (JPG, PNG, WEBP).");
      return;
    }

    setProcessing(true);
    try {
      const optimizedDataUrl = await compressAndConvertToDataUrl(file);
      setFileName(file.name);
      onChange(optimizedDataUrl);
    } catch (e) {
      console.error("Erro ao processar imagem:", e);
      alert("Não foi possível carregar esta imagem.");
    } finally {
      setProcessing(false);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    await handleFileSelect(file);
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs uppercase tracking-wider text-wine font-medium">
        {label}
      </label>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`p-4 rounded-2xl border-2 border-dashed transition-all ${
          dragOver
            ? "border-wine bg-champagne/60"
            : "border-gold/45 bg-offwhite hover:border-wine/50"
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
          {/* Preview Box */}
          <div className="sm:col-span-5">
            <div
              className={`relative rounded-xl overflow-hidden bg-champagne border border-gold/35 ${aspectRatioClass} flex items-center justify-center`}
            >
              {value ? (
                <img
                  src={value}
                  alt={label}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-4 text-graphite-muted space-y-1">
                  <ImageIcon className="w-6 h-6 mx-auto text-gold" />
                  <span className="text-[11px] block">Sem imagem</span>
                </div>
              )}
            </div>
          </div>

          {/* Upload Controls */}
          <div className="sm:col-span-7 space-y-3">
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileSelect(e.target.files?.[0])}
              className="hidden"
            />

            <div className="space-y-1">
              <p className="text-xs font-medium text-graphite">
                Anexe uma fotografia do seu computador ou celular
              </p>
              <p className="text-[11px] text-graphite-muted leading-relaxed">
                {helperText}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                disabled={processing}
                onClick={() => inputRef.current?.click()}
                className="inline-flex items-center gap-2 bg-wine text-champagne px-4 py-2.5 rounded-full text-xs font-medium tracking-wide hover:bg-wine-light transition-all shadow-sm"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-gold" />
                    <span>Otimizando foto...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-3.5 h-3.5 text-gold" />
                    <span>Escolher foto no dispositivo</span>
                  </>
                )}
              </button>

              {fileName && !processing && (
                <span className="inline-flex items-center gap-1 text-[11px] text-wine font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                  <span>Anexada: {fileName}</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
