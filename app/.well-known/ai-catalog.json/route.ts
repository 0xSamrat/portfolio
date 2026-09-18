import { ardCatalog } from "../../lib/catalogs";
import { jsonResponse } from "../../lib/responses";

export const dynamic = "force-static";

/** AI Catalog Standard discovery path — same document as ard.json. */
export function GET() {
  return jsonResponse(ardCatalog());
}
