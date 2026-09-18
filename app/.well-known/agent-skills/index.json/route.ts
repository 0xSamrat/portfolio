import { agentSkillsIndex } from "../../../lib/catalogs";
import { jsonResponse } from "../../../lib/responses";

export const dynamic = "force-static";

/** Agent Skills discovery index v0.2.0. */
export function GET() {
  return jsonResponse(agentSkillsIndex());
}
