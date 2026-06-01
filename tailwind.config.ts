import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Underground palette
        ink: {
          50: "#f5f1ea",   // dirty paper
          100: "#e8e0d2",
          900: "#0a0908",  // deep black
          950: "#050403",
        },
        rust: {
          400: "#c54a3a",
          500: "#a83a2c",  // red flag / paper red
          600: "#8a2e22",
          700: "#6b1f17",
        },
        acid: {
          400: "#fffc3a",
          500: "#ffe600",  // graffiti highlight
        },
        smoke: {
          400: "#7a7268",
          500: "#5c554d",
          600: "#3d3832",
          700: "#26221e",
          800: "#16140f",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "mega": ["clamp(4rem, 14vw, 14rem)", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        "huge": ["clamp(3rem, 9vw, 8rem)", { lineHeight: "1", letterSpacing: "-0.03em" }],
      },
      backgroundImage: {
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        "grain": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")",
      },
      animation: {
        "scroll-x": "scroll-x 40s linear infinite",
        "flicker": "flicker 3s linear infinite",
        "spray": "spray 0.6s ease-out forwards",
        "shake": "shake 0.5s ease-in-out infinite",
      },
      keyframes: {
        "scroll-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "92%": { opacity: "1" },
          "94%": { opacity: "0.4" },
          "96%": { opacity: "1" },
        },
        spray: {
          "0%": { opacity: "0", transform: "scale(0.6)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shake: {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "25%": { transform: "translate(-1px, 1px) rotate(-0.5deg)" },
          "75%": { transform: "translate(1px, -1px) rotate(0.5deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
