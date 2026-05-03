"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Cursor = dynamic(() => import("@/components/ui/cursor"), { ssr: false });

/**
 * Custom cursor chunk is desktop-only (fine pointer + hover). Touch / mobile never download it.
 */
export function DeferredCursor() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1025px) and (hover: hover) and (pointer: fine)");
    const sync = () => setShow(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (!show) return null;
  return <Cursor />;
}
