// src/components/WelcomeScreen.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { Meteors } from "./Meteor";

interface WelcomeScreenProps {
  onContinue: () => void;
}

export default function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  const handleEnter = () => {
    setTimeout(() => {
      onContinue();
    }, 1500);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0b0c2a] to-[#1a1a40] text-center px-4 overflow-hidden">
      {/* Typewriter Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="text-3xl sm:text-5xl font-['Dancing_Script'] text-pink-200 z-10"
      >
        <Typewriter
          words={[
            "Shhh... Something special is waiting 🎁",
            "Ready for a surprise?",
          ]}
          loop={true}
          cursor
          cursorStyle="|"
          typeSpeed={60}
          deleteSpeed={30}
          delaySpeed={2000}
        />
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="mt-6 text-pink-100 max-w-md text-base sm:text-lg z-10"
      >
        You’ve just stepped into a world made just for you... ✨ Tap the button
        below when you're ready 💫
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleEnter}
        className="relative mt-10 px-6 py-3 bg-pink-500 text-white rounded-full shadow-lg text-lg font-semibold hover:bg-pink-600 transition-all z-10 before:content-[''] before:absolute before:inset-0 before:rounded-full before:blur-xl before:bg-pink-500 before:opacity-60 before:z-[-1]"
      >
        Enter
      </motion.button>
      {/* Meaty part - Meteor effect */}
      <Meteors number={20} />

    </div>
  );
}
