import { parseArgs } from "node:util";
import { CHAINS, find, type Chain } from "./chains.ts";

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: { list: { type: "boolean", default: false }, check: { type: "boolean", default: false } },
});

function show(c: Chain): void {
  console.log(`${c.name} (${c.short})`);
  console.log(`  chain id  ${c.id}  (0x${c.id.toString(16)})`);
  console.log(`  currency  ${c.currency}`);
  console.log(`  explorer  ${c.explorer}`);
  console.log(`  rpc       ${c.rpc}`);
}

async function chainIdOf(rpc: string): Promise<number> {
  const res = await fetch(rpc, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "eth_chainId", params: [] }),
    signal: AbortSignal.timeout(8000),
  });
  const body = (await res.json()) as { result?: string };
  if (!body.result) throw new Error(`HTTP ${res.status}, no result`);
  return parseInt(body.result, 16);
}

if (values.check) {
  const targets = positionals.length === 2
    ? [{ name: positionals[0], rpc: positionals[0], id: Number(positionals[1]) }]
    : CHAINS;
  const results = await Promise.allSettled(targets.map((t) => chainIdOf(t.rpc)));
  let bad = 0;
  results.forEach((r, i) => {
    const t = targets[i];
    if (r.status === "rejected") {
      bad++;
      console.log(`FAIL   ${t.name.padEnd(20)} ${(r.reason as Error).message}`);
    } else if (r.value !== t.id) {
      bad++;
      console.log(`WRONG  ${t.name.padEnd(20)} expected ${t.id}, got ${r.value}`);
    } else {
      console.log(`ok     ${t.name.padEnd(20)} ${t.id}`);
    }
  });
  process.exitCode = bad ? 1 : 0;
} else if (values.list) {
  for (const c of CHAINS) console.log(`${String(c.id).padStart(9)}  ${c.short.padEnd(9)} ${c.name}`);
} else if (positionals[0]) {
  const hits = find(positionals[0]);
  if (!hits.length) {
    console.error("no match");
    process.exit(1);
  }
  hits.forEach(show);
} else {
  console.error("usage: node src/index.ts <name|id> | --list | --check [RPC ID]");
  process.exit(2);
}
