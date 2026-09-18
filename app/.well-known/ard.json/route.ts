import { ardCatalog } from "../../lib/catalogs";
import { jsonResponse } from "../../lib/responses";

export const dynamic = "force-static";

/** ARD v0.91 canonical path. */
export function GET() {
  return jsonResponse(ardCatalog());
}
