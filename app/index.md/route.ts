import { markdownFor } from "../lib/markdown";
import { markdownResponse } from "../lib/responses";

export const dynamic = "force-static";

/** Markdown twin of `/` — see markdown-url-fallback. */
export function GET() {
  return markdownResponse(markdownFor("/") as string);
}
