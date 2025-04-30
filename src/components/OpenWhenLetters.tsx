import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const letters = [
  {
    id: 1,
    title: "Open When You're Happy",
    message: "Your smile is the most beautiful thing in the world. 💖",
    color: "bg-gradient-to-br from-yellow-300 to-orange-400",
    icon: "✨",
  },
  {
    id: 2,
    title: "Open When You're Sad",
    message: "Even clouds have silver linings. I'm here for you. 🌧️",
    color: "bg-gradient-to-br from-blue-300 to-indigo-500",
    icon: "☁️",
  },
  {
    id: 3,
    title: "Open When You Miss Me",
    message: "Distance can't change the love I feel. 🌙",
    color: "bg-gradient-to-br from-pink-300 to-purple-500",
    icon: "💭",
  },
  {
    id: 4,
    title: "Open When You Need Love",
    message: "You are endlessly loved, just as you are. 💌",
    color: "bg-gradient-to-br from-red-400 to-pink-600",
    icon: "❤️",
  },
  {
    id: 5,
    title: "Open When You're Feeling Overwhelmed",
    message: "Breathe in... Breathe out. You're stronger than you think. 🌱",
    color: "bg-gradient-to-br from-green-400 to-teal-600",
    icon: "🍃",
  },
  {
    id: 6,
    title: "Open When You're Angry",
    message: "It's okay to feel this way, but don't let it consume you. 🔥",
    color: "bg-gradient-to-br from-red-500 to-yellow-600",
    icon: "😡",
  },
];

export default function FloatingLetters() {
  const [openedLetter, setOpenedLetter] = useState<null | (typeof letters)[0]>(
    null
  );

  const shuffleLetters = () => {
      const shuffled = [...letters].sort(() => Math.random() - 0.5);
      setOpenedLetter(shuffled[0] || null); // Set the first letter or null if empty
  };

  return (
    <section className="relative min-h-[90vh] bg-gradient-to-b from-[#0b0c1a] to-[#0b0c1a] flex flex-col items-center justify-center overflow-hidden px-4 pb-12">

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-pink-200 text-2xl md:text-3xl font-semibold mb-10 text-center z-10"
      >
        Open When You Feel Like It 💌
      </motion.h2>

      {/* Shuffler */}
      <button 
  onClick={shuffleLetters}
  className="px-4 py-2 bg-pink-500/20 text-pink-200 rounded-full text-sm mb-10 hover:bg-pink-500/30 transition-all"
>
  Shuffle Letters 🔀
</button>

      {/* Floating Letters */}
      <div className="relative flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-14 z-10 max-w-6xl mx-auto">
        {letters.map((letter, index) => (
          <motion.button
            key={letter.id}
            onClick={() => setOpenedLetter(letter)}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className={`relative w-44 sm:w-48 h-56 sm:h-64 ${
              letter.color
            } border border-pink-400/30 rounded-3xl backdrop-blur-lg flex items-center justify-center text-center font-semibold text-pink-100 text-sm sm:text-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 transform ${
              index % 2 === 0 ? "rotate-2" : "rotate-[-2deg]"
            }`}
            style={{
              animation: `float ${5 + index}s ease-in-out infinite`,
              zIndex: index + 1,
            }}
          >
            <span className="text-4xl">{letter.icon}</span>
            <div className="absolute bottom-4 w-full text-center text-sm sm:text-base mt-2">
              {letter.title}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Opened Letter Modal */}
      <AnimatePresence>
        {openedLetter && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#1a1a2e] border border-pink-400/30 rounded-3xl p-8 max-w-md text-pink-100 text-center shadow-2xl"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4">{openedLetter.title}</h2>
              <p className="text-pink-200 font-light italic text-base">
                {openedLetter.message}
              </p>

              <button
                onClick={() => setOpenedLetter(null)}
                className="mt-6 px-5 py-2 bg-pink-400 text-white rounded-full shadow hover:bg-pink-500 transition-all duration-300"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </section>
  );
}
