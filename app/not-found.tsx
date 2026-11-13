import type { Metadata } from "next";

import NotFoundView from "@dabaz/components/not-found-view";
import { requestLocale } from "@dabaz/lib/locale";

export const metadata: Metadata = {
  title: "404",
};

export default async function NotFound() {
  const locale = await requestLocale();

  return <NotFoundView locale={locale} />;
}
