import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export function PrimaryButton({ className = "", children, type = "button", ...props }: Props) {
  return (
    <button
      type={type}
      {...props}
      className={`glow-button inline-flex min-h-12 cursor-pointer touch-manipulation items-center justify-center rounded-full bg-[linear-gradient(180deg,#fff0f4_0%,#f3b4c6_55%,#e48aaa_100%)] px-8 py-3 text-center font-sans text-lg font-semibold text-plum shadow-[0_10px_30px_rgba(196,69,106,0.28)] transition duration-300 hover:scale-[1.03] hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${className}`}
    >
      {children}
    </button>
  );
}
