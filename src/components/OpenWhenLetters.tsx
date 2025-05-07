import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareHeart } from "lucide-react";

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
  const [openedLetter, setOpenedLetter] = useState<null | (typeof letters)[0]>(null);

  const closeModal = useCallback(() => {
    setOpenedLetter(null);
  }, []);

  // Simple shuffle without animation to prevent lag
  const shuffleLetters = useCallback(() => {
    const shuffled = [...letters].sort(() => Math.random() - 0.5);
    setOpenedLetter(shuffled[0] || null);
  }, []);

  return (
    <section className="relative min-h-[90vh] bg-gradient-to-b from-[#0b0c1a] to-[#0b0c1a] flex flex-col items-center justify-center overflow-hidden px-4 pb-12">
      {/* Title with simple fade */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-pink-200 text-2xl md:text-3xl font-semibold mb-10 text-center z-10"
      >
        Open When You Feel Like It 💌
      </motion.h2>

      {/* Shuffle button */}
      <button 
        onClick={shuffleLetters}
        className="px-4 py-2 bg-pink-500/20 text-pink-200 rounded-full text-sm mb-10 hover:bg-pink-500/30 transition-all"
      >
        Shuffle Letters 🔀
      </button>

      {/* Letters with uneven layout and subtle hover */}
      <div className="relative flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-14 z-10 max-w-6xl mx-auto">
        {letters.map((letter, index) => (
          <motion.button
            key={letter.id}
            onClick={() => setOpenedLetter(letter)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              rotate: index % 2 === 0 ? 2 : -2,
              transition: { delay: index * 0.1, duration: 0.4 }
            }}
            whileHover={{ 
              y: -3,
              transition: { duration: 0.2 },
              scale: 1.03, // Subtle scale effect
            }}
            whileTap={{ scale: 0.98 }}
            className={`relative w-44 sm:w-48 h-56 sm:h-64 ${letter.color} 
              border border-pink-400/30 rounded-3xl flex items-center 
              justify-center text-center font-semibold text-pink-100 text-sm sm:text-lg 
              p-6 shadow-lg`}
            style={{
              transformStyle: 'preserve-3d'
            }}
          >
            <span className="text-4xl">{letter.icon}</span>
            <div className="absolute bottom-4 w-full text-center text-sm sm:text-base mt-2">
              {letter.title}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Elegant modal with parchment effect */}
      <AnimatePresence>
        {openedLetter && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative bg-[#f8f4e8] border-2 border-[#e8d8b8] rounded-lg sm:rounded-xl p-6 sm:p-8 w-full max-w-xs sm:max-w-md mx-2 text-[#5a4a3a] text-center shadow-2xl"
              initial={{ scale: 0.96, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 10 }}
              transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Parchment texture */}
              <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmOGY0ZTgiLz48cGF0aCBkPSJNMjAgMjBDNDAgNDAgNjAgMjAgODAgNDAiIHN0cm9rZT0iI2U4ZDhiOCIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2Utb3BhY2l0eT0iMC4xIi8+PHBhdGggZD0iTTQwIDQwQzYwIDYwIDgwIDQwIDEwMCA2MCIgc3Ryb2tlPSIjZThkOGI4IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz48L3N2Zz4=')]"></div>
              
              {/* Wax seal decoration */}
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-xl shadow-lg border-2 border-red-300/50">
              <MessageSquareHeart />
              </div>
              
              <h2 className="relative text-xl sm:text-2xl font-bold mb-4 text-[#3a2c1e] font-serif">
                {openedLetter.title}
              </h2>
              <p className="relative text-sm sm:text-base font-light italic text-[#5a4a3a] mb-6 leading-relaxed">
                {openedLetter.message}
              </p>

              <motion.button
                onClick={closeModal}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-5 py-2 bg-[#c9a982] text-[#3a2c1e] rounded-full text-sm shadow-md hover:bg-[#b89872] transition-all border border-[#a08062]"
              >
                Close Letter
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
