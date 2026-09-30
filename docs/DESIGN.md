# Design — My Mercury on Earth

## Architecture
One file, `my-mercury-on-earth.html`, with three script blocks:

1. `#gift-data` (`application/json`): `null` in the editable app. In an exported gift file it holds the whole config, including photos as data URLs.
2. `#core`: pure, DOM-free logic (dates, unlock rule, message resolution). It is exposed as `window.Core` and unit-tested in Node by `tests/core.test.mjs`.
3. The main script: rendering, editor, storage, export and effects.

## Data model
```js
cfg = {
  name: "Maya", from: "Sam",
  birthday: "2000-10-14",   // only month/day are used
  days: 14,                  // countdown length N
  entries: { "3": { msg: "…", photo: "data:image/jpeg;base64,…" } } // key = days left
}
```

## Key rules
- `daysLeft = next birthday (on or after today, at local midnight) − today`, measured in whole days.
- Day `d` is **unlocked** when `d ≤ N` and `d ≥ daysLeft`.
- A Feb 29 birthday rolls to Mar 1 in non-leap years (standard JS `Date` behaviour).

## Modes
| Mode | Trigger | Edit button |
|------|---------|-------------|
| Editor | `#gift-data` is `null` | yes |
| Gift | `#gift-data` has config | no |
| Preview | "Preview" in the editor | yes (it exits the preview) |

## Storage
IndexedDB (`bday-countdown` / `kv` / `cfg`). It was chosen over localStorage because photos easily exceed localStorage's ~5 MB limit. Every access is wrapped so the app still runs, without saving, if storage is blocked.

## Export
Clone `<html>`, empty the runtime-rendered containers, write the JSON config into `#gift-data` (escaping `<` as `<` so it can't close the script tag), and download the result as a Blob.
