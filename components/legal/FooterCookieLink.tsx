"use client";

const linkClass =
  "text-[15px] font-bold tracking-tight text-neutral-950 transition-opacity hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950/25 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-100";

export function FooterCookieLink() {
  return (
    <li>
      <button
        type="button"
        className={linkClass}
        onClick={() => {
          try {
            window.dispatchEvent(new CustomEvent("zoveto-open-cookie-settings"));
          } catch {
            /* ignore */
          }
        }}
      >
        Cookie settings
      </button>
    </li>
  );
}
