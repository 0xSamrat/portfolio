import { agentCard } from "../../lib/catalogs";
import { jsonResponse } from "../../lib/responses";

export const dynamic = "force-static";

export function GET() {
  return jsonResponse(agentCard());
}
