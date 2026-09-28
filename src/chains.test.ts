import { test } from "node:test";
import assert from "node:assert/strict";
import { CHAINS, find } from "./chains.ts";

test("ids and short names are unique", () => {
  assert.equal(new Set(CHAINS.map((c) => c.id)).size, CHAINS.length);
  assert.equal(new Set(CHAINS.map((c) => c.short)).size, CHAINS.length);
});

test("find by decimal id, hex id, name and short name", () => {
  assert.equal(find("8453")[0].name, "Base");
  assert.equal(find("0x2105")[0].name, "Base");
  assert.equal(find("arbitrum")[0].id, 42161);
  assert.equal(find("op")[0].id, 10);
  assert.deepEqual(find("nope"), []);
});

test("every entry has https endpoints", () => {
  for (const c of CHAINS) {
    assert.ok(c.rpc.startsWith("https://") && c.explorer.startsWith("https://"), c.name);
  }
});
