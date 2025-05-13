import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { StarsBackground } from "./ui/Starry";
import { ShootingStars } from "./ui/ShootingStars";

const letterText = `To the one I never saw coming, but now can't imagine a world without,

I used to think love was loudd likee fireworks, grand gestures, something you chase.  
But you... you arrived like a quiet sunrise on a random new year's eve.  
Soft. Certain. And suddenlyy, everything made sensee.  

You didn't just steal my heart cutiee you litterally slipped into every corner of my life,  
turning silence into comfortt, chaos into calm,  
and loneliness into something I forgot that ever existedd.

I don't say this enough at all maybe because words always feel too small and i cant really express.  
But you need to know cutiee:  
There are pieces of me I never thought I'd share with anyone at all…  
and yet, with you my babyy, I've handed over every one willingly without a secondd thoughtt.  

Every laugh, every late-night thoughtt, every version of me —  
you have them all honeyybee.  

And if I've been quiet latelyy, it's only because loving you this much scares me —  
in the most beautifully, breathtaking wayy.  

Happieestt Birthday, my Heartt.  
This letter is more than ink and paperr —  
it's somee off everything I've ever felt and never said out loudd.

— Forever yours,  
Farhan`;

export default function LoveLetterScene() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [inkLevel, setInkLevel] = useState(100);
  const characters = letterText.split("");
  const letterRef = useRef(null);

  useEffect(() => {
    if (!started) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= characters.length) {
          clearInterval(interval);
          return prev;
        }
        // Randomly decrease ink level as typing progresses
        if (Math.random() > 0.7)
          setInkLevel((prev) => Math.max(prev - 0.3, 30));
        return prev + 1;
      });
    }, 35);

    return () => clearInterval(interval);
  }, [started, characters.length]);

  const visibleText = characters.slice(0, currentIndex).join("");

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#1a1a40] to-[#1a1a40] overflow-x-hidden overflow-y-auto px-4 py-20 flex flex-col items-center text-pink-100 font-['Schoolbell']">
      <StarsBackground />
      <ShootingStars />

      {!started && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-8"
        >
          <motion.div
            animate={{
              rotate: [0, -5, 5, -5, 0],
              y: [0, -10, -10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            <svg className="w-24 h-24 text-pink-300" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
              />
            </svg>
          </motion.div>
          <motion.button
            onClick={() => setStarted(true)}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(255, 182, 193, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            className="z-10 bg-gradient-to-br from-[#ffe8e8] to-[#ffd6e7] text-[#5e3c3c] px-8 py-4 rounded-xl text-2xl shadow-lg backdrop-blur-md ring-1 ring-pink-200/30 font-['Dancing_Script'] transition-all hover:shadow-pink-200/40"
          >
            Open Your Letter
          </motion.button>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1.5 }}
            className="text-pink-300/70 text-sm mt-4"
          >
            (click the button above)
          </motion.p>
        </motion.div>
      )}

      {started && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="z-10 max-w-3xl w-full mt-8 bg-[#fffdf8] bg-opacity-90 backdrop-blur-2xl shadow-[0_20px_60px_rgba(255,204,229,0.3)] rounded-3xl p-6 sm:p-10 md:p-12 border border-[#f3d7c3] text-[#5e3c3c] text-[1.1rem] sm:text-lg leading-8 sm:leading-9 tracking-wide font-['Schoolbell'] relative overflow-hidden"
          ref={letterRef}
        >
          {/* Unified ink indicator positioning */}
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/90 px-3 py-1 rounded-full shadow-sm border border-[#f3d7c3] z-20">
            <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24">
              <path
                fill={`hsl(330, 50%, ${inkLevel}%)`}
                d="M18.5,2H5.5A1.5,1.5 0 0,0 4,3.5V20.5A1.5,1.5 0 0,0 5.5,22H18.5A1.5,1.5 0 0,0 20,20.5V3.5A1.5,1.5 0 0,0 18.5,2M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
              />
            </svg>
            <span className="text-xs font-mono text-[#5e3c3c]">
              {Math.round(inkLevel)}% ink
            </span>
          </div>

          {/* Text container with consistent padding */}
          <div className="relative z-10 pt-0">
            <pre
              className="whitespace-pre-wrap break-words font-['Schoolbell']"
              style={{
                filter: `brightness(${Math.max(
                  inkLevel / 100 + 0.5,
                  0.7
                )}) contrast(${Math.max(inkLevel / 50 + 1, 1.1)})`,
                paddingTop: "2rem", // Ensures space for ink indicator
              }}
            >
              {visibleText}
            </pre>
          </div>
        </motion.div>
      )}
    </section>
  );
}
