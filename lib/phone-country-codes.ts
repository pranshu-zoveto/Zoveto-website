/** Dial codes for marketing lead forms — India first (primary audience). */
export type PhoneCountryOption = {
  code: string;
  dial: string;
  label: string;
};

export const DEFAULT_PHONE_DIAL_CODE = "+91";

export const PHONE_COUNTRY_OPTIONS: readonly PhoneCountryOption[] = [
  { code: "IN", dial: "+91", label: "India" },
  { code: "US", dial: "+1", label: "US / Canada" },
  { code: "GB", dial: "+44", label: "United Kingdom" },
  { code: "AE", dial: "+971", label: "UAE" },
  { code: "SG", dial: "+65", label: "Singapore" },
  { code: "AU", dial: "+61", label: "Australia" },
  { code: "DE", dial: "+49", label: "Germany" },
  { code: "FR", dial: "+33", label: "France" },
  { code: "SA", dial: "+966", label: "Saudi Arabia" },
  { code: "MY", dial: "+60", label: "Malaysia" },
  { code: "BD", dial: "+880", label: "Bangladesh" },
  { code: "LK", dial: "+94", label: "Sri Lanka" },
  { code: "NP", dial: "+977", label: "Nepal" },
  { code: "QA", dial: "+974", label: "Qatar" },
  { code: "OM", dial: "+968", label: "Oman" },
  { code: "KW", dial: "+965", label: "Kuwait" },
  { code: "BH", dial: "+973", label: "Bahrain" },
] as const;

/** Strip to digits for the local part of the number. */
export function normalizeNationalPhoneDigits(input: string): string {
  return input.replace(/\D/g, "");
}

/** Combine dial code and local digits into one stored value (e.g. "+91 9876543210"). */
export function formatPhoneWithDialCode(dialCode: string, nationalDigits: string): string {
  const digits = normalizeNationalPhoneDigits(nationalDigits);
  if (!digits) return "";
  return `${dialCode} ${digits}`;
}

export function splitPhoneValue(
  value: string,
  defaultDial: string = DEFAULT_PHONE_DIAL_CODE,
): { dial: string; national: string } {
  const trimmed = value.trim();
  if (!trimmed) {
    return { dial: defaultDial, national: "" };
  }

  const sorted = [...PHONE_COUNTRY_OPTIONS].sort((a, b) => b.dial.length - a.dial.length);
  for (const country of sorted) {
    if (trimmed.startsWith(country.dial)) {
      return {
        dial: country.dial,
        national: normalizeNationalPhoneDigits(trimmed.slice(country.dial.length)),
      };
    }
  }

  if (trimmed.startsWith("+")) {
    return { dial: defaultDial, national: normalizeNationalPhoneDigits(trimmed) };
  }

  return { dial: defaultDial, national: normalizeNationalPhoneDigits(trimmed) };
}

export function isKnownDialCode(dial: string): boolean {
  return PHONE_COUNTRY_OPTIONS.some((c) => c.dial === dial);
}

export function getPhoneCountryByDial(dial: string): PhoneCountryOption | undefined {
  return PHONE_COUNTRY_OPTIONS.find((c) => c.dial === dial);
}

/** ISO 3166-1 alpha-2 to flag emoji (e.g. IN → 🇮🇳). */
export function countryFlagEmoji(isoCode: string): string {
  const code = isoCode.toUpperCase();
  if (code.length !== 2) return "";
  return String.fromCodePoint(...[...code].map((char) => 0x1f1e6 - 65 + char.charCodeAt(0)));
}
