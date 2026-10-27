import { useEffect, useState } from "react";
import { story } from "../content/story.ts";
import { gameOutcome, normalizeLetter, normalizeWord, type Outcome } from "../lib/wordle.ts";

const storageKey = "para-ti-juego-v1";

export type Phase = "invitation" | "play" | "gallery" | "letter";

export type GameState = {
  phase: Phase;
  guesses: string[];
  draft: string;
  exhibit: number | null;
};

type Action =
  | { type: "begin" }
  | { type: "type"; letter: string }
  | { type: "backspace" }
  | { type: "submit" }
  | { type: "future" }
  | { type: "back" }
  | { type: "open"; index: number }
  | { type: "close" }
  | { type: "step"; delta: number }
  | { type: "letter" }
  | { type: "photos" }
  | { type: "reset" };

type Config = {
  answer: string;
  tries: number;
  exhibits: number;
};

export const initialGame: GameState = {
  phase: "invitation",
  guesses: [],
  draft: "",
  exhibit: null,
};

function signature(config: Config): string {
  return `${config.answer}:${config.tries}:${config.exhibits}`;
}

export function reduceGame(state: GameState, action: Action, config: Config): GameState {
  const outcome = gameOutcome(state.guesses, config.answer, config.tries);

  switch (action.type) {
    case "begin":
      return { phase: "play", guesses: [], draft: "", exhibit: null };
    case "reset":
      return initialGame;
    case "type": {
      if (state.phase !== "play" || outcome !== "playing") return state;
      const letter = normalizeLetter(action.letter);
      if (!letter || state.draft.length >= config.answer.length) return state;
      return { ...state, draft: state.draft + letter };
    }
    case "backspace": {
      if (state.phase !== "play" || outcome !== "playing" || state.draft.length === 0) return state;
      return { ...state, draft: state.draft.slice(0, -1) };
    }
    case "submit": {
      if (state.phase !== "play" || outcome !== "playing") return state;
      if (state.draft.length !== config.answer.length) return state;
      return { ...state, guesses: [...state.guesses, state.draft], draft: "" };
    }
    case "future":
      if (outcome === "playing") return state;
      return { ...state, phase: "gallery", exhibit: null };
    case "back":
      return { ...state, phase: "play", exhibit: null };
    case "open":
      if (state.phase !== "gallery" || action.index < 0 || action.index >= config.exhibits) return state;
      return { ...state, exhibit: action.index };
    case "close":
      return { ...state, exhibit: null };
    case "step": {
      if (state.exhibit === null || config.exhibits === 0) return state;
      const next = (state.exhibit + action.delta + config.exhibits) % config.exhibits;
      return { ...state, exhibit: next };
    }
    case "letter":
      if (outcome === "playing") return state;
      return { ...state, phase: "letter", exhibit: null };
    case "photos":
      return { ...state, phase: "gallery", exhibit: null };
    default:
      return state;
  }
}

function readSaved(config: Config): GameState {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return initialGame;
    const parsed = JSON.parse(raw) as {
      version?: number;
      signature?: string;
      phase?: Phase;
      guesses?: unknown;
    };
    if (parsed.version !== 1 || parsed.signature !== signature(config) || !Array.isArray(parsed.guesses)) {
      return initialGame;
    }
    const guesses = parsed.guesses
      .filter((guess): guess is string => typeof guess === "string")
      .map((guess) => normalizeWord(guess))
      .filter((guess) => guess.length === config.answer.length)
      .slice(0, config.tries);
    const phase =
      parsed.phase === "gallery" || parsed.phase === "letter" || parsed.phase === "play" || parsed.phase === "invitation"
        ? parsed.phase
        : "invitation";
    const finished = gameOutcome(guesses, config.answer, config.tries) !== "playing";
    const kept = (phase === "gallery" || phase === "letter") && !finished ? "play" : phase;
    return {
      phase: kept,
      guesses,
      draft: "",
      exhibit: null,
    };
  } catch {
    return initialGame;
  }
}

export function useGame() {
  const answer = normalizeWord(story.answer);
  const config: Config = { answer, tries: story.tries, exhibits: story.exhibits.length };
  const [state, setState] = useState<GameState>(() => readSaved(config));

  useEffect(() => {
    const payload = {
      version: 1 as const,
      signature: signature(config),
      phase: state.phase,
      guesses: state.guesses,
    };
    try {
      localStorage.setItem(storageKey, JSON.stringify(payload));
    } catch {
      // Si el navegador bloquea el almacenamiento, el juego sigue en memoria.
    }
  }, [answer, config.exhibits, config.tries, state.guesses, state.phase]);

  const dispatch = (action: Action) => {
    setState((current) => reduceGame(current, action, config));
  };

  const outcome: Outcome = gameOutcome(state.guesses, answer, config.tries);

  return {
    state,
    answer,
    tries: config.tries,
    outcome,
    begin: () => dispatch({ type: "begin" }),
    typeLetter: (letter: string) => dispatch({ type: "type", letter }),
    backspace: () => dispatch({ type: "backspace" }),
    commit: () => dispatch({ type: "submit" }),
    openFuture: () => dispatch({ type: "future" }),
    openLetter: () => dispatch({ type: "letter" }),
    backToPhotos: () => dispatch({ type: "photos" }),
    backToGame: () => dispatch({ type: "back" }),
    openExhibit: (index: number) => dispatch({ type: "open", index }),
    closeExhibit: () => dispatch({ type: "close" }),
    stepExhibit: (delta: number) => dispatch({ type: "step", delta }),
    reset: () => dispatch({ type: "reset" }),
  };
}
