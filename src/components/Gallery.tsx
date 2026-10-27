import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "motion/react";
import { story } from "../content/story.ts";
import type { Exhibit } from "../types/story.ts";
import { ease, fadeTransition } from "../lib/motion.ts";
import { PrimaryButton } from "./PrimaryButton.tsx";

type Props = {
  exhibit: number | null;
  onOpen: (index: number) => void;
  onClose: () => void;
  onStep: (delta: number) => void;
  onBack: () => void;
  onLetter: () => void;
};

const total = story.exhibits.length;

export function Gallery({ exhibit, onOpen, onClose, onStep, onBack, onLetter }: Props) {
  const reduced = useReducedMotion();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [focus, setFocus] = useState(0);
  const open = exhibit !== null ? story.exhibits[exhibit] : undefined;
  const current = story.exhibits[focus];

  useEffect(() => {
    if (exhibit !== null) setFocus(exhibit);
  }, [exhibit]);

  useEffect(() => {
    if (!open) headingRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        setFocus((index) => (index + 1) % total);
      }
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        setFocus((index) => (index - 1 + total) % total);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const advance = (delta: number) => setFocus((index) => (index + delta + total) % total);

  return (
    <section className="mx-auto w-full max-w-3xl" aria-labelledby="gallery-title">
      <div className="text-center">
        <p className="font-script text-4xl text-blush sm:text-5xl">{story.gallery.kicker}</p>
        <h1
          id="gallery-title"
          ref={headingRef}
          tabIndex={-1}
          className="mt-2 font-script text-6xl leading-tight text-cream focus:outline-none sm:text-7xl"
        >
          {story.gallery.title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl font-serif text-xl leading-relaxed text-cream/85 italic">{story.gallery.intro}</p>
      </div>

      <div className="relative mx-auto mt-8 h-[68vh] max-h-[640px] min-h-[420px] w-full max-w-md [perspective:1400px]">
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(232,160,184,0.55),transparent_68%)] blur-2xl"
          animate={reduced ? undefined : { scale: [0.9, 1.15, 0.9], opacity: [0.45, 0.8, 0.45] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        {story.exhibits.map((item, index) => {
          const depth = (index - focus + total) % total;
          if (depth === 0 || depth > 2) return null;
          return (
            <BackPrint
              key={item.id}
              item={item}
              depth={depth}
              reduced={reduced}
              onChoose={() => setFocus(index)}
            />
          );
        })}
        {current ? (
          <FrontPrint
            key={current.id}
            item={current}
            reduced={reduced}
            onOpen={() => onOpen(focus)}
            onToss={() => advance(1)}
          />
        ) : null}
      </div>

      <div className="mt-4 text-center">
        <p className="font-serif text-3xl text-cream italic">{current?.title}</p>
        <p className="mt-2 font-sans text-sm font-semibold tracking-[0.18em] text-gold uppercase">
          {focus + 1} de {total}
        </p>
        <p className="mx-auto mt-3 max-w-sm font-serif text-lg text-blush/85 italic">{story.gallery.wander}</p>
        <div className="mt-4 flex justify-center gap-2">
          {story.exhibits.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={item.title}
              aria-current={index === focus ? "true" : undefined}
              onClick={() => setFocus(index)}
              className={`h-2.5 rounded-full transition-all ${index === focus ? "w-8 bg-gold" : "w-2.5 bg-cream/35"}`}
            />
          ))}
        </div>
        <div className="mt-5 flex justify-center">
          <PrimaryButton type="button" onClick={onLetter}>
            {story.letter.open}
          </PrimaryButton>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="mt-6 inline-flex min-h-11 items-center rounded-full border border-blush/50 px-5 font-sans text-sm font-semibold text-blush transition hover:bg-blush/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          {story.gallery.back}
        </button>
      </div>

      {open && exhibit !== null
        ? createPortal(
            <Viewer item={open} index={exhibit} reduced={reduced} onClose={onClose} onStep={onStep} />,
            document.body,
          )
        : null}
    </section>
  );
}

function BackPrint({
  item,
  depth,
  reduced,
  onChoose,
}: {
  item: Exhibit;
  depth: number;
  reduced: boolean | null;
  onChoose: () => void;
}) {
  const tilt = depth === 1 ? -8 : 7;
  return (
    <motion.button
      type="button"
      onClick={onChoose}
      aria-label={item.title}
      className="absolute inset-x-6 top-8 overflow-hidden rounded-[1.6rem] border border-white/50 bg-[#fff6ef] shadow-[0_18px_40px_rgba(12,6,20,0.35)]"
      initial={false}
      animate={{
        y: depth * 22,
        scale: 1 - depth * 0.07,
        rotate: reduced ? 0 : tilt,
        opacity: 1 - depth * 0.18,
      }}
      transition={fadeTransition(reduced, 0.55)}
      style={{ zIndex: 10 - depth }}
    >
      <img src={item.image} alt="" draggable={false} className="h-[52vh] max-h-[520px] w-full object-cover" />
    </motion.button>
  );
}

