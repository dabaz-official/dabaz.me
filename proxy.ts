import { NextResponse, type NextRequest } from "next/server";

/** Stamps the pathname so the root layout can pick `<html lang>`. */
export function proxy(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set("x-pathname", request.nextUrl.pathname);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: [
    "/((?!_next|.*\\.(?:svg|ico|png|jpg|jpeg|webp|woff2?|txt|xml)$).*)",
  ],
};
