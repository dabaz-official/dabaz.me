import type { Metadata } from "next";

import RootDocument from "@dabaz/components/layout/root-document";
import {
  buildMetadata,
  viewport as sharedViewport,
} from "@dabaz/lib/metadata";
import { requestLocale } from "@dabaz/lib/locale";

import "./globals.css";

export const viewport = sharedViewport;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(await requestLocale());
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await requestLocale();

  return <RootDocument locale={locale}>{children}</RootDocument>;
}
