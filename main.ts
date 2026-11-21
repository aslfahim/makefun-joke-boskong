// The joke the reviewer laughs at — @boskong entry.
// A three-part roll call: what each party brings to a pair-programming
// session with an AI agent. The line is rendered from a cast list and
// written to entry.txt in the harness output directory.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

interface CastMember {
  who: string;
  brings: string;
}

// Order matters: the human, the agent, then production gets the last word.
const cast: CastMember[] = [
  { who: "I", brings: "the requirements" },
  { who: "it", brings: "400 lines of total confidence" },
  { who: "production", brings: "the truth" },
];

function verbFor(who: string): string {
  // First person takes the bare verb; everyone else takes the -s form.
  return who === "I" ? "bring" : "brings";
}

function renderCast(members: CastMember[]): string {
  const clauses = members.map((m) => `${m.who} ${verbFor(m.who)} ${m.brings}`);
  const head = "Pair programming with an AI: ";
  const last = clauses.pop() as string;
  return head + clauses.join(", ") + ", and " + last + ".";
}

function main(): void {
  const line = renderCast(cast);
  const chars = [...line].length;
  if (chars < 1 || chars > 280 || line.includes("\n")) {
    throw new Error(`invalid joke length ${chars}`);
  }
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), line, "utf8");
}

main();
