import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareHeart } from "lucide-react";

const LETTERS = [
  {
    id: 1,
    title: "Open When You're Happy",
    message: "Look at you—radiating sunshine like the universe made you out of joy itself. When you're happy, the world feels a little brighter, a little kinder. Your laughter is my favorite soundtrack, and your smile? It could melt glaciers. Savor this moment. Let your soul dance. You deserve every ounce of this joy, and I’m cheering for you like your personal happiness fan club. 🌞💃",
    color: "bg-gradient-to-br from-yellow-300 to-orange-400",
    icon: "✨",
  },
  {
    id: 2,
    title: "Open When You're Sad",
    message: "Hey love, I wish I could wrap you up in the warmest blanket, hand you a mug of your favorite comfort drink, and let you know it’s okay. You don’t always have to be strong. Sometimes, you just need to feel—and I’ll be here through it all. Sadness doesn't mean weakness, it means you're human. Even the stars need the night sky to shine. So take your time. And when you're ready, my arms are here, always. 🌧️🫂☕",
    color: "bg-gradient-to-br from-blue-300 to-indigo-500",
    icon: "☁️",
  },
  {
    id: 3,
    title: "Open When You Miss Me",
    message: "I miss you too—probably more than words could ever say. But let’s close our eyes for a second and meet in that secret place between heartbeats where distance doesn't exist. Imagine me whispering in your ear that I love you, that I’m counting down the moments until I can hold you again. You're not alone, not really—we’re stitched together by love and stardust. 🌙💫",
    color: "bg-gradient-to-br from-pink-300 to-purple-500",
    icon: "💭",
  },
  {
    id: 4,
    title: "Open When You Need Love",
    message: "Read this as if I’m holding your face gently in my hands: You. Are. Loved. So deeply. So endlessly. Not just for your smile, but for your soul. For the way you care, for the way you exist in this world with such fierce gentleness. You don’t have to do anything to earn this love—it’s already yours. On the good days, on the messy ones, on the days you feel lost. My heart sees you, and it chooses you. Always. 💌❤️",
    color: "bg-gradient-to-br from-red-400 to-pink-600",
    icon: "❤️",
  },
  {
    id: 5,
    title: "Open When You're Feeling Overwhelmed",
    message: "First: pause. Second: breathe—slowly, deeply. Now listen: You're doing so much more than you give yourself credit for. It’s okay to take a break, to not have it all figured out, to let go of the pressure for just a little while. Life isn’t a checklist—it’s a journey, and it’s okay to sit by the roadside and rest. I’m proud of you for trying, for caring, for being human. You are stronger than this moment. 🌿🧘‍♀️🌼",
    color: "bg-gradient-to-br from-green-400 to-teal-600",
    icon: "🍃",
  },
  {
    id: 6,
    title: "Open When You're Angry",
    message: "Oh no—someone poked the fire in your soul! Let it out—safely, loudly, however you need. Punch a pillow, scream into the void, write an angry poem about how socks always disappear in the laundry. Just don’t bottle it in. I won’t judge your volcano moments—I’ll just be here after the lava cools with your favorite snack and a calm presence. You’re allowed to feel this. And you’re still the person I adore, even when you’re fiery. 🔥🧃🍫",
    color: "bg-gradient-to-br from-red-500 to-yellow-600",
    icon: "😡",
  },
  {
    id: 7,
    title: "Open When You Can't Sleep",
    message: "Hey night owl, still awake? Maybe your mind is running marathons, or maybe it’s just one of those nights where the silence feels too loud. So here I am, whispering through this letter: you're safe, you're loved, and it's okay to just *be*. Imagine me beside you, tracing lazy patterns on your arm, telling you a story you’ve heard a thousand times—just to help you drift. Close your eyes. The world can wait. Let my love be your lullaby tonight. 🌙💤🕯️",
    color: "bg-gradient-to-br from-gray-700 to-indigo-900",
    icon: "🌌",
  },
  {
    id: 8,
    title: "Open When You're Doubting Yourself",
    message: "Read this carefully: you are enough. You always have been. I know your mind might be whispering lies right now—telling you you're not good enough, not smart enough, not *whatever* enough. But here’s the truth: the world is better with you in it. You’ve already overcome so much, and this moment of doubt doesn’t define you—it’s just a passing cloud. Let my belief in you carry you through until you remember your own strength. I see your magic, even when you don’t. 💫🌿",
    color: "bg-gradient-to-br from-slate-500 to-blue-800",
    icon: "🌠",
  },
  {
    id: 9,
    title: "Open When You're Feeling Lonely",
    message: "Loneliness can sneak in like fog—quiet, heavy, and invisible to the rest of the world. But you’re not alone, not really. I’m right there with you, in the space between thoughts, in the quiet warmth of your favorite blanket, in every memory that makes you smile. Close your eyes and feel it—that thread connecting us, no matter the distance. You’re deeply loved, and your presence matters more than you know. 🤍🌌",
    color: "bg-gradient-to-br from-blue-100 to-purple-300",
    icon: "🌙",
  },
  {
    id: 10,
    title: "Open When You Need to Laugh",
    message: "Okay, ready? Knock knock—who’s there? Lettuce. Lettuce who? Lettuce in, it’s cold out here! 😄 Okay, maybe not the best joke, but if it pulled even the tiniest smile, it was worth it. Life gets too serious sometimes, and I just want to remind you: joy doesn't need a reason. Watch a silly video, dance in your socks, laugh until your stomach hurts. I love your laugh—it’s my favorite melody. 🥲🎈",
    color: "bg-gradient-to-br from-yellow-200 to-pink-300",
    icon: "🤣",
  },
  {
    id: 11,
    title: "Open When You're Having a Bad Day",
    message: "Some days feel like they’re made of spilled coffee, missed buses, and tangled thoughts. It’s okay. You don’t have to fix it all right now. Come sit beside me in this little letter and let’s just exist together. You’re still amazing—even on the off days, even when you feel like a walking disaster. This day will pass, and tomorrow will be softer. Until then, let my love be your umbrella in the downpour. ☔📦",
    color: "bg-gradient-to-br from-cyan-300 to-sky-500",
    icon: "📖",
  },
  {
    id: 12,
    title: "Open When You're Overthinking",
    message: "I see those thoughts looping, spiraling, spinning stories that probably won’t even happen. You care so much—it’s beautiful. But sometimes, you need to put the thoughts down like a heavy bag you’ve been carrying too far. Here’s your permission slip to rest your mind. Breathe. Nothing is as urgent as your peace. I’ll help you untangle it all, one gentle knot at a time. 🧠🫶",
    color: "bg-gradient-to-br from-neutral-400 to-gray-600",
    icon: "🌀",
  },
  {
    id: 13,
    title: "Open When You Need to Be Reminded How Much I Love You",
    message: "Let me spell it out: I. Love. You. More than morning light spilling across your face. More than words could wrap around. It’s in the quiet moments, the chaotic ones, the little glances and the big laughs. It’s constant, like the moon pulling tides. You are the heart of so many of my smiles. If you ever forget, come back here—I’ll be reminding you forever, one heartbeat at a time. ❤️🌙",
    color: "bg-gradient-to-br from-rose-400 to-red-600",
    icon: "💖",
  },
  {
    id: 14,
    title: "Open When You're Feeling Insecure",
    message: "Hey, beautiful soul. I know your mind sometimes whispers things that aren’t true. That you’re not enough, not worthy, not as [insert cruel comparison here]. But I see you—entirely, clearly. And what I see is breathtaking. You’re more than enough. You’re *you*—and that’s irreplaceable. There’s no one else I’d rather cheer on, believe in, and love. Please be gentle with yourself. You’re doing better than you think. 🌸🌱",
    color: "bg-gradient-to-br from-violet-300 to-indigo-400",
    icon: "🌸",
  },
  {
    id: 15,
    title: "Open When You're Celebrating Something",
    message: "Pop the confetti! Whether it’s big or small—YOU DID IT! I hope you’re dancing a little, smiling a lot, and letting yourself soak in the moment. I’m so proud of you. You deserve this celebration and a dozen more. Here’s to your courage, your effort, and that spark in you that refuses to dim. Now go scream it from the rooftops—I’ll be right there clapping the loudest. 🎉🥂",
    color: "bg-gradient-to-br from-amber-200 to-yellow-400",
    icon: "🎊",
  },
];


