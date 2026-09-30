# Requirements — Birthday Countdown

## Goal
A web app that counts down to someone's birthday and reveals a sweet message and a picture each day.

## Users
- **Creator**: sets up the countdown (name, date, messages, photos).
- **Recipient**: opens it each day to see the new message.

## Functional requirements
| ID | Requirement |
|----|-------------|
| FR-1 | Creator can set the recipient's name, the sender's name, the birthday (month/day), and how long the countdown is (7, 10, 14, 21 or 30 days). |
| FR-2 | The app shows the number of days left to the **next** birthday, and a live days/hours/minutes/seconds ticker. |
| FR-3 | Each countdown day has a message. If the creator leaves it blank, a built-in sweet default is used. `{name}` is replaced with the recipient's name. |
| FR-4 | Each day can have a photo. With no photo, a colourful illustrated placeholder is shown. |
| FR-5 | Today's card and all earlier days can be opened. Future days stay locked, and clicking one shows when it opens. |
| FR-6 | Before the countdown window starts, a "coming soon" card shows the start date. All days are locked. |
| FR-7 | On the birthday itself, a birthday card is shown with confetti. |
| FR-8 | The creator's work saves automatically in the browser and survives a reload. |
| FR-9 | Creator can preview any day's card before sending. |
| FR-10 | Creator can download a single self-contained **gift file** (HTML) with all messages and photos built in and no edit controls. |
| FR-11 | A new day unlocks at local midnight without a reload. |

## Non-functional requirements
| ID | Requirement |
|----|-------------|
| NFR-1 | A single HTML file. No build step, no server, no external dependencies except optional web fonts. |
| NFR-2 | Works on phones at 375px wide with no horizontal scrolling. |
| NFR-3 | Supports light and dark mode. |
| NFR-4 | Photos are shrunk to at most 1100px so gift files stay small. |
| NFR-5 | Confetti is skipped when `prefers-reduced-motion` is set. |
| NFR-6 | User text is HTML-escaped; no injection through messages or names. |

## Out of scope (v1)
Accounts, server hosting, notifications, and multiple recipients.
