import { isLocale, locales } from "@dabaz/data/site";
import { createOgImage } from "@dabaz/lib/og-image";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return new Response("Not found", { status: 404 });
  }

  return createOgImage(locale);
}