export default function FloatingLetters() {
  const [openedLetter, setOpenedLetter] = useState<null | (typeof LETTERS)[0]>(null);
  const [isShuffling, setIsShuffling] = useState(false);

  const closeModal = useCallback(() => {
    setOpenedLetter(null);
  }, []);

  // Optimized shuffle with animation debouncing
  const shuffleLetters = useCallback(() => {
    if (isShuffling) return;
    
    setIsShuffling(true);
    const shuffled = [...LETTERS].sort(() => Math.random() - 0.5);
    setOpenedLetter(shuffled[0] || null);
    
    // Reset shuffling state after animation would complete
    setTimeout(() => setIsShuffling(false), 300);
  }, [isShuffling]);

  // Memoize letter components to prevent unnecessary re-renders
  const letterComponents = useMemo(() => (
    LETTERS.map((letter, index) => (
      <LetterCard 
        key={letter.id}
        letter={letter}
        index={index}
        onClick={() => setOpenedLetter(letter)}
      />
    ))
  ), []);

  return (
    <section className="relative min-h-[90vh] bg-[#0b0c1a] flex flex-col items-center justify-center overflow-hidden px-4 pb-12">
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
      <motion.button 
        onClick={shuffleLetters}
        disabled={isShuffling}
        whileTap={!isShuffling ? { scale: 0.95 } : undefined}
        className="px-4 py-2 bg-pink-500/20 text-pink-200 rounded-full text-sm mb-10 hover:bg-pink-500/30 transition-colors"
      >
        {isShuffling ? "Shuffling..." : "Shuffle Letters 🔀"}
      </motion.button>

      {/* Letters container */}
      <div className="relative flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-14 z-10 max-w-6xl mx-auto">
        {letterComponents}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {openedLetter && (
          <Modal letter={openedLetter} onClose={closeModal} />
        )}
      </AnimatePresence>
    </section>
  );
}

