import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const letterText = `To the love that found me quietly,

There are stars, and then there's you—
brighter, softer, and endlessly mine.

You don’t just exist in my world, you *are* my world.
A thousand lifetimes wouldn’t be enough to thank the universe for you.

Happy Birthday, my heart. This letter holds only a fraction of what I feel.

— Yours, always
Farhan`;

export default function LoveLetterScene() {
  const [visibleText, setVisibleText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setVisibleText((prev) => prev + letterText[i]);
      i++;
      if (i >= letterText.length) clearInterval(interval);
    }, 35);
    return () => clearInterval(interval);
  }, [started]);

  return (
    <section className="relative h-screen bg-gradient-to-b from-[#1a1a40] to-[#0d0d2c] overflow-hidden px-4 py-20 flex flex-col items-center justify-center text-pink-100 font-['Great_Vibes']">
      {/* Meteor Shower Background */}


      {/* Movie Scroll Reveal */}
      {!started && (
        <motion.button
          onClick={() => setStarted(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="z-10 bg-[#ffe8e8] text-[#5e3c3c] px-8 py-4 rounded-xl text-2xl shadow-lg backdrop-blur-md ring-1 ring-pink-200/30 font-['Dancing_Script'] transition-all"
        >
          Read The Letter
        </motion.button>
      )}

      {/* Letter Reveal */}
      {started && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="z-10 max-w-3xl w-full mt-8 bg-[#fff9f3] bg-opacity-80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 md:p-12 border border-[#f3d7c3] text-[#5e3c3c] text-xl leading-relaxed tracking-wide"
        >
          <pre className="whitespace-pre-wrap font-['Courier_New']">{visibleText}</pre>
        </motion.div>
      )}
    </section>
  );
}
