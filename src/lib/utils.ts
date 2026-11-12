export function buildWhatsAppUrl(
  phone: string,
  customMessage?: string,
  defaultMessage?: string
): string {
  const cleanPhone = phone.replace(/\D/g, "");
  const message =
    customMessage ||
    defaultMessage ||
    "Olá! Conheci seu trabalho pelo site e gostaria de saber um pouquinho mais sobre os procedimentos.";
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
