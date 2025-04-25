// src/components/BirthdayWish.jsx
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useEffect, useState } from "react";
import { StarsBackground } from "./ui/Starry";

export default function BirthdayWish() {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowConfetti(true), 2500); // show after 2.5s
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section id="birthday-wish" className="relative overflow-hidden">
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-[#0b0c2a] to-[#1a1a40] px-4 relative overflow-hidden">
        {/* Her photo */}
        <motion.div
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative z-10 mb-10"
        >
          {/* Photo */}
          <img
            src="/images/her-portrait.jpg"
            alt="Her smiling portrait"
            className="relative w-44 h-44 sm:w-56 sm:h-56 object-cover rounded-xl
               border-4 border-pink-300 shadow-[0_0_25px_rgba(255,192,203,0.35)]"
          />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl font-['Dancing_Script'] text-pink-200"
        >
          Happy Birthday, My Star 🌟
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1.4 }}
          className="mt-4 text-lg sm:text-xl max-w-md text-pink-100"
        >
          May your day be as magical as you’ve made mine every day 💫
        </motion.p>

        {/* Sparkly floating shapes (just some soft effects) */}
        <div className="absolute top-10 left-10 w-3 h-3 bg-pink-300 rounded-full blur-sm animate-pulse"></div>
        <div className="absolute bottom-12 right-10 w-2 h-2 bg-white rounded-full blur-sm animate-bounce"></div>
        <div className="absolute top-1/3 right-1/4 w-2.5 h-2.5 bg-yellow-300 rounded-full blur-md animate-ping"></div>

        {/* Starry animation */}
        <StarsBackground />

        {/* Confetti Explosion */}
        {showConfetti && (
          <Confetti
            width={width}
            height={height}
            numberOfPieces={450}
            recycle={false}
            gravity={0.5}
          />
        )}

        {/* Scroll Down Hint */}
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: [0, 5, 0] }}
          transition={{ delay: 3, repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 text-white flex flex-col items-center"
        >
          <span className="text-sm text-pink-100 mb-1">Scroll down</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
