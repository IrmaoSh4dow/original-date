import { useEffect, useRef, useState } from "react";

const source = "/Morat.mp3";
const storageKey = "para-ti-volumen";

function readVolume(): number {
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw === null) return 0.4;
    const value = Number(raw);
    if (!Number.isFinite(value)) return 0.4;
    return Math.min(1, Math.max(0, value));
  } catch {
    return 0.4;
  }
}

export function MusicControl() {
  const mediaRef = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState(readVolume);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;
    media.volume = volume;
    try {
      localStorage.setItem(storageKey, String(volume));
    } catch {
      // El volumen sigue en esta visita aunque el navegador no lo guarde.
    }
  }, [volume]);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;
    const start = () => {
      void media.play().catch(() => undefined);
    };
    start();
    window.addEventListener("pointerdown", start);
    return () => window.removeEventListener("pointerdown", start);
  }, []);

  return (
    <>
      <audio ref={mediaRef} src={source} loop preload="auto" className="pointer-events-none fixed h-px w-px opacity-0" />
      <label className="fixed top-[max(0.75rem,env(safe-area-inset-top))] right-3 z-[90] flex items-center gap-2 rounded-full border border-white/20 bg-[#2a1840]/80 px-3 py-2 shadow-[0_8px_24px_rgba(12,6,20,0.35)] backdrop-blur-sm">
        <span className="font-sans text-sm font-semibold text-blush">Volumen</span>
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(volume * 100)}
          onChange={(event) => setVolume(Number(event.target.value) / 100)}
          aria-label="Volumen de la música"
          className="h-1.5 w-24 cursor-pointer accent-cherry sm:w-32"
        />
      </label>
    </>
  );
}
