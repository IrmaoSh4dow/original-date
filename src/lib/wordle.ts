export type Mark = "correct" | "present" | "absent";
export type Outcome = "playing" | "won" | "lost";

export function normalizeLetter(raw: string): string {
  const upper = raw.toLocaleUpperCase("es-ES");
  if (upper === "Ñ") return "Ñ";
  const plain = upper.normalize("NFD").replace(/\p{M}/gu, "");
  return /^[A-Z]$/.test(plain) ? plain : "";
}

export function normalizeWord(value: string): string {
  return Array.from(value).map((letter) => normalizeLetter(letter)).join("");
}

export function scoreGuess(guess: string, answer: string): Mark[] {
  const marks: Mark[] = Array.from({ length: guess.length }, () => "absent");
  const pool = new Map<string, number>();

  for (let index = 0; index < answer.length; index += 1) {
    const expected = answer[index] ?? "";
    if ((guess[index] ?? "") === expected) marks[index] = "correct";
    else pool.set(expected, (pool.get(expected) ?? 0) + 1);
  }

  for (let index = 0; index < guess.length; index += 1) {
    if (marks[index] === "correct") continue;
    const letter = guess[index] ?? "";
    const left = pool.get(letter) ?? 0;
    if (left > 0) {
      marks[index] = "present";
      pool.set(letter, left - 1);
    }
  }

  return marks;
}

export function gameOutcome(guesses: readonly string[], answer: string, tries: number): Outcome {
  if (guesses.some((guess) => guess === answer)) return "won";
  if (guesses.length >= tries) return "lost";
  return "playing";
}

const rank: Record<Mark, number> = { absent: 0, present: 1, correct: 2 };

export function keyboardMarks(guesses: readonly string[], answer: string): Map<string, Mark> {
  const marks = new Map<string, Mark>();
  for (const guess of guesses) {
    const scored = scoreGuess(guess, answer);
    guess.split("").forEach((letter, index) => {
      const mark = scored[index];
      if (!mark) return;
      const previous = marks.get(letter);
      if (!previous || rank[mark] > rank[previous]) marks.set(letter, mark);
    });
  }
  return marks;
}
