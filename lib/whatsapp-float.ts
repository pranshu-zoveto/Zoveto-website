/**
 * WhatsApp “click to chat” URL for the floating action button.
 * Phone and default message are public marketing values (not secrets).
 */
export const WHATSAPP_FLOAT_PHONE = "919217380146";

const DEFAULT_MESSAGE =
  "Hi Zoveto team, I want to learn about your Company Operating System for my business.";

/** Full deeplink — matches wa.me / api.whatsapp.com prefilled chat behavior. */
export function getWhatsAppFloatHref(): string {
  const params = new URLSearchParams({
    phone: WHATSAPP_FLOAT_PHONE,
    text: DEFAULT_MESSAGE,
    type: "phone_number",
    app_absent: "0",
  });
  return `https://api.whatsapp.com/send/?${params.toString()}`;
}
