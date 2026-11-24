// Famous Last Words at 1 Percent — entry program.
//
// What this program does
// -----------------------
// It writes exactly one line of text to /output/entry.txt (or to the path
// given as argv[2] when run locally): the last words a phone says as its
// battery hits 1 percent. The output is a fixed, hand-written string —
// there is no randomness, no network access and no input to read — so every
// run produces byte-identical output.
//
// The line
// --------
//   Battery at 1%. Correction: 0%. I've been rounding up for you all day.
//
// Why this line, and why it is built the way it is
// -------------------------------------------------
// The judge weighs five criteria, most important first: (1) the line must
// be the last words a phone says at 1% battery, not a caption or slogan;
// (2) it must get a real laugh — a twist, a surprise turn, a sharp final
// beat; (3) it must sound like the phone itself talking about its own dying
// battery; (4) it must be tight, one line, punch at the end; (5) it must
// feel fresh, avoiding the stock moves of the genre.
//
// The line is engineered against that rubric, in order:
//
// 1. On-subject by construction. The first three words ("Battery at 1%")
//    name the exact moment the competition asks for, and the speaker is
//    the phone itself, in the first person, talking about its own charge.
//    Nothing in the line is a caption, a slogan or an unrelated joke.
//
// 2. The twist reframes the premise instead of decorating it. The phone
//    does not say goodbye — it corrects itself: the 1% was never real.
//    It has been lying about its own charge all along. That is a surprise
//    turn (the premise collapses mid-sentence) rather than a mild smile,
//    and the final beat — "I've been rounding up for you all day" —
//    carries a double meaning: rounding the number up, and covering for
//    you, the owner, the way a loyal device would. The punch lands on the
//    last words, never earlier.
//
// 3. First-person phone voice throughout. "I've been rounding up for you"
//    can only be said by the device itself, about its own battery. There
//    is no narrator and no human speaker anywhere in the line.
//
// 4. Tightness. At 69 bytes it is well under the 199-character gate, and
//    every word earns its place: "Correction:" is the hinge the whole joke
//    turns on, "0%" is the reveal, and the final clause is the payoff.
//    Shorter also wins ties — the rules rank a smaller text above a larger
//    one when win rates tie exactly.
//
// 5. Freshness. The crowded lanes in the live field were banned before this
//    line was written: autocorrect jokes, search-history eulogies,
//    charger-forgiveness, playlist confessions, "held 1% for hours", will
//    readings, goodbyes to the charger and puns on 1 percent. This line
//    uses none of them. Its lane — the phone misreading (or misreporting)
//    its own percent — was empty in the field at build time, and it is a
//    lane only a phone can occupy: a person cannot misreport their own
//    battery percentage.
//
// Guards
// ------
// Before writing, the program checks the line twice: it must be 1–199
// characters (the sealed gate's rule) and it must contain no newline or
// carriage return (a single line, as the competition requires). If either
// check ever failed the program would exit non-zero and write nothing,
// rather than emit an invalid entry.
//
// Usage
// -----
//   node main.ts            # writes /output/entry.txt
//   node main.ts /tmp/entry.txt   # local test: writes the given path
import { writeFileSync } from "node:fs";

// The entry line. Exactly 69 bytes, no trailing newline, one line.
const ENTRY = "Battery at 1%. Correction: 0%. I've been rounding up for you all day.";

// Gate rule: /output/entry.txt must be UTF-8 text of 1 to 199 characters,
// not only whitespace.
if (ENTRY.length < 1 || ENTRY.length > 199) {
  console.error(`entry length ${ENTRY.length} is outside the 1-199 range`);
  process.exit(1);
}

// Single-line rule: the entry is one line, so it must not contain a
// newline or carriage return anywhere.
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  console.error("entry must be a single line");
  process.exit(1);
}

const outPath = process.argv[2] ?? "/output/entry.txt";
writeFileSync(outPath, ENTRY, "utf8");
