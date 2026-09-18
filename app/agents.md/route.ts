import { agentsMd } from "../lib/markdown";
import { markdownResponse } from "../lib/responses";

export const dynamic = "force-static";

export function GET() {
  return markdownResponse(agentsMd());
}
