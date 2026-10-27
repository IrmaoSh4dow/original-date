import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { story } from "../src/content/story.ts";
import { initialGame, reduceGame } from "../src/hooks/useGame.ts";
import { gameOutcome, keyboardMarks, normalizeWord, scoreGuess } from "../src/lib/wordle.ts";

const answer = normalizeWord(story.answer);
const config = { answer, tries: story.tries, exhibits: story.exhibits.length };

assert.ok(answer.length >= 4 && answer.length <= 7, "la palabra debe tener entre 4 y 7 letras");
assert.equal(normalizeWord("bésos"), "BESOS");
assert.equal(normalizeWord("áéíóúñ"), "AEIOUÑ");
assert.ok(story.tries >= 5 && story.tries <= 8);

assert.deepEqual(scoreGuess("BESOS", "BESOS"), ["correct", "correct", "correct", "correct", "correct"]);
assert.deepEqual(scoreGuess("SSSSS", "BESOS"), ["absent", "absent", "correct", "absent", "correct"]);
assert.deepEqual(scoreGuess("BBBBB", "BESOS"), ["correct", "absent", "absent", "absent", "absent"]);
assert.deepEqual(scoreGuess("UUUUUU", "FUTURO"), ["absent", "correct", "absent", "correct", "absent", "absent"]);
assert.deepEqual(scoreGuess("OTURUF", "FUTURO"), ["present", "present", "present", "present", "present", "present"]);
assert.equal(gameOutcome(["BESOS"], "BESOS", 6), "won");
assert.equal(gameOutcome(["AAAAA", "BBBBB", "CCCCC", "DDDDD", "EEEEE", "FFFFF"], "BESOS", 6), "lost");
assert.equal(gameOutcome(["AAAAA"], "BESOS", 6), "playing");

const keys = keyboardMarks(["SABER"], "BESOS");
assert.equal(keys.get("S"), "present");
assert.equal(keys.get("E"), "present");
assert.equal(keys.get("A"), "absent");

let state = reduceGame(initialGame, { type: "begin" }, config);
assert.equal(state.phase, "play");
state = reduceGame(state, { type: "type", letter: "b" }, config);
state = reduceGame(state, { type: "submit" }, config);
assert.equal(state.guesses.length, 0, "no se envía una palabra a medias");
state = reduceGame(state, { type: "backspace" }, config);
for (const letter of answer) state = reduceGame(state, { type: "type", letter }, config);
assert.equal(reduceGame(state, { type: "future" }, config).phase, "play");
state = reduceGame(state, { type: "submit" }, config);
assert.equal(gameOutcome(state.guesses, answer, story.tries), "won");
assert.equal(reduceGame(state, { type: "future" }, config).phase, "gallery");
assert.equal(reduceGame(state, { type: "letter" }, config).phase, "letter");
assert.equal(reduceGame({ ...state, phase: "letter" }, { type: "photos" }, config).phase, "gallery");
assert.ok(story.letter.pages.length >= 6);
assert.equal(story.letter.signature, "Luke Price");
assert.ok(story.letter.pages.some((page) => page.includes("Valentina")));

const opened = reduceGame(reduceGame(state, { type: "future" }, config), { type: "open", index: 1 }, config);
assert.equal(opened.exhibit, 1);
assert.equal(reduceGame(opened, { type: "step", delta: 1 }, config).exhibit, 2);
assert.equal(reduceGame(opened, { type: "close" }, config).exhibit, null);

assert.equal(story.wordle.future, "¿Lista para un vistazo de nuestro futuro?");
assert.ok(story.exhibits.length >= 4);
for (const exhibit of story.exhibits) {
  assert.ok(exhibit.caption.trim().length > 20);
  assert.ok(exhibit.image.startsWith("/futuro/"));
  assert.equal(exhibit.title.toLowerCase().includes(answer.toLowerCase()), false);
}

const files = [
  new URL("../src/App.tsx", import.meta.url),
  new URL("../src/components/Invitation.tsx", import.meta.url),
  new URL("../src/components/Wordle.tsx", import.meta.url),
  new URL("../src/components/Gallery.tsx", import.meta.url),
  new URL("../src/components/Manuscript.tsx", import.meta.url),
];

for (const file of files) {
  const source = readFileSync(file, "utf8");
  assert.equal(source.includes(answer), false, `${file.pathname} no debe incluir la palabra`);
}

console.log("verify: juego, palabra y galería correctos");
