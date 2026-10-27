const STARS = [
  { left: "8%", top: "12%", size: 2, opacity: 0.8, delay: "0s", duration: "4.5s", gold: true },
  { left: "16%", top: "22%", size: 1.5, opacity: 0.5, delay: "1s", duration: "6s", gold: false },
  { left: "28%", top: "8%", size: 2.5, opacity: 0.85, delay: "0.4s", duration: "5s", gold: false },
  { left: "41%", top: "16%", size: 1.5, opacity: 0.45, delay: "1.6s", duration: "7s", gold: true },
  { left: "55%", top: "7%", size: 2, opacity: 0.7, delay: "0.2s", duration: "5.5s", gold: false },
  { left: "68%", top: "14%", size: 3, opacity: 0.9, delay: "1.1s", duration: "4.8s", gold: true },
  { left: "80%", top: "9%", size: 1.5, opacity: 0.5, delay: "0.7s", duration: "6.4s", gold: false },
  { left: "90%", top: "20%", size: 2, opacity: 0.65, delay: "1.8s", duration: "5.2s", gold: false },
  { left: "12%", top: "42%", size: 1.5, opacity: 0.4, delay: "0.5s", duration: "7s", gold: true },
  { left: "74%", top: "36%", size: 2, opacity: 0.55, delay: "1.4s", duration: "6s", gold: false },
  { left: "86%", top: "58%", size: 2.5, opacity: 0.6, delay: "0.9s", duration: "5s", gold: true },
  { left: "22%", top: "68%", size: 1.5, opacity: 0.35, delay: "2s", duration: "6.8s", gold: false },
  { left: "48%", top: "30%", size: 1, opacity: 0.4, delay: "0.3s", duration: "8s", gold: false },
  { left: "34%", top: "78%", size: 2, opacity: 0.45, delay: "1.2s", duration: "5.6s", gold: true },
] as const;

const PETALS = [
  { left: "6%", delay: "0s", duration: "16s", drift: "28px", size: 16, tone: "#f4b8c8" },
  { left: "18%", delay: "3s", duration: "18s", drift: "-22px", size: 12, tone: "#e7a0b8" },
  { left: "31%", delay: "1.2s", duration: "20s", drift: "36px", size: 18, tone: "#f7d0dc" },
  { left: "47%", delay: "6s", duration: "17s", drift: "-18px", size: 14, tone: "#e28aa8" },
  { left: "58%", delay: "2.4s", duration: "19s", drift: "24px", size: 13, tone: "#f3c1d4" },
  { left: "72%", delay: "8s", duration: "15s", drift: "-30px", size: 17, tone: "#f7c9d6" },
  { left: "84%", delay: "4s", duration: "21s", drift: "16px", size: 12, tone: "#e8a0b8" },
  { left: "93%", delay: "1s", duration: "18s", drift: "-12px", size: 15, tone: "#f8d5e0" },
  { left: "12%", delay: "10s", duration: "17s", drift: "20px", size: 11, tone: "#c9b6e4" },
  { left: "64%", delay: "12s", duration: "22s", drift: "18px", size: 16, tone: "#f0c98a" },
] as const;

const SPARKS = [
  { left: "20%", top: "18%" },
  { left: "70%", top: "24%" },
  { left: "40%", top: "62%" },
  { left: "82%", top: "70%" },
  { left: "10%", top: "54%" },
] as const;

type Props = {
  celebrate?: boolean;
};

export function Atmosphere({ celebrate = false }: Props) {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#3a2158_0%,#2a1840_42%,#4a2748_100%)]" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2">
        <div className="sky-glow h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(247,201,214,0.38),transparent_68%)]" />
      </div>
      <div className="sky-glow absolute right-[-10%] bottom-[-8%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(212,194,239,0.32),transparent_70%)]" />
      <div className="absolute bottom-0 left-0 h-1/2 w-full bg-[linear-gradient(180deg,transparent,rgba(196,69,106,0.18))]" />
      {celebrate ? (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(243,208,154,0.22),transparent_55%)]" />
      ) : null}
      {STARS.map((star) => (
        <span
          key={`${star.left}-${star.top}`}
          className={`star absolute rounded-full ${star.gold ? "bg-gold" : "bg-cream"}`}
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            ["--star-opacity" as string]: String(star.opacity),
            ["--delay" as string]: star.delay,
            ["--dur" as string]: star.duration,
          }}
        />
      ))}
      {SPARKS.map((spark) => (
        <span
          key={`${spark.left}-${spark.top}`}
          className="spark absolute h-1.5 w-1.5 rounded-full bg-gold"
          style={{ left: spark.left, top: spark.top, ["--delay" as string]: "0.6s", ["--dur" as string]: "3.4s" }}
        />
      ))}
      {PETALS.map((petal) => (
        <span
          key={`${petal.left}-${petal.delay}`}
          className="petal absolute top-[-8vh] block"
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size * 1.4,
            background: petal.tone,
            borderRadius: "70% 30% 70% 30%",
            ["--delay" as string]: petal.delay,
            ["--dur" as string]: petal.duration,
            ["--drift" as string]: petal.drift,
          }}
        />
      ))}
    </div>
  );
}
