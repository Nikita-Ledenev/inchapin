import localFont from "next/font/local";

export const proximaNova = localFont({
  src: [
    { path: "./fonts/ProximaNova-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/ProximaNova-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ProximaNova-Semibold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/ProximaNova-Bold.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-proxima-nova",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});
