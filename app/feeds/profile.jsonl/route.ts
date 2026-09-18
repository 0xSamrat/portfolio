import { profileFeed } from "../../lib/catalogs";

export const dynamic = "force-static";

export function GET() {
  return new Response(profileFeed(), {
    headers: {
      "content-type": "application/jsonl; charset=utf-8",
      "access-control-allow-origin": "*",
      "cache-control": "public, max-age=0, s-maxage=3600",
    },
  });
}
