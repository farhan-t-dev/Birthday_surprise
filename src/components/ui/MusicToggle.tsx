// src/components/ui/MusicToggle.tsx
import { useAudio } from "../../context/AudioProvider";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";

export default function MusicToggle() {
  const { playing, toggle, next, prev, current } = useAudio();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2 max-w-[90vw]">
      {/* current track label */}
      <div className="w-full max-w-[220px] sm:max-w-xs overflow-hidden rounded-md bg-[#ffffff1a] backdrop-blur px-3 py-1 text-pink-100 text-sm">
        <div className="whitespace-nowrap animate-marquee">
          {current.title}
        </div>
      </div>

      {/* controls */}
      <div className="flex items-center gap-2">
        {/* prev */}
        <button
          onClick={prev}
          aria-label="Previous track"
          className="bg-pink-500 hover:bg-pink-600 text-white w-9 h-9 rounded-full flex items-center justify-center shadow"
        >
          <SkipBack size={18} />
        </button>

        {/* play / pause */}
        <button
          onClick={toggle}
          aria-label={playing ? "Pause music" : "Play music"}
          className="bg-pink-500 hover:bg-pink-600 text-white w-11 h-11 rounded-full flex items-center justify-center shadow"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={playing ? "pause" : "play"}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
            >
              {playing ? <Pause size={22} /> : <Play size={22} />}
            </motion.span>
          </AnimatePresence>
        </button>

        {/* next */}
        <button
          onClick={next}
          aria-label="Next track"
          className="bg-pink-500 hover:bg-pink-600 text-white w-9 h-9 rounded-full flex items-center justify-center shadow"
        >
          <SkipForward size={18} />
        </button>
      </div>
    </div>
  );
}
