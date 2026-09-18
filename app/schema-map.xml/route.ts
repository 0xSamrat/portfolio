import { schemaMap } from "../lib/catalogs";
import { xmlResponse } from "../lib/responses";

export const dynamic = "force-static";

/** NLWeb Schema Map, referenced by the schemamap: directive in robots.txt. */
export function GET() {
  return xmlResponse(schemaMap());
}
