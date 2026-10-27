const HEARTS = [
  { left: "4%", delay: "0s", duration: "12s", drift: "24px", size: 18, color: "#f7c9d6" },
  { left: "8%", delay: "6.2s", duration: "14s", drift: "-14px", size: 11, color: "#fff6ef" },
  { left: "12%", delay: "2.4s", duration: "15s", drift: "-18px", size: 14, color: "#e8a0b8" },
  { left: "17%", delay: "9s", duration: "13s", drift: "22px", size: 20, color: "#f3d09a" },
  { left: "22%", delay: "4.1s", duration: "16s", drift: "-10px", size: 12, color: "#f7c9d6" },
  { left: "27%", delay: "1.1s", duration: "11s", drift: "28px", size: 22, color: "#e07a92" },
  { left: "32%", delay: "7.4s", duration: "14s", drift: "-22px", size: 15, color: "#f3d09a" },
  { left: "37%", delay: "3.3s", duration: "17s", drift: "16px", size: 13, color: "#f7c9d6" },
  { left: "42%", delay: "10s", duration: "12s", drift: "-8px", size: 19, color: "#e8a0b8" },
  { left: "47%", delay: "5.5s", duration: "15s", drift: "20px", size: 16, color: "#fff6ef" },
  { left: "52%", delay: "0.6s", duration: "13s", drift: "-26px", size: 23, color: "#f3d09a" },
  { left: "57%", delay: "8.2s", duration: "16s", drift: "12px", size: 12, color: "#e07a92" },
  { left: "62%", delay: "2.8s", duration: "11s", drift: "-16px", size: 18, color: "#f7c9d6" },
  { left: "67%", delay: "11s", duration: "14s", drift: "26px", size: 14, color: "#e8a0b8" },
  { left: "72%", delay: "4.8s", duration: "15s", drift: "-12px", size: 21, color: "#f3d09a" },
  { left: "76%", delay: "1.6s", duration: "12s", drift: "18px", size: 13, color: "#fff6ef" },
  { left: "81%", delay: "7s", duration: "17s", drift: "-20px", size: 24, color: "#e8a0b8" },
  { left: "86%", delay: "3.8s", duration: "13s", drift: "14px", size: 15, color: "#f7c9d6" },
  { left: "91%", delay: "9.4s", duration: "15s", drift: "-18px", size: 17, color: "#e07a92" },
  { left: "96%", delay: "0.3s", duration: "14s", drift: "10px", size: 12, color: "#f3d09a" },
  { left: "15%", delay: "12s", duration: "16s", drift: "24px", size: 16, color: "#f7c9d6" },
  { left: "29%", delay: "13.5s", duration: "12s", drift: "-14px", size: 20, color: "#e8a0b8" },
  { left: "44%", delay: "14s", duration: "15s", drift: "8px", size: 11, color: "#f3d09a" },
  { left: "59%", delay: "12.6s", duration: "13s", drift: "-22px", size: 18, color: "#fff6ef" },
  { left: "74%", delay: "15s", duration: "17s", drift: "16px", size: 14, color: "#e07a92" },
  { left: "88%", delay: "13s", duration: "11s", drift: "-10px", size: 22, color: "#f7c9d6" },
] as const;

export function HeartField({ reduced }: { reduced: boolean | null }) {
  if (reduced) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden" aria-hidden="true">
      {HEARTS.map((heart) => (
        <span
          key={`${heart.left}-${heart.delay}`}
          className="heart absolute bottom-[-8vh] block"
          style={{
            left: heart.left,
            width: heart.size,
            height: heart.size,
            color: heart.color,
            ["--delay" as string]: heart.delay,
            ["--dur" as string]: heart.duration,
            ["--drift" as string]: heart.drift,
          }}
        >
          <svg viewBox="0 0 24 24" className="h-full w-full fill-current" aria-hidden="true">
            <path d="M12 20s-7-4.4-9.3-8.4C1 8.8 2.2 5.6 5.4 5.1 7.2 4.8 8.8 5.6 12 8.2 15.2 5.6 16.8 4.8 18.6 5.1c3.2.5 4.4 3.7 2.7 6.5C19 15.6 12 20 12 20z" />
          </svg>
        </span>
      ))}
    </div>
  );
}
