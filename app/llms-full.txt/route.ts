import { llmsFullTxt } from "../lib/markdown";
import { textResponse } from "../lib/responses";

export const dynamic = "force-static";

export function GET() {
  return textResponse(llmsFullTxt());
}
