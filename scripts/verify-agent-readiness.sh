#!/usr/bin/env bash
# Local verification of the is-agentic / Ora checks that can be asserted without
# a deploy. Run against a production build:
#
#   npm run build && npx next start -p 3222
#   ./scripts/verify-agent-readiness.sh http://127.0.0.1:3222
#
# Two checks cannot be verified locally because they depend on external search
# indexing: brand-search-accuracy and agentic-search-specific.
BASE="${1:-http://127.0.0.1:3222}"
pass=0; fail=0
ok()   { echo "  PASS  $1"; pass=$((pass+1)); }
bad()  { echo "  FAIL  $1"; fail=$((fail+1)); }
chk()  { if [ "$2" = "1" ]; then ok "$1"; else bad "$1"; fi; }

echo "=== REQUIRED ==="

# markdown-negotiation-vary
H=$(curl -sS -i -H 'Accept: text/markdown' "$BASE/")
echo "$H" | head -1 | grep -q "200" \
  && echo "$H" | grep -qi "^content-type: text/markdown" \
  && echo "$H" | grep -qi "^vary:.*Accept" \
  && echo "$H" | tail -n +2 | grep -q "^# Samrat Mukherjee" && R=1 || R=0
chk "markdown-negotiation-vary: Accept: text/markdown -> md + Vary: Accept" $R

HH=$(curl -sS -i -H 'Accept: text/html,application/xhtml+xml,*/*;q=0.8' "$BASE/")
echo "$HH" | grep -qi "^content-type: text/html" && R=1 || R=0
chk "markdown-negotiation-vary: browser Accept still gets HTML" $R

# agent-friendly-404
N=$(curl -sS -i -H 'Accept: text/markdown' "$BASE/this-path-does-not-exist")
echo "$N" | head -1 | grep -q "404" \
  && echo "$N" | grep -qi "^content-type: text/markdown" \
  && echo "$N" | grep -q "404 — Not found" \
  && echo "$N" | grep -q "llms.txt" && R=1 || R=0
chk "agent-friendly-404: 404 status + markdown body + recovery links" $R

curl -sS -o /dev/null -w "%{http_code}" "$BASE/nope-html" | grep -q 404 && R=1 || R=0
chk "agent-friendly-404: HTML 404 also returns a real 404 status" $R

# content-no-js: >=500 chars of real content in raw HTML, one h1
RAW=$(curl -sS "$BASE/")
TXTLEN=$(python3 "$(dirname "$0")/extract-text.py" "$BASE/")
[ "$TXTLEN" -gt 500 ] && R=1 || R=0
chk "content-no-js: >500 chars of extracted text ($TXTLEN chars)" $R
[ "$(echo "$RAW" | grep -o '<h1' | wc -l)" -eq 1 ] && R=1 || R=0
chk "content-no-js / ax-document-structure: exactly one <h1>" $R
echo "$RAW" | grep -q '<main' && echo "$RAW" | grep -q '<nav' && R=1 || R=0
chk "ax-document-structure: <main> and <nav> landmarks present" $R

echo "=== RECOMMENDED ==="

# sitemap + lastmod
S=$(curl -sS "$BASE/sitemap.xml")
echo "$S" | grep -q "<urlset" && echo "$S" | grep -q "<lastmod>" && R=1 || R=0
chk "sitemap + sitemap-lastmod: valid urlset with lastmod ($(echo "$S" | grep -c '<loc>') URLs)" $R

# json-ld
echo "$RAW" | grep -q 'application/ld+json' && R=1 || R=0
chk "json-ld: ld+json block present in raw HTML" $R
for T in '"@type":"Person"' '"@type":"Organization"' '"@type":"WebSite"' '"@type":"ProfilePage"' '"@type":"BreadcrumbList"' '"@type":"ItemList"' '"@type":"FAQPage"'; do
  echo "$RAW" | grep -q "$T" && R=1 || R=0
  chk "schema-type-breadth: $T" $R
done
echo "$RAW" | grep -q '"contactPoint"' && echo "$RAW" | grep -q '"PostalAddress"' && R=1 || R=0
chk "org-schema-completeness: contactPoint + PostalAddress" $R
echo "$RAW" | grep -q '"sameAs"' && R=1 || R=0
chk "json-ld-entity-linking: sameAs present" $R

# metadata-completeness
echo "$RAW" | grep -q 'rel="canonical"' && R=1 || R=0
chk "metadata-completeness: canonical" $R
echo "$RAW" | grep -q '<html lang="en"' && R=1 || R=0
chk "metadata-completeness: html lang" $R
echo "$RAW" | grep -q 'property="og:image"' && R=1 || R=0
chk "metadata-completeness: og:image" $R
echo "$RAW" | grep -q 'property="og:type"' && R=1 || R=0
chk "metadata-completeness: og:type" $R

# trust-anchors: >=500 chars each
for P in about contact privacy; do
  C=$(python3 "$(dirname "$0")/extract-text.py" "$BASE/$P")
  [ "$C" -gt 500 ] && R=1 || R=0
  chk "trust-anchors: /$P has $C chars (need >500)" $R
done

# agent-instruction
curl -sS "$BASE/llms.txt" | grep -qi "When to use" && R=1 || R=0
chk "agent-instruction: llms.txt has a 'When to use' section" $R

# page-token-budget
for P in "" work agent; do
  C=$(python3 "$(dirname "$0")/extract-text.py" "$BASE/$P")
  [ "$C" -lt 100000 ] && R=1 || R=0
  chk "page-token-budget: /$P extracted text $C chars (<100000)" $R
