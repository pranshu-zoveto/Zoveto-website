"use client";

/**
 * TimeRangeTabs — client component for the Today / 7d / 30d switcher.
 * Uses URLSearchParams so the server page can re-render with the correct range.
 */

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";

const RANGES = [
  { label: "Today", value: "today" },
  { label: "7 days", value: "7d" },
  { label: "30 days", value: "30d" },
] as const;

type Range = (typeof RANGES)[number]["value"];

interface Props {
  current: Range;
}

export function TimeRangeTabs({ current }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function select(value: Range) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("range", value);
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className="flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900/60 p-1">
      {RANGES.map((r) => (
        <button
          key={r.value}
          onClick={() => select(r.value)}
          disabled={isPending}
          className={[
            "rounded-md px-3 py-1.5 text-xs font-medium transition-all",
            current === r.value
              ? "bg-zinc-700 text-zinc-100 shadow-sm"
              : "text-zinc-500 hover:text-zinc-300",
            isPending ? "opacity-50 cursor-not-allowed" : "",
          ].join(" ")}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}
