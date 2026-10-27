import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Atmosphere } from "./components/Atmosphere.tsx";
import { Gallery } from "./components/Gallery.tsx";
import { HeartField } from "./components/HeartField.tsx";
import { Invitation } from "./components/Invitation.tsx";
import { Manuscript } from "./components/Manuscript.tsx";
import { MusicControl } from "./components/MusicControl.tsx";
import { Wordle } from "./components/Wordle.tsx";
import { useGame } from "./hooks/useGame.ts";
import { ease } from "./lib/motion.ts";

function entrance(kind: "cover" | "play" | "room", reduced: boolean | null) {
  if (reduced) return { initial: false as const, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0 } };
  if (kind === "room") {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.6, ease },
    };
  }
  if (kind === "cover") {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0, scale: 1.04, filter: "blur(8px)" },
      transition: { duration: 0.7, ease },
    };
  }
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 },
    transition: { duration: 0.55, ease },
  };
}

export function App() {
  const reduced = useReducedMotion();
  const game = useGame();
  const kind = game.state.phase === "gallery" || game.state.phase === "letter" ? "room" : game.state.phase === "invitation" ? "cover" : "play";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [game.state.phase]);

  let body = null;
  if (game.state.phase === "invitation") body = <Invitation onBegin={game.begin} />;
  else if (game.state.phase === "letter") body = <Manuscript onBack={game.backToPhotos} />;
  else if (game.state.phase === "gallery") {
    body = (
      <Gallery
        exhibit={game.state.exhibit}
        onOpen={game.openExhibit}
        onClose={game.closeExhibit}
        onStep={game.stepExhibit}
        onBack={game.backToGame}
        onLetter={game.openLetter}
      />
    );
  } else {
    body = (
      <Wordle
        answer={game.answer}
        tries={game.tries}
        guesses={game.state.guesses}
        draft={game.state.draft}
        outcome={game.outcome}
        onType={game.typeLetter}
        onBackspace={game.backspace}
        onCommit={game.commit}
        onFuture={game.openFuture}
      />
    );
  }

  return (
    <div className="relative min-h-dvh text-cream">
      <Atmosphere celebrate={game.outcome === "won" || game.state.phase === "gallery" || game.state.phase === "letter"} />
      <MusicControl />
      {game.state.phase === "invitation" || game.state.phase === "play" || game.state.phase === "letter" ? (
        <HeartField reduced={reduced} />
      ) : null}
      <main className="relative z-10 mx-auto flex min-h-dvh w-full max-w-5xl flex-col px-4 pt-8 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-8">
        <div className="flex flex-1 flex-col justify-center py-6">
          <AnimatePresence mode="wait">
            <motion.div key={game.state.phase} {...entrance(kind, reduced)}>
              {body}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center pb-2">
          <button
            type="button"
            onClick={game.reset}
            className="inline-flex min-h-11 items-center rounded-full border border-blush/50 bg-white/10 px-5 font-sans text-sm font-semibold text-cream transition hover:bg-blush/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            Reiniciar
          </button>
        </div>
      </main>
    </div>
  );
}
