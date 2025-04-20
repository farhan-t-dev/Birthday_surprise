// src/components/BirthdayWish.jsx
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useEffect } from "react";

export default function BirthdayWish() {
  const { width, height } = useWindowSize();

  useEffect(() => {
    const confettiContainer = document.getElementById("confetti-container");
    const birthdayWish = document.getElementById("birthday-wish");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          confettiContainer?.classList.remove("opacity-0", "pointer-events-none");
          setTimeout(() => {
            confettiContainer?.classList.add("opacity-0", "pointer-events-none");
          }, 15000); // Confetti disappears after 5 seconds
        }
      },
      {
        threshold: 0.5, // Adjust based on how early/late you want it to disappear
      }
    );

    if (birthdayWish) observer.observe(birthdayWish);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="birthday-wish" className="relative overflow-hidden">
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-[#0b0c2a] to-[#1a1a40] px-4 relative overflow-hidden">
        <div
          id="confetti-container"
          className="absolute inset-0 z-10 transition-opacity duration-1000 opacity-0 pointer-events-none"
        >
          <Confetti
            width={width}
            height={height}
            numberOfPieces={200}
            gravity={0.3}
            tweenDuration={300}
          />
        </div>
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
