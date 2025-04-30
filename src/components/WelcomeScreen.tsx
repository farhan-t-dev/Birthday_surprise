import { useState, useCallback, memo, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { Meteors } from "./ui/Meteor";

interface WelcomeScreenProps {
  onContinue: () => void;
}

const TypewriterMessages = memo(() => (
  <div className="min-h-[4.5rem] sm:min-h-[6rem]"> {/* Fixed height container */}
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
  </div>
));

const WelcomeButton = memo(({ onClick }: { onClick: () => void }) => {
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.95 }
  };

  return (
    <motion.button
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      className="relative mt-10 px-6 py-3 bg-pink-500/90 text-white rounded-full shadow-lg text-lg font-semibold hover:bg-pink-600 transition-all z-10 before:absolute before:inset-0 before:rounded-full before:blur-xl before:bg-pink-500/40 before:-z-10"
      aria-label="Enter the experience"
    >
      Enter
    </motion.button>
  );
});

export default function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  const [isExiting, setIsExiting] = useState(false);

  const handleEnter = useCallback(() => {
    setIsExiting(true);
    const timer = setTimeout(onContinue, 800);
    return () => clearTimeout(timer);
  }, [onContinue]);

  const memoizedMeteors = useMemo(() => (
    <Meteors 
      number={10}
      className="z-0 pointer-events-none"
    />
  ), []);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        type: "spring", 
        damping: 10,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.8 }
    }
  };

  const childVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          key="welcome-screen"
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0b0c2a] to-[#1a1a40] text-center px-4 overflow-hidden"
        >
          <motion.div 
            variants={childVariants}
            className="z-10 space-y-6 w-full max-w-lg"
          >
            {/* Fixed height typewriter container */}
            <div className="flex flex-col items-center">
              <h1 className="text-3xl sm:text-5xl font-['Dancing_Script'] text-pink-200/90 w-full">
                <TypewriterMessages />
              </h1>
            </div>

            {/* Paragraph now stays fixed */}
            <motion.p
              className="text-pink-100/90 text-base sm:text-lg mt-4"
            >
              You've just stepped into a world made just for you... ✨<br />
              Tap the button below when you're ready 💫
            </motion.p>
          </motion.div>

          <motion.div variants={childVariants}>
            <WelcomeButton onClick={handleEnter} />
          </motion.div>
          
          {memoizedMeteors}

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-pink-300/40 text-2xl"
                initial={{
                  x: Math.random() * 100 - 50,
                  y: Math.random() * 100 - 50,
                  opacity: 0
                }}
                animate={{
                  y: [0, -100],
                  opacity: [0, 0.4, 0],
                  transition: {
                    duration: Math.random() * 10 + 10,
                    repeat: Infinity,
                    delay: Math.random() * 5
                  }
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              >
                ❤️
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="exit-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 bg-[#0b0c2a] z-50"
        />
      )}
    </AnimatePresence>
  );
}