/** Mirrors CSS variables in `app/globals.css` for JS usage (charts, canvas, etc.). */
export const tokens = {
  colors: {
    background: "#F5F5F7",
    card: "#FFFFFF",
    border: "#D2D2D7",
    foreground: "#1D1D1F",
    muted: "#6E6E73",
    muted2: "#86868B",
    blue: "#0071E3",
    blueHover: "#0077ED",
    blueLight: "#FBFBFD",
    teal: "#0077ED",
  },
  fonts: {
    sans: "'Inter', system-ui, sans-serif",
  },
  spacing: {
    section: "5.5rem 1.5rem",
    sectionMobile: "3.5rem 1.25rem",
  },
} as const;