done

echo "=== BONUS SIGNALS ==="
b=0
bchk() { if [ "$2" = "1" ]; then echo "  BONUS $1"; b=$((b+1)); else echo "  MISS  $1"; fi; }

curl -sS "$BASE/llms.txt" | head -1 | grep -q "^# " && bchk "llms-txt-exists + formatting (h1 first)" 1 || bchk "llms-txt-exists" 0
curl -sS "$BASE/llms.txt" | grep -q "](http" && bchk "llms-txt-formatting: markdown links" 1 || bchk "llms-txt-formatting" 0
[ "$(curl -sS "$BASE/llms.txt" | wc -c)" -lt 30000 ] && bchk "llms-txt-formatting: under 30k chars" 1 || bchk "llms-txt size" 0
curl -sS -o /dev/null -w "%{http_code}" "$BASE/llms-full.txt" | grep -q 200 && bchk "llms-full.txt" 1 || bchk "llms-full.txt" 0
for M in experience projects skills contact; do
  curl -sS -o /dev/null -w "%{http_code}" "$BASE/llms/$M.txt" | grep -q 200 && bchk "modular-llms-txt: /llms/$M.txt" 1 || bchk "modular /llms/$M.txt" 0
done
curl -sSI "$BASE/index.md" | grep -qi "content-type: text/markdown" && curl -sS "$BASE/index.md" | grep -q "^---" && bchk "markdown-url-fallback + frontmatter: /index.md" 1 || bchk "/index.md" 0
for P in about work contact agent privacy; do
  curl -sSI "$BASE/$P.md" | grep -qi "content-type: text/markdown" && bchk "markdown-url-fallback: /$P.md twin" 1 || bchk "/$P.md" 0
done
curl -sS "$BASE/" | grep -q 'rel="alternate" type="text/markdown"' && bchk "markdown-link-alternate: <link rel=alternate>" 1 || bchk "markdown-link-alternate" 0
curl -sSI "$BASE/" | grep -qi '^link:.*rel="alternate"' && bchk "link-headers-discovery: Link header" 1 || bchk "link-headers-discovery" 0
curl -sSI "$BASE/" | grep -qi '^link:.*rel="sitemap"' && bchk "link-headers-discovery: rel=sitemap" 1 || bchk "rel=sitemap" 0
curl -sS "$BASE/?mode=agent" | grep -q "^# Samrat Mukherjee" && bchk "agent-mode-view: ?mode=agent returns structured doc" 1 || bchk "agent-mode-view" 0
curl -sS "$BASE/.well-known/ard.json" | grep -q "urn:air:" && bchk "ard-catalog + ard-entries-valid: urn:air ids" 1 || bchk "ard-catalog" 0
curl -sS "$BASE/.well-known/ard.json" | grep -q "trustManifest" && bchk "ard-trust-manifest" 1 || bchk "ard-trust-manifest" 0
curl -sS "$BASE/.well-known/ai-catalog.json" | grep -q "specVersion" && bchk "ai-catalog-published" 1 || bchk "ai-catalog-published" 0
curl -sS "$BASE/.well-known/agent-card.json" | grep -q '"skills"' && bchk "a2a-agent-card" 1 || bchk "a2a-agent-card" 0
curl -sS "$BASE/.well-known/agent-skills/index.json" | grep -q "agentskills.io/discovery/0.2.0" && bchk "agent-discovery-file + agent-skills-index-v2" 1 || bchk "agent-skills index" 0
curl -sS -o /dev/null -w "%{http_code}" "$BASE/.well-known/agent-skills/samrat-mukherjee/SKILL.md" | grep -q 200 && bchk "SKILL.md served" 1 || bchk "SKILL.md" 0
curl -sS "$BASE/agents.md" | grep -qi "When to use" && bchk "agents.md with usage guidance" 1 || bchk "agents.md" 0
curl -sS "$BASE/robots.txt" | grep -qi "^Schemamap:" && bchk "nlweb-schema-feeds: schemamap directive" 1 || bchk "schemamap" 0
curl -sS "$BASE/schema-map.xml" | grep -q "<schemamap" && bchk "nlweb-schema-feeds: schema map xml" 1 || bchk "schema-map.xml" 0
curl -sS "$BASE/feeds/profile.jsonl" | head -1 | grep -q '"@type":"Person"' && bchk "nlweb feeds: profile.jsonl" 1 || bchk "profile.jsonl" 0
curl -sS "$BASE/robots.txt" | grep -q "GPTBot" && bchk "robots-ai-policy-quality: AI crawlers allowed" 1 || bchk "robots ai policy" 0
curl -sS "$BASE/" | grep -q 'is-agentic-site-type' && bchk "is-agentic-site-type declaration" 1 || bchk "site-type" 0

echo
echo "=== llms.txt link resolution (llms-txt-links-resolve) ==="
bad_links=0
for U in $(curl -sS "$BASE/llms.txt" | grep -o 'https://0xsamrat.com[^)]*' | sort -u); do
  P="${U#https://0xsamrat.com}"; [ -z "$P" ] && P="/"
  C=$(curl -sS -o /dev/null -w "%{http_code}" "$BASE$P")
  [ "$C" = "200" ] || { echo "  BROKEN $P -> $C"; bad_links=$((bad_links+1)); }
done
[ "$bad_links" = "0" ] && echo "  PASS  all internal llms.txt links resolve 200" || echo "  FAIL  $bad_links broken links"

echo
echo "RESULT: $pass passed, $fail failed, $b bonus signals present"
