import React, { memo, useRef, useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";
import { useAudio } from "../../context/AudioProvider";
import { debounce } from "lodash";

const SeamlessMarquee = ({ text }: { text: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      // Measure the actual text width
      const width = containerRef.current.scrollWidth / 2; // Since we duplicate content
      setContentWidth(width);
    }
  }, [text]);

  return (
    <div 
      ref={containerRef}
      className="w-full max-w-[220px] sm:max-w-xs overflow-hidden rounded-md bg-[#ffffff1a] backdrop-blur px-3 py-1 text-pink-100 text-sm relative"
    >
      <motion.div
        className="whitespace-nowrap will-change-transform"
        animate={{ 
          x: [0, -contentWidth], // Animate by exact content width
        }}
        transition={{ 
          duration: contentWidth * 0.10, // Speed based on length (0.02s per pixel)
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop" 
        }}
      >
        {text} {/* Visible content */}
        <span className="opacity-0 absolute">{text}</span> {/* Hidden measurement */}
        <span className="ml-4">{text}</span> {/* Duplicated for seamless loop */}
      </motion.div>
    </div>
  );
};

// Memoized Play/Pause Button
const PlayPauseButton = memo(({
  playing,
  onClick,
}: {
  playing: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    aria-label={playing ? "Pause music" : "Play music"}
    className="bg-pink-500 hover:bg-pink-600 text-white w-11 h-11 rounded-full flex items-center justify-center shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 focus:ring-offset-[#0b0c1a]"
  >
    <motion.span
      key="play-pause-icon"
      animate={{
        scale: playing ? [0.9, 1.1, 1] : [1.1, 0.9, 1],
      }}
      transition={{ duration: 0.3 }}
    >
      {playing ? <Pause size={22} /> : <Play size={22} className="ml-0.5" />}
    </motion.span>
  </button>
));

// Memoized Next Button
const NextButton = memo(({
  onClick,
}: {
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    aria-label="Next track"
    className="bg-pink-500 hover:bg-pink-600 text-white w-11 h-11 rounded-full flex items-center justify-center shadow transition-colors duration-200 group focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 focus:ring-offset-[#0b0c1a]"
  >
    <motion.span
      whileTap={{ x: 2 }}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <SkipForward 
        size={18} 
        className="group-hover:translate-x-0.5 transition-transform duration-200" 
      />
    </motion.span>
  </button>
));

// Memoized Previous Button
const PrevButton = memo(({
  onClick,
}: {
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    aria-label="Previous track"
    className="bg-pink-500 hover:bg-pink-600 text-white w-11 h-11 rounded-full flex items-center justify-center shadow transition-colors duration-200 group focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 focus:ring-offset-[#0b0c1a]"
  >
    <motion.span
      whileTap={{ x: -2 }}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <SkipBack 
        size={18} 
        className="group-hover:-translate-x-0.5 transition-transform duration-200" 
      />
    </motion.span>
  </button>
));

export default function MusicToggle() {
  const { playing, toggle, next, prev, current } = useAudio();

  // Debounce rapid clicks
  const debouncedNext = useMemo(() => debounce(next, 300), [next]);
  const debouncedPrev = useMemo(() => debounce(prev, 300), [prev]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        toggle();
      } else if (e.code === "ArrowRight") debouncedNext();
      else if (e.code === "ArrowLeft") debouncedPrev();
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggle, debouncedNext, debouncedPrev]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2 max-w-[90vw]">
      {/* // Replace your current track label with: */}
      <SeamlessMarquee text={current.title} />
      {/* Controls */}
      <div className="flex items-center gap-2">
        <PrevButton onClick={debouncedPrev} />
        <PlayPauseButton playing={playing} onClick={toggle} />
        <NextButton onClick={debouncedNext} />
      </div>
    </div>
  );
}