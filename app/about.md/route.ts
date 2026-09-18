import { markdownFor } from "../lib/markdown";
import { markdownResponse } from "../lib/responses";

export const dynamic = "force-static";

/** Markdown twin of `/about` — see markdown-url-fallback. */
export function GET() {
  return markdownResponse(markdownFor("/about") as string);
}
