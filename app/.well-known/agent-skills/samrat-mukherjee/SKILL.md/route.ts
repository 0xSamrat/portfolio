import { skillMd } from "../../../../lib/catalogs";
import { markdownResponse } from "../../../../lib/responses";

export const dynamic = "force-static";

export function GET() {
  return markdownResponse(skillMd());
}
