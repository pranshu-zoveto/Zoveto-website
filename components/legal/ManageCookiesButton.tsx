"use client";

export function ManageCookiesButton() {
  return (
    <button
      type="button"
      onClick={() => {
        try {
          window.dispatchEvent(new CustomEvent("zoveto-open-cookie-settings"));
        } catch {
          /* ignore */
        }
      }}
      className="fixed bottom-4 right-4 z-[190] rounded-full border border-neutral-300/90 bg-neutral-100/95 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-800 shadow-md backdrop-blur-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950/20"
    >
      Manage cookies
    </button>
  );
}

export default ManageCookiesButton;
