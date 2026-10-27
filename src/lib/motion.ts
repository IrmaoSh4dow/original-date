import type { Transition } from "motion/react";

export const ease = [0.22, 1, 0.36, 1] as const;

export function fadeTransition(
  reduced: boolean | null,
  duration = 0.65,
  delay = 0,
): Transition {
  if (reduced) return { duration: 0 };
  return { duration, delay, ease };
}
