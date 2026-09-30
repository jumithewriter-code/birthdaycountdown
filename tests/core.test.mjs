// Unit tests for the pure logic in birthday-countdown.html (<script id="core">).
// Run: node --test tests/
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const html = readFileSync(new URL("../birthday-countdown.html", import.meta.url), "utf8");
const src = html.match(/<script id="core">([\s\S]*?)<\/script>/)[1];
const ctx = {}; vm.createContext(ctx); vm.runInContext(src, ctx);
const Core = ctx.Core;

const at = (y, m, d, h = 12) => new Date(y, m - 1, d, h);
const ymd = dt => [dt.getFullYear(), dt.getMonth() + 1, dt.getDate()];

test("FR-2: days left to a birthday later this year", () => {
  assert.equal(Core.daysLeft("1995-10-14", at(2026, 9, 30)), 14);
});
test("FR-2: birthday today is 0 days, at any time of day", () => {
  assert.equal(Core.daysLeft("1995-09-30", at(2026, 9, 30, 0)), 0);
  assert.equal(Core.daysLeft("1995-09-30", at(2026, 9, 30, 23)), 0);
});
test("FR-2: a birthday that already passed rolls to next year", () => {
  assert.deepEqual(ymd(Core.nextBirthday("1995-09-29", at(2026, 9, 30))), [2027, 9, 29]);
  assert.equal(Core.daysLeft("1995-09-29", at(2026, 9, 30)), 364);
});
test("FR-2: across the new year", () => {
  assert.equal(Core.daysLeft("2000-01-02", at(2026, 12, 31)), 2);
});
test("FR-2: Feb 29 birthday in a non-leap year falls on Mar 1", () => {
  assert.deepEqual(ymd(Core.nextBirthday("2000-02-29", at(2027, 1, 1))), [2027, 3, 1]);
  assert.deepEqual(ymd(Core.nextBirthday("2000-02-29", at(2028, 1, 1))), [2028, 2, 29]);
});
test("FR-2: whole days even across a DST change (March)", () => {
  assert.equal(Core.daysLeft("2000-04-05", at(2026, 3, 1)), 35);
});
test("dateFor gives the calendar date of each countdown day", () => {
  assert.deepEqual(ymd(Core.dateFor("2000-10-03", 5, at(2026, 9, 30))), [2026, 9, 28]);
  assert.deepEqual(ymd(Core.dateFor("2000-10-03", 0, at(2026, 9, 30))), [2026, 10, 3]);
});
test("FR-5/FR-6: unlock rule", () => {
  const N = 14;
  assert.ok(Core.isUnlocked(5, 5, N));      // today
  assert.ok(Core.isUnlocked(10, 5, N));     // earlier day
  assert.ok(!Core.isUnlocked(4, 5, N));     // future day
  assert.ok(!Core.isUnlocked(14, 20, N));   // countdown not started yet
  assert.ok(Core.isUnlocked(0, 0, N));      // birthday itself
  assert.ok(!Core.isUnlocked(15, 3, N));    // outside the window
});
test("FR-3: custom message wins, blank falls back to the default, {name} is filled", () => {
  const defs = ["Happy birthday {name}", "One more sleep"];
  const cfg = { name: "Maya", entries: { 1: { msg: "  Love you {name}!  " }, 0: { msg: "   " } } };
  assert.equal(Core.messageFor(cfg, 1, defs), "Love you Maya!");
  assert.equal(Core.messageFor(cfg, 0, defs), "Happy birthday Maya");
  assert.match(Core.messageFor({ entries: {} }, 40, defs), /40 days to go.*you/);
});
test("NFR-6: escaping", () => {
  assert.equal(Core.esc(`<img src=x onerror="a('b')">&`), "&lt;img src=x onerror=&quot;a(&#39;b&#39;)&quot;&gt;&amp;");
  assert.equal(Core.esc(null), "");
});
test("FR-10: embedded JSON cannot close its script tag and still round-trips", () => {
  const cfg = { name: "</script><script>alert(1)</script>" };
  const s = Core.embedJSON(cfg);
  assert.ok(!s.includes("<"));
  assert.deepEqual(JSON.parse(s), cfg);
});
