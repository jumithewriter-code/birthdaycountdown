# Test Report — Birthday Countdown v1.0.0

**Date:** 2026-09-30 · **Environment:** Chromium (in-app browser), Node 24.16 · **Result:** ✅ all passing

## Unit tests (`npm test`): 11/11 passing
These cover the date calculations (same year, past birthday rolling to next year, across New Year, Feb 29, DST), `dateFor`, the unlock rule, message fallback and `{name}`, HTML escaping, and safe JSON embedding.

## Acceptance tests (manual, in the browser)
Test data: recipient "Maya", from "Sam", birthday Oct 5 (5 days from test date), 14-day countdown.

| Req | Test | Result |
|-----|------|--------|
| FR-1 | Enter name, sender, date and length in the editor; the main view updates live | ✅ |
| FR-2 | Headline shows "5 days"; ticker counts down live | ✅ (after fix D-1) |
| FR-3 | A custom message with `{name}` shows "Hey Maya…"; blank days show defaults | ✅ |
| FR-4 | Upload a photo and it appears on the card and as a thumbnail; days without one show an illustrated placeholder | ✅ |
| FR-5 | Days 14–5 open and 4–0 locked; clicking day 2 shakes it with "opens on Sat, Oct 3"; clicking day 9 opens its card | ✅ |
| FR-6 | Birthday set to Dec 25: "coming soon" card starting Fri, Dec 11; all 15 days locked; ticker counts to the start | ✅ |
| FR-7 | Preview day 0 shows 🎉 "Happy Birthday, Maya!" and confetti draws on the canvas | ✅ (after fix D-2) |
| FR-8 | Reload keeps name, message and photo | ✅ |
| FR-9 | "Preview" on any day shows that day, marked "· preview" | ✅ |
| FR-10 | Export downloads `birthday-countdown-for-maya.html` (50 KB). Opened fresh, it has no Edit button and shows the message, photo and locks | ✅ |
| FR-11 | Ticker re-renders when it reaches the next unlock (code path; not waited out live) | ⚠️ not observed live |
| NFR-2 | 375×812 viewport: no horizontal scroll, layout OK | ✅ |
| NFR-3 | Dark mode renders with dark tokens | ✅ |
| NFR-4 | A 3000×2000 image is stored as 1100×733 JPEG (19 KB) | ✅ |
| NFR-6 | Message `<b>xss?</b>` renders as literal text | ✅ |

## Defects found & fixed
| ID | Defect | Fix |
|----|--------|-----|
| D-1 | The headline said "5 days" while the ticker said "04 days" (calendar days vs. exact hours), which read as a contradiction | The ticker now counts to the **next surprise unlock**, with a caption ("Next surprise unlocks in" / "The big day begins in" / "Countdown starts in") |
| D-2 | On the birthday, the 🎉 got the gradient-text style and showed as a flat pink silhouette | Added a `.big.emoji` style that turns off the gradient clip |
