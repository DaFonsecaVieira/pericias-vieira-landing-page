export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://signasveritas.com.br";
export const SITE_NAME = "Signa Veritas | Perícias Vieira";
export const WHATSAPP_NUMBER = "559281085357";

export const GTAG_CONVERSION_ID = "AW-10995737577/fCy_CJWyzbIbEOnHlvso";
export const FB_PIXEL_ID = "4143499225863205";

export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
