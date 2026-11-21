#!/bin/sh
# Regenerate the home-only font subset.
#
# The two home routes render a known set of characters (`scripts/home-glyphs.txt`).
# Subsetting the pinned DabFonts faces to that set drops the home payload from
# about 1.6 MB to about 50 KB without changing the typeface, metrics, or the
# full faces used by every other route.
#
# Requires `pyftsubset` from fonttools plus brotli:
#   python3 -m venv .venv
#   .venv/bin/pip install -r scripts/requirements.txt
#   PATH="$PWD/.venv/bin:$PATH" pnpm subset
# The generated files are committed; a normal build does not need fonttools.
set -eu
cd "$(dirname "$0")/.."

if ! command -v pyftsubset >/dev/null 2>&1; then
  echo "subset: pyftsubset is not on PATH." >&2
  echo "  python3 -m venv .venv && .venv/bin/pip install -r scripts/requirements.txt" >&2
  echo "  PATH=\"\$PWD/.venv/bin:\$PATH\" pnpm subset" >&2
  exit 1
fi

for weight in Regular SemiBold; do
  pyftsubset "public/fonts/DabSans-$weight.woff2" \
    --text-file=scripts/home-glyphs.txt \
    --flavor=woff2 \
    --output-file="public/fonts/DabSansHome-$weight.woff2"
done

echo "subset: public/fonts/DabSansHome-{Regular,SemiBold}.woff2"
