# Changelog

## 1.1.1 — 2026-10-01
- Fixed the deployed site showing "404 NOT_FOUND" at its root address: added `vercel.json` so `/` serves `my-mercury-on-earth.html`.

## 1.1.0 — 2026-09-30
- Renamed the app to **My Mercury on Earth**: browser tab title, page header, setup screen, gift file name (`my-mercury-on-earth-for-<name>.html`), main file and docs.
- Header now shows the name as a title with "For <name>" underneath, so it no longer wraps on phones.
- Saved data key unchanged, so existing work carries over.

## 1.0.0 — 2026-09-30
- First release: daily messages and photos, locked future days, live ticker, birthday confetti, auto-save, per-day preview, and an exportable gift file.
- Fixed D-1 (ticker vs. headline mismatch) and D-2 (birthday emoji rendered as a silhouette) found in testing.
