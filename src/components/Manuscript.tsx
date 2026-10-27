import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { story } from "../content/story.ts";
import { ease } from "../lib/motion.ts";
import { PrimaryButton } from "./PrimaryButton.tsx";

type Props = {
  onBack: () => void;
};

export function Manuscript({ onBack }: Props) {
  const reduced = useReducedMotion();
  const pages = story.letter.pages;
  const [opened, setOpened] = useState(false);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const leaf = pages[page] ?? "";
  const last = page === pages.length - 1;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!opened) {
        if (event.key === "Enter") setOpened(true);
        return;
      }
      if (event.key === "ArrowRight") turn(1);
      if (event.key === "ArrowLeft") turn(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const turn = (delta: number) => {
    const next = page + delta;
    if (next < 0 || next >= pages.length) return;
    setDirection(delta);
    setPage(next);
  };

  return (
    <section className="mx-auto w-full max-w-xl" aria-labelledby="letter-title">
      <div className="mb-6 text-center">
        <p className="font-script text-4xl text-blush sm:text-5xl">{story.letter.kicker}</p>
        <h1 id="letter-title" tabIndex={-1} className="mt-1 font-script text-6xl leading-tight text-cream focus:outline-none sm:text-7xl">
          {story.letter.title}
        </h1>
      </div>

      <div className="relative mx-auto max-w-lg [perspective:1600px]">
        <span aria-hidden="true" className="absolute inset-x-3 top-3 bottom-0 rounded-[1.4rem] bg-[#e7d3bc] shadow-[0_18px_40px_rgba(20,8,16,0.35)]" />
        <span aria-hidden="true" className="absolute inset-x-1.5 top-1.5 bottom-0 rounded-[1.4rem] bg-[#f0e2cf]" />
        <AnimatePresence mode="wait" custom={direction}>
          {opened ? (
            <motion.article
              key={page}
              className="relative max-h-[74dvh] cursor-grab overflow-y-auto rounded-[1.4rem] border border-[#e7d3bc] bg-[radial-gradient(circle_at_12%_8%,rgba(255,255,255,0.75),transparent_32%),linear-gradient(180deg,#fffaf4_0%,#f4e7d6_100%)] px-6 py-7 text-plum shadow-[0_24px_60px_rgba(20,8,16,0.4)] sm:px-9 sm:py-9"
              drag={reduced ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={(_, info) => {
                if (info.offset.x <= -70) turn(1);
                else if (info.offset.x >= 70) turn(-1);
              }}
              custom={direction}
              initial={reduced ? false : { rotateY: direction > 0 ? 55 : -55, opacity: 0.4 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={reduced ? { opacity: 0 } : { rotateY: direction > 0 ? -55 : 55, opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.55, ease }}
              style={{ transformOrigin: direction > 0 ? "left center" : "right center", transformPerspective: 1600 }}
              aria-live="polite"
            >
              <p className="font-sans text-xs font-semibold tracking-[0.22em] text-cherry/70 uppercase">
                {page + 1} / {pages.length}
              </p>
              <div className="mt-4 border-l border-rose/50 pl-4">
                {leaf.split("\n\n").map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className="mb-4 font-serif text-[1.05rem] leading-[1.65] sm:text-lg">
                    {page === 0 ? <DropCap text={paragraph} /> : paragraph}
                  </p>
                ))}
                {last ? (
                  <footer className="mt-8 text-right">
                    <p className="font-serif text-lg text-plum/80 italic">{story.letter.closing}</p>
                    <p className="mt-1 font-script text-5xl text-cherry">{story.letter.signature}</p>
                  </footer>
                ) : (
                  <p className="mt-2 text-right font-script text-3xl text-cherry/70">sigue…</p>
                )}
              </div>
            </motion.article>
          ) : (
            <motion.button
              key="cover"
              type="button"
              onClick={() => setOpened(true)}
              className="relative flex min-h-[28rem] w-full flex-col items-center justify-center rounded-[1.4rem] border border-[#e7d3bc] bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.7),transparent_36%),linear-gradient(180deg,#fffaf4,#f3e4d0)] px-8 py-12 text-center text-plum shadow-[0_24px_60px_rgba(20,8,16,0.4)]"
              initial={reduced ? false : { rotateX: 8, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              exit={reduced ? { opacity: 0 } : { rotateY: -40, opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.6, ease }}
              style={{ transformOrigin: "left center" }}
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#e07a92,#9c2948_70%)] font-script text-3xl text-[#fff6ef] shadow-[inset_0_-6px_10px_rgba(80,10,30,0.35)]">
                L
              </span>
              <span className="mt-6 font-script text-5xl text-cherry">{story.letter.title}</span>
              <span className="mt-3 font-serif text-lg italic text-plum/75">{story.letter.kicker}</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        {opened ? (
          <>
            <button
              type="button"
              onClick={() => turn(-1)}
              disabled={page === 0}
              className="inline-flex min-h-11 items-center rounded-full border border-white/20 bg-white/10 px-5 font-sans text-sm font-semibold text-blush transition hover:bg-white/15 disabled:opacity-35"
            >
              Hoja anterior
            </button>
            <button
              type="button"
              onClick={() => turn(1)}
              disabled={last}
              className="inline-flex min-h-11 items-center rounded-full border border-white/20 bg-white/10 px-5 font-sans text-sm font-semibold text-cream transition hover:bg-white/15 disabled:opacity-35"
            >
              Hoja siguiente
            </button>
          </>
        ) : (
          <PrimaryButton type="button" onClick={() => setOpened(true)}>
            {story.letter.open}
          </PrimaryButton>
        )}
      </div>
      <p className="mx-auto mt-4 flex w-fit items-center gap-2 rounded-full border border-blush/25 bg-white/10 px-4 py-2 font-sans text-sm font-semibold text-blush">
        <span aria-hidden="true" className="text-gold">
          {opened ? "↔" : "✦"}
        </span>
        {opened ? story.letter.hint : "Toca la carta para abrirla."}
      </p>
      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex min-h-11 items-center rounded-full border border-blush/50 bg-transparent px-5 font-sans text-sm font-semibold text-blush transition hover:bg-blush/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          {story.letter.back}
        </button>
      </div>
    </section>
  );
}

function DropCap({ text }: { text: string }) {
  const first = text.slice(0, 1);
  const rest = text.slice(1);
  return (
    <>
      <span className="float-left mt-1 mr-2 font-script text-6xl leading-none text-cherry">{first}</span>
      {rest}
    </>
  );
}
