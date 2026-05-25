"use client";

import { useEffect } from "react";
import Link from "next/link";
import { trackMarketingEvent } from "@/lib/tracking";

export default function NotFound() {
  useEffect(() => {
    trackMarketingEvent("404_error", {
      page_path: window.location.pathname,
    });
  }, []);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-black text-center">
      <h1 className="text-4xl font-bold tracking-tight text-white">404</h1>
      <p className="mt-4 text-zinc-400">This page could not be found.</p>
      <Link href="/" className="mt-8 rounded-full bg-white px-6 py-2 text-sm font-medium text-black hover:bg-zinc-200">
        Return Home
      </Link>
    </div>
  );
}