function FrontPrint({
  item,
  reduced,
  onOpen,
  onToss,
}: {
  item: Exhibit;
  reduced: boolean | null;
  onOpen: () => void;
  onToss: () => void;
}) {
  const [gone, setGone] = useState<{ x: number; y: number; rotate: number } | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const travel = useRef(0);

  return (
    <motion.div
      className="absolute inset-x-3 top-0 z-20 cursor-grab touch-none active:cursor-grabbing"
      drag={reduced || gone ? false : true}
      dragSnapToOrigin
      dragElastic={0.85}
      onDrag={(_, info) => {
        travel.current = Math.hypot(info.offset.x, info.offset.y);
      }}
      onDragEnd={(_, info) => {
        const speed = Math.hypot(info.velocity.x, info.velocity.y);
        if (travel.current < 120 && speed < 900) return;
        const dir = info.offset.x + info.velocity.x * 0.08;
        setGone({
          x: (dir >= 0 ? 1 : -1) * 760,
          y: info.offset.y + info.velocity.y * 0.12,
          rotate: dir >= 0 ? 22 : -22,
        });
      }}
      onTap={() => onOpen()}
      initial={reduced ? false : { scale: 0.9, y: 36, opacity: 0 }}
      animate={
        gone
          ? { x: gone.x, y: gone.y, rotate: gone.rotate, opacity: 0, transition: { duration: 0.42, ease } }
          : { scale: 1, y: 0, opacity: 1, rotate: 0 }
      }
      onAnimationComplete={() => {
        if (gone) onToss();
      }}
      role="group"
      aria-label={item.title}
    >
      <motion.div animate={reduced ? undefined : { y: [0, -8, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}>
        <motion.div
          className="overflow-hidden rounded-[1.7rem] border border-white/70 bg-[#fff6ef] p-2 shadow-[0_30px_70px_rgba(12,6,20,0.48)]"
          style={{ rotateX: reduced ? 0 : tilt.y * -10, rotateY: reduced ? 0 : tilt.x * 14, transformPerspective: 900 }}
          onPointerMove={(event) => {
            if (reduced) return;
            const bounds = event.currentTarget.getBoundingClientRect();
            setTilt({
              x: (event.clientX - bounds.left) / bounds.width - 0.5,
              y: (event.clientY - bounds.top) / bounds.height - 0.5,
            });
          }}
          onPointerLeave={() => setTilt({ x: 0, y: 0 })}
        >
          <LivingPhoto src={item.image} alt="" reduced={reduced} fit="cover" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function LivingPhoto({
  src,
  alt,
  reduced,
  fit,
}: {
  src: string;
  alt: string;
  reduced: boolean | null;
  fit: "cover" | "contain";
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span className="block h-[52vh] max-h-[520px] w-full bg-[#2a1840]" />;

  return (
    <span className={fit === "contain" ? "relative flex h-full w-full items-center justify-center" : "relative block overflow-hidden"}>
      <motion.img
        src={src}
        alt={alt}
        draggable={false}
        onError={() => setFailed(true)}
        className={
          fit === "cover"
            ? "h-[52vh] max-h-[520px] w-full object-cover select-none"
            : "max-h-full max-w-full object-contain select-none"
        }
        animate={
          reduced
            ? undefined
            : fit === "cover"
              ? { scale: [1.06, 1.14, 1.06], x: ["-1.5%", "2%", "-1.5%"], y: ["-1%", "1.5%", "-1%"] }
              : { scale: [0.97, 1, 0.97] }
        }
        transition={{ duration: fit === "cover" ? 16 : 8, repeat: Infinity, ease: "easeInOut" }}
      />
      {reduced ? null : (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-1/3 bg-[linear-gradient(90deg,transparent,rgba(255,248,243,0.42),transparent)]"
          animate={{ left: ["-40%", "120%"] }}
          transition={{ duration: 4.6, repeat: Infinity, repeatDelay: 2.2, ease: "easeInOut" }}
        />
      )}
    </span>
  );
}

function Viewer({
  item,
  index,
  reduced,
  onClose,
  onStep,
}: {
  item: Exhibit;
  index: number;
  reduced: boolean | null;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [solo, setSolo] = useState(false);

  useEffect(() => {
    setSolo(false);
    closeRef.current?.focus();
  }, [item.id]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onStep(1);
      if (event.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onStep]);

  return (
    <div className="fixed inset-0 z-[80] flex flex-col bg-[#120a18]/95" role="dialog" aria-modal="true" aria-labelledby="exhibit-title">
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="absolute top-[max(0.75rem,env(safe-area-inset-top))] right-3 z-10 rounded-full bg-white/10 px-4 py-2 font-sans text-sm font-semibold text-cream backdrop-blur-sm"
      >
        {story.gallery.close}
      </button>
      <div className="relative min-h-0 flex-1">
        <div className="absolute inset-0 px-4 pt-16 pb-3">
          <LivingPhoto src={item.image} alt={item.title} reduced={reduced} fit="contain" />
        </div>
      </div>
      {solo ? (
        <button
          type="button"
          onClick={() => setSolo(false)}
          className="mb-[max(1rem,env(safe-area-inset-bottom))] self-center font-serif text-lg text-blush italic underline decoration-blush/40 underline-offset-4"
        >
          {story.gallery.plaque}
        </button>
      ) : (
        <div className="shrink-0 px-4 pt-2 pb-[max(1rem,env(safe-area-inset-bottom))] text-center">
          <h2 id="exhibit-title" className="font-script text-5xl text-cream">
            {item.title}
          </h2>
          <p className="mx-auto mt-2 max-w-xl font-serif text-lg leading-relaxed text-cream/90 italic">{item.caption}</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <button type="button" onClick={() => onStep(-1)} className="font-sans text-base font-semibold text-blush">
              {story.gallery.previous}
            </button>
            <button type="button" onClick={() => onStep(1)} className="font-sans text-base font-semibold text-cream">
              {story.gallery.next}
            </button>
            <button type="button" onClick={() => setSolo(true)} className="font-serif text-lg text-gold italic">
              {story.gallery.solo}
            </button>
          </div>
          <p className="mt-2 font-sans text-xs tracking-[0.16em] text-gold/80 uppercase">
            {index + 1} de {total}
          </p>
        </div>
      )}
    </div>
  );
}
