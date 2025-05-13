// src/context/AudioProvider.tsx
import React, { createContext, useContext, useRef, useState } from "react";

interface Track {
  src: string;
  title: string;
}

interface AudioCtx {
  playing: boolean;
  current: Track;
  next: () => void;
  prev: () => void;
  toggle: () => void;
}

const AudioContext = createContext<AudioCtx | null>(null);
export const useAudio = () => useContext(AudioContext)!;

/* ---- your playlist ---- */
const playlist: Track[] = [
  { src: "/music/a-thousand-years.mp3",        title: "Thousand Years" },
  { src: "/music/ed-sheeran-perfect.mp3",      title: "Perfect" },
  { src: "/music/i-love-you-3000.mp3",         title: "I Love You 3000" },
  { src: "/music/tumi-amar-onek-shokher.mp3",         title: "Tumi amar onek shokher" },
  { src: "/music/tomake-chai.mp3",         title: "Tomake Chai" },
  { src: "/music/blue.mp3",         title: "Blue" },
  { src: "/music/its-you.mp3",         title: "Its You" },
  { src: "/music/love-you-with-all-my-heart.mp3",         title: "Love you with all my heart" },
  { src: "/music/spring-snow.mp3",         title: "Spring Snow" },
];

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  const playIdx = (i: number) => {
    setIndex(i);
    const audio = audioRef.current!;
    audio.src = playlist[i].src;
    audio.play().catch(() => {});
    setPlaying(true);
  };

  const toggle = () => {
    const audio = audioRef.current!;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => playIdx(index));
      setPlaying(true);
    }
  };

  const next = () => playIdx((index + 1) % playlist.length);
  const prev = () => playIdx((index - 1 + playlist.length) % playlist.length);

  /** auto‑advance when a track ends */
  const onEnded = () => next();

  return (
    <AudioContext.Provider value={{ playing, current: playlist[index], next, prev, toggle }}>
      <audio
        ref={audioRef}
        src={playlist[0].src}
        preload="auto"
        loop={false}
        onEnded={onEnded}
        className="hidden"
      />
      {children}
    </AudioContext.Provider>
  );
};