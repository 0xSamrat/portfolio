import { LLMS_MODULES } from "../../lib/markdown";
import { textResponse } from "../../lib/responses";

export const dynamic = "force-static";

/** Modular per-area indexes: /llms/experience.txt, /llms/projects.txt, ... */
export function generateStaticParams() {
  return Object.keys(LLMS_MODULES).map((section) => ({
    section: `${section}.txt`,
  }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ section: string }> },
) {
  const { section } = await params;
  const key = section.replace(/\.txt$/, "");
  const render = LLMS_MODULES[key];
  if (!render) {
    return new Response("Not found\n", {
      status: 404,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }
  return textResponse(render());
}
