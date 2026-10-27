import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { story } from "../content/story.ts";
import { fadeTransition } from "../lib/motion.ts";
import { PrimaryButton } from "./PrimaryButton.tsx";

type Props = {
  onBegin: () => void;
};

export function Invitation({ onBegin }: Props) {
  const reduced = useReducedMotion();
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <section className="mx-auto flex min-h-[78dvh] w-full max-w-3xl flex-col items-center justify-center px-2 text-center">
      <motion.p
        className="font-script text-4xl text-blush sm:text-5xl"
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={fadeTransition(reduced, 0.7)}
      >
        {story.invitation.kicker}
      </motion.p>
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="mt-2 max-w-3xl px-2 py-3 font-script text-[3.5rem] leading-[1.25] font-normal text-cream focus:outline-none sm:text-[5.6rem] sm:leading-[1.15]"
      >
        <motion.span
          className="inline-block"
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fadeTransition(reduced, 0.9, 0.1)}
        >
          {story.invitation.title}
        </motion.span>
      </h1>
      <motion.p
        className="mt-4 max-w-lg font-serif text-[1.35rem] leading-relaxed text-cream/90 italic sm:text-[1.65rem]"
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={fadeTransition(reduced, 0.8, 0.28)}
      >
        {story.invitation.subtitle}
      </motion.p>
      <motion.div
        className="mt-10"
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={fadeTransition(reduced, 0.7, 0.45)}
      >
        <PrimaryButton type="button" onClick={onBegin} className="w-full sm:w-auto">
          {story.invitation.cta}
        </PrimaryButton>
      </motion.div>
    </section>
  );
}
