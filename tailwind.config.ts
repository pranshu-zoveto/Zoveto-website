import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
        display: [
          "var(--font-inter)",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          '"SF Mono"',
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      fontSize: {
        // Body scale (15px base matches Apple's text-body baseline)
        "body-xs": ["0.75rem", { lineHeight: "1.5", letterSpacing: "0", fontWeight: "400" }],
        "body-sm": ["0.8125rem", { lineHeight: "1.55", letterSpacing: "0", fontWeight: "400" }],
        "body-base": ["0.9375rem", { lineHeight: "1.6", letterSpacing: "0", fontWeight: "400" }],
        "body-md": ["1rem", { lineHeight: "1.6", letterSpacing: "0", fontWeight: "400" }],
        "body-lg": ["1.0625rem", { lineHeight: "1.65", letterSpacing: "0", fontWeight: "400" }],
        "body-xl": ["1.125rem", { lineHeight: "1.65", letterSpacing: "0", fontWeight: "400" }],
        // Heading scale
        "heading-xs": ["1rem", { lineHeight: "1.4", letterSpacing: "-0.01em", fontWeight: "600" }],
        "heading-sm": ["1.125rem", { lineHeight: "1.35", letterSpacing: "-0.01em", fontWeight: "600" }],
        "heading-md": ["1.25rem", { lineHeight: "1.3", letterSpacing: "-0.015em", fontWeight: "600" }],
        "heading-lg": ["1.5rem", { lineHeight: "1.25", letterSpacing: "-0.02em", fontWeight: "600" }],
        "heading-xl": ["1.75rem", { lineHeight: "1.2", letterSpacing: "-0.025em", fontWeight: "600" }],
        "heading-2xl": ["2rem", { lineHeight: "1.15", letterSpacing: "-0.03em", fontWeight: "600" }],
        // Display scale (hero, section headlines)
        "display-sm": ["2.25rem", { lineHeight: "1.1", letterSpacing: "-0.035em", fontWeight: "600" }],
        "display-md": ["2.75rem", { lineHeight: "1.08", letterSpacing: "-0.04em", fontWeight: "600" }],
        "display-lg": ["3.5rem", { lineHeight: "1.05", letterSpacing: "-0.04em", fontWeight: "600" }],
        "display-xl": ["4.5rem", { lineHeight: "1.02", letterSpacing: "-0.045em", fontWeight: "600" }],
        // UI scale (labels, badges, captions, nav)
        "ui-xs": ["0.6875rem", { lineHeight: "1", letterSpacing: "0.04em", fontWeight: "500" }],
        "ui-sm": ["0.75rem", { lineHeight: "1.2", letterSpacing: "0.02em", fontWeight: "500" }],
        "ui-base": ["0.8125rem", { lineHeight: "1.2", letterSpacing: "0.01em", fontWeight: "500" }],
        "ui-md": ["0.875rem", { lineHeight: "1.25", letterSpacing: "0", fontWeight: "500" }],
      },
      letterSpacing: {
        // Display + heading tightenings (Apple optical scale)
        display: "-0.04em",
        heading: "-0.02em",
        // UI/label slight expansion for small uppercase labels
        ui: "0.01em",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        blue: {
          DEFAULT: "var(--blue)",
          hover: "var(--blue-hover)",
          light: "var(--blue-light)",
          dim: "var(--blue-dim)",
          glow: "var(--blue-glow)",
        },
        teal: {
          DEFAULT: "var(--teal)",
          dim: "var(--teal-dim)",
        },
        surface: {
          DEFAULT: "var(--surface)",
          2: "var(--surface-2)",
        },
        border: {
          DEFAULT: "var(--border)",
          2: "var(--border-2)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          2: "var(--muted-2)",
        },
        red: "var(--red)",
        amber: "var(--amber)",
        green: "var(--green)",
      },
      spacing: {
        section: "5.5rem",
        "section-mobile": "3.5rem",
      },
      maxWidth: {
        content: "72rem",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
export default config;
