// src/components/BirthdayWish.tsx
import { motion, useAnimation } from "framer-motion";
import { ChevronDown, Sparkles, Heart } from "lucide-react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useEffect, useState, useCallback, memo } from "react";
import { StarsBackground } from "./ui/Starry";

const FloatingDecorations = memo(() => {
  const colors = ["bg-pink-300", "bg-purple-300", "bg-yellow-300", "bg-blue-300"];
  
  return (
    <>
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute ${colors[i % colors.length]} rounded-full blur-sm`}
          style={{
            width: `${Math.random() * 3 + 2}px`,
            height: `${Math.random() * 3 + 2}px`,
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
          }}
          animate={{
            y: [0, Math.random() * 40 - 20, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
});

// Updated PhotoFrame component
const PhotoFrame = ({ showSparkles }: { showSparkles: boolean }) => {
  const controls = useAnimation();
  const photoSize = 224; // w-56 = 224px

  useEffect(() => {
    controls.start({
      rotate: [0, -3, 3, 0], // Softer wobble
      transition: { duration: 1.5 }
    });
  }, [controls]);

  return (
    <motion.div
      animate={controls}
      whileHover={{ scale: 1.03 }} // More subtle hover
      className="relative z-10 mb-10 mx-auto" // Centered
      style={{ width: photoSize, height: photoSize }}
    >
      {/* Main Photo */}
      <div className="relative w-full h-full">
        <img
          src="/images/birthday_cutie.jpg"
          alt="Her smiling portrait"
          className="w-full h-full object-cover rounded-xl border-4 border-pink-300/80
                   shadow-[0_0_30px_rgba(255,182,193,0.6)] hover:shadow-[0_0_50px_rgba(255,182,193,0.8)]
                   transition-all duration-500 z-20"
        />

        {/* Floating Hearts */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-400/90"
            style={{
              left: '50%',
              top: '50%',
              x: `${Math.cos((i * 45) * Math.PI/180) * 110}px`,
              y: `${Math.sin((i * 45) * Math.PI/180) * 110}px`,
            }}
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.7, 1, 0.7],
              rotate: [0, 20],
            }}
            transition={{
              delay: i * 0.15,
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Heart className="w-7 h-7 fill-pink-400/40" />
          </motion.div>
        ))}
      </div>

      {/* Sparkles */}
      {showSparkles && (
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-yellow-300"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                delay: Math.random() * 2,
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: Math.random() * 5
              }}
            >
              <Sparkles className="w-3 h-3" />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

const HeartPulse = memo(() => {
  return (
    <motion.div
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="absolute top-1/4 left-1/4"
    >
      <Heart className="w-10 h-10 text-pink-500 fill-pink-500/30" />
    </motion.div>
  );
});

const ScrollHint = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: -5 }}
    animate={{ opacity: 1, y: [0, 5, 0] }}
    transition={{ delay: 3, repeat: Infinity, duration: 2 }}
    className="absolute bottom-10 text-white flex flex-col items-center"
  >
    <span className="text-sm text-pink-100 mb-1">Scroll for more magic</span>
    <ChevronDown className="w-5 h-5 animate-bounce" />
  </motion.div>
));

export default function BirthdayWish() {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  const handleConfetti = useCallback(() => {
    const timeout = setTimeout(() => {
      setShowConfetti(true);
      setShowSparkles(true);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(handleConfetti, [handleConfetti]);

  return (
    <section id="birthday-wish" className="relative overflow-hidden">
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-[#0b0c2a] to-[#1a1a40] px-4 relative overflow-hidden">
        <PhotoFrame showSparkles={showSparkles} />

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl font-['Dancing_Script'] text-pink-200"
          whileHover={{ scale: 1.05 }}
        >
          Happy Birthday, My Shining Star 🌟
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1.4 }}
          className="mt-4 text-lg sm:text-xl max-w-md text-pink-100"
        >
          May your day be as magical as you've made mine every day{' '}
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block"
          >
            ✨
          </motion.span>
        </motion.p>

        <FloatingDecorations />
        <StarsBackground />
        <HeartPulse />

        {showConfetti && (
          <Confetti
            width={width}
            height={height}
            numberOfPieces={300}
            recycle={false}
            gravity={0.5}
            colors={['#ff9ff3', '#feca57', '#ff6b6b', '#48dbfb']}
            onConfettiComplete={() => setShowConfetti(false)}
          />
        )}

        <ScrollHint />
      </div>
    </section>
  );
}