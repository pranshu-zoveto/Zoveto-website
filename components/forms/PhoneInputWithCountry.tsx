"use client";

import React, { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  DEFAULT_PHONE_DIAL_CODE,
  PHONE_COUNTRY_OPTIONS,
  countryFlagEmoji,
  formatPhoneWithDialCode,
  getPhoneCountryByDial,
  splitPhoneValue,
} from "@/lib/phone-country-codes";
import { cn } from "@/lib/utils";

type PhoneInputWithCountryProps = {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  name?: string;
  defaultDialCode?: string;
  className?: string;
  disabled?: boolean;
};

export function PhoneInputWithCountry({
  value,
  onChange,
  id,
  name,
  defaultDialCode = DEFAULT_PHONE_DIAL_CODE,
  className,
  disabled = false,
}: PhoneInputWithCountryProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const countryId = `${inputId}-country`;

  const initial = splitPhoneValue(value, defaultDialCode);
  const [dial, setDial] = useState(initial.dial);
  const [national, setNational] = useState(initial.national);

  const selectedCountry = getPhoneCountryByDial(dial) ?? PHONE_COUNTRY_OPTIONS[0];

  function emit(nextDial: string, nextNational: string) {
    onChange(formatPhoneWithDialCode(nextDial, nextNational));
  }

  return (
    <div
      className={cn(
        "flex min-h-[48px] overflow-hidden rounded-xl border border-border bg-card text-base text-foreground shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition-[border-color,box-shadow] duration-200",
        "focus-within:border-blue focus-within:ring-2 focus-within:ring-blue/15",
        disabled && "pointer-events-none opacity-60",
        className,
      )}
    >
      <div className="relative flex shrink-0 items-center border-r border-border/80 bg-surface-2/90">
        <label htmlFor={countryId} className="sr-only">
          Country code
        </label>

        <div
          className="pointer-events-none flex items-center gap-2 pl-3.5 pr-1"
          aria-hidden
        >
          <span className="text-base leading-none" title={selectedCountry.label}>
            {countryFlagEmoji(selectedCountry.code)}
          </span>
          <span className="text-sm font-semibold tabular-nums tracking-tight text-foreground">
            {selectedCountry.dial}
          </span>
        </div>

        <select
          id={countryId}
          name={name ? `${name}Country` : undefined}
          value={dial}
          disabled={disabled}
          onChange={(e) => {
            const nextDial = e.target.value;
            setDial(nextDial);
            emit(nextDial, national);
          }}
          className="absolute inset-0 z-[1] h-full w-full cursor-pointer appearance-none opacity-0"
          aria-label="Country code"
        >
          {PHONE_COUNTRY_OPTIONS.map((country) => (
            <option key={`${country.code}-${country.dial}`} value={country.dial}>
              {countryFlagEmoji(country.code)} {country.dial} · {country.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={14}
          strokeWidth={2.25}
          className="pointer-events-none mr-2.5 shrink-0 text-muted-2"
          aria-hidden
        />
      </div>

      <input
        id={inputId}
        name={name}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        disabled={disabled}
        value={national}
        onChange={(e) => {
          const nextNational = e.target.value.replace(/[^\d\s-]/g, "");
          setNational(nextNational);
          emit(dial, nextNational);
        }}
        placeholder="98765 43210"
        className="min-w-0 flex-1 border-0 bg-transparent px-4 py-3 text-base text-foreground placeholder:text-muted-2 focus:outline-none"
        aria-label="Phone number"
      />
    </div>
  );
}
