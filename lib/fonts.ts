import localFont from "next/font/local";

export const clashDisplay = localFont({
  src: [
    {
      path: "../styles/fonts/ClashDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../styles/fonts/ClashDisplay-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-clash-display",
  display: "swap",
});

export const generalSans = localFont({
  src: [
    {
      path: "../styles/fonts/GeneralSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../styles/fonts/GeneralSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-general-sans",
  display: "swap",
});

export const geistMono = localFont({
  src: [
    {
      path: "../styles/fonts/GeistMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../styles/fonts/GeistMono-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-geist-mono",
  display: "swap",
});
