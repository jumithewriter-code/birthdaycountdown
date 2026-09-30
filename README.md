# 🎂 Birthday Countdown

A countdown to someone's birthday that unlocks a sweet message and a photo each day.

## Use it
1. Open `birthday-countdown.html` in a browser.
2. Enter their name, your name, the birthday, and how many days to count down.
3. Write a message for each day and add photos. Blank days use built-in sweet messages, and `{name}` inserts their name.
4. Use **👀 Preview** to see any day, including the birthday with confetti.
5. Click **🎁 Download gift file** and send them that file. Each day's card unlocks on its date; future days stay locked ("No peeking! 🙈").

Your work saves automatically in the browser you use to edit. Keep your copy of `birthday-countdown.html`, because the gift file has no editor.

## Develop
```
npm test                 # unit tests for the date/unlock logic
python -m http.server    # then open http://localhost:8000/birthday-countdown.html
```

## Docs
- [Requirements](docs/REQUIREMENTS.md)
- [Design](docs/DESIGN.md)
- [Test report](docs/TEST-REPORT.md)
- [Changelog](CHANGELOG.md)
