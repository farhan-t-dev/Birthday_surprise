import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { StarsBackground } from "./ui/Starry";
import { ShootingStars } from "./ui/ShootingStars";

const letterText = `To the one I never saw coming, but now can't imagine a world without,

I used to think love was loud — fireworks, grand gestures, something you chase.  
But you... you arrived like a quiet sunrise.  
Soft. Certain. And suddenly, everything made sense.  

You didn’t just steal my heart — you slipped into every corner of my life,  
turning silence into comfort, chaos into calm,  
and loneliness into something I forgot ever existed.

I don’t say this enough — maybe because words always feel too small.  
But you need to know:  
There are pieces of me I never thought I’d share with anyone…  
and yet, with you, I’ve handed over every one willingly.  

Every laugh, every late-night thought, every version of me —  
you have them all.  

And if I’ve been quiet lately, it’s only because loving you this much scares me —  
in the most beautiful, breathtaking way.  

Happy Birthday, my heart.  
This letter is more than ink and paper —  
it’s everything I’ve ever felt and never said out loud.

— Forever yours,  
Farhan`;


export default function LoveLetterScene() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const characters = letterText.split("");

  useEffect(() => {
    if (!started) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= characters.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 35);

    return () => clearInterval(interval);
  }, [started, characters.length]);

  const visibleText = characters.slice(0, currentIndex).join("");

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#1a1a40] to-[#1a1a40] overflow-x-hidden overflow-y-auto px-4 py-20 flex flex-col items-center text-pink-100 font-['Great_Vibes']">

      <StarsBackground />
      <ShootingStars />

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

      {started && (
        <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="z-10 max-w-3xl w-full mt-8 bg-[#fffdf8] bg-opacity-90 backdrop-blur-2xl shadow-[0_20px_60px_rgba(255,204,229,0.3)] rounded-3xl p-6 sm:p-10 md:p-12 border border-[#f3d7c3] text-[#5e3c3c] text-[1.1rem] sm:text-lg leading-8 sm:leading-9 tracking-wide font-['Courier_New'] relative overflow-hidden"
      >
        {/* soft paper grain effect (optional) */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply"></div>
      
        <pre className="whitespace-pre-wrap z-10 relative">{visibleText}</pre>
      </motion.div>
      
      )}
    </section>
  );
}
