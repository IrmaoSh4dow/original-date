import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { story } from "../content/story.ts";
import { fadeTransition } from "../lib/motion.ts";
import { keyboardMarks, scoreGuess, type Mark } from "../lib/wordle.ts";
import { PrimaryButton } from "./PrimaryButton.tsx";

const rows = ["QWERTYUIOP", "ASDFGHJKLÑ", "ZXCVBNM"] as const;

type Props = {
  answer: string;
  tries: number;
  guesses: string[];
  draft: string;
  outcome: "playing" | "won" | "lost";
  onType: (letter: string) => void;
  onBackspace: () => void;
  onCommit: () => void;
  onFuture: () => void;
};

function tileTone(mark?: Mark, filled = false): string {
  if (mark === "correct") return "border-transparent bg-cherry text-cream";
  if (mark === "present") return "border-transparent bg-gold text-plum";
  if (mark === "absent") return "border-transparent bg-plum/15 text-plum/45";
  if (filled) return "border-cherry/50 bg-white text-plum";
  return "border-plum/15 bg-white/45 text-transparent";
}

function BoardRow({
  letters,
  marks,
  flip,
  length,
}: {
  letters: string[];
  marks: Array<Mark | undefined>;
  flip: boolean;
  length: number;
}) {
  const reduced = useReducedMotion();
  return (
    <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${length}, minmax(0, 1fr))` }}>
      {Array.from({ length }, (_, index) => {
        const letter = letters[index] ?? "";
        const mark = marks[index];
        return (
          <motion.span
            key={index}
            initial={flip && !reduced ? { rotateX: -90 } : false}
            animate={{ rotateX: 0 }}
            transition={fadeTransition(Boolean(reduced) || !flip, 0.42, !reduced && flip ? index * 0.12 : 0)}
            className={`flex aspect-square items-center justify-center rounded-lg border-2 font-sans text-xl font-semibold sm:text-2xl ${tileTone(mark, letter !== "")}`}
            style={{ transformStyle: "preserve-3d" }}
          >
            {letter}
          </motion.span>
        );
      })}
    </div>
  );
}

function KeyButton({
  label,
  mark,
  wide = false,
  onPress,
}: {
  label: string;
  mark?: Mark;
  wide?: boolean;
  onPress: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onPress}
      className={`flex h-11 min-w-0 flex-1 touch-manipulation items-center justify-center rounded-lg px-0.5 font-sans text-[0.7rem] font-semibold sm:h-12 sm:text-sm ${wide ? "px-3" : ""} ${
        mark === "correct" ? "bg-cherry text-cream" : mark === "present" ? "bg-gold text-plum" : mark === "absent" ? "bg-plum/10 text-plum/35" : "bg-white/80 text-plum"
      }`}
    >
      {label}
    </button>
  );
}

export function Wordle({ answer, tries, guesses, draft, outcome, onType, onBackspace, onCommit, onFuture }: Props) {
  const reduced = useReducedMotion();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [shake, setShake] = useState(false);
  const [flipRow, setFlipRow] = useState<number | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const marks = keyboardMarks(guesses, answer);
  const length = answer.length;
  const playing = outcome === "playing";

  const pressEnter = () => {
    if (!playing) return;
    if (draft.length !== length) {
      setNotice(story.wordle.short);
      setShake(false);
      window.requestAnimationFrame(() => setShake(true));
      return;
    }
    setFlipRow(guesses.length);
    setNotice(null);
    onCommit();
  };

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key === "Enter") {
        event.preventDefault();
        pressEnter();
      } else if (event.key === "Backspace") {
        event.preventDefault();
        onBackspace();
      } else if (event.key.length === 1) {
        onType(event.key);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const attempt = story.wordle.attempt
    .replace("{current}", String(Math.min(guesses.length + (playing ? 1 : 0), tries)))
    .replace("{total}", String(tries));
  const lost = story.wordle.lost.replace("{word}", story.answer);

  return (
    <section className="mx-auto w-full max-w-xl" aria-labelledby="wordle-title">
      <div className="rounded-[2rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,246,239,0.96),rgba(255,226,234,0.92))] px-4 py-7 text-plum shadow-[0_30px_80px_rgba(48,16,40,0.35)] sm:px-8 sm:py-10">
        <h1
          id="wordle-title"
          ref={headingRef}
          tabIndex={-1}
          className="text-center font-serif text-3xl text-plum focus:outline-none sm:text-4xl"
        >
          {story.wordle.heading}
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-center font-serif text-lg leading-relaxed text-plum/80 italic">{story.wordle.hint}</p>
        <p className="mt-4 text-center font-sans text-sm font-semibold tracking-wide text-cherry">{attempt}</p>
        <div
          className={`mx-auto mt-4 grid w-full gap-1.5 ${shake ? "shake" : ""}`}
          style={{ maxWidth: `${length * 3.55}rem` }}
        >
          {Array.from({ length: tries }, (_, row) => {
            const guess = guesses[row];
            if (guess) {
              return (
                <BoardRow
                  key={guess + row}
                  letters={guess.split("")}
                  marks={scoreGuess(guess, answer)}
                  flip={row === flipRow}
                  length={length}
                />
              );
            }
            const active = playing && row === guesses.length;
            const letters = active ? draft.split("") : [];
            return <BoardRow key={`empty-${row}`} letters={letters} marks={[]} flip={false} length={length} />;
          })}
        </div>
        <p className="mt-4 min-h-7 text-center font-serif text-lg text-cherry italic" role="status">
          {notice}
        </p>
        {playing ? (
          <div className="mt-2 space-y-1.5">
            {rows.map((row) => (
              <div key={row} className="flex w-full gap-1">
                {row.split("").map((letter) => (
                  <KeyButton key={letter} label={letter} mark={marks.get(letter)} onPress={() => onType(letter)} />
                ))}
              </div>
            ))}
            <div className="flex w-full gap-1">
              <KeyButton wide label={story.wordle.enter} onPress={pressEnter} />
              <KeyButton wide label={story.wordle.delete} onPress={onBackspace} />
            </div>
          </div>
        ) : (
          <div className="mt-2 text-center">
            {outcome === "won" ? (
              <>
                <p className="font-script text-5xl text-cherry sm:text-6xl">{story.wordle.won}</p>
                <p className="mt-2 font-serif text-xl text-plum italic">{story.wordle.dedication}</p>
              </>
            ) : (
              <p className="font-serif text-xl leading-relaxed text-plum italic">{lost}</p>
            )}
            <motion.div
              className="mt-8"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={fadeTransition(reduced, 0.6, reduced ? 0 : 0.7)}
            >
              <PrimaryButton type="button" onClick={onFuture} className="w-full sm:w-auto">
                {story.wordle.future}
              </PrimaryButton>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