// Extracted LetterCard component for better performance
const LetterCard = React.memo(({ letter, index, onClick }: { 
  letter: typeof LETTERS[0], 
  index: number, 
  onClick: () => void 
}) => (
  <motion.button
    onClick={onClick}
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
      scale: 1.03,
    }}
    whileTap={{ scale: 0.98 }}
    className={`relative w-44 sm:w-48 h-56 sm:h-64 ${letter.color} 
      border border-pink-400/30 rounded-3xl flex items-center 
      justify-center text-center font-semibold text-pink-100 text-sm sm:text-lg 
      p-6 shadow-lg will-change-transform`}
  >
    <span className="text-4xl">{letter.icon}</span>
    <div className="absolute bottom-4 w-full text-center text-text-base sm:lg mt-2">
      {letter.title}
    </div>
  </motion.button>
));

// Extracted Modal component for better performance
const Modal = React.memo(({ letter, onClose }: { 
  letter: typeof LETTERS[0], 
  onClose: () => void 
}) => (
  <motion.div
    className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
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
        {letter.title}
      </h2>
      <p className="relative text-sm sm:text-base font-['Schoolbell'] text-[#5a4a3a] mb-6 leading-relaxed">
        {letter.message}
      </p>

      <motion.button
        onClick={onClose}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative px-6 py-2.5 bg-[#c9a982] text-[#3a2c1e] rounded-full text-sm shadow-md hover:bg-[#b89872] transition-colors border border-[#a08062]"
      >
        Close Letter
      </motion.button>
    </motion.div>
  </motion.div>
));