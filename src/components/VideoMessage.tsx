import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Gift } from "lucide-react"; // cute gift icon, you can replace with your own image if you want

const SecretVideoSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isGiftOpened, setIsGiftOpened] = useState(false); // new state for the gift box
  const [isUnwrapping, setIsUnwrapping] = useState(false);

const handleOpenGift = () => {
  setIsUnwrapping(true);
  setTimeout(() => {
    setIsGiftOpened(true);
  }, 2500); // 2.5 seconds to finish the unwrap animation
};

  useEffect(() => {
    const secretVideo = document.getElementById("secret-video");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (secretVideo) observer.observe(secretVideo);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="secret-video"
      className="relative min-h-screen bg-gradient-to-b from-[#0b0c1a] to-[#0a0a0a] text-white flex flex-col items-center justify-center px-4"
    >
      {/* Glow Aura */}
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500 opacity-10 blur-3xl rounded-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* Flickering Message */}
      {isVisible && !isGiftOpened && (
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-pink-300 mb-6 font-light italic text-center max-w-md z-10 animate-flicker"
        >
          Just one more surprise before you go... 💌
        </motion.p>
      )}

      {/* Gift Box */}
      {isVisible && !isGiftOpened && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    className="relative flex flex-col items-center justify-center z-10"
  >
    <motion.button
      onClick={handleOpenGift}
      disabled={isUnwrapping}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 p-10 rounded-2xl shadow-2xl border-2 border-white/20 backdrop-blur-md flex items-center justify-center overflow-hidden"
    >
      <Gift size={64} className="text-white drop-shadow-lg" />

      {/* Top Ribbon */}
      
    </motion.button>

    <p className="mt-3 text-white text-sm font-semibold tracking-wide">
      {isUnwrapping ? "Unwrapping..." : "Open your gift 🎁"}
    </p>
  </motion.div>
)}



      {/* Video Reveal */}
      {isVisible && isGiftOpened && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.3, ease: "easeOut" }}
            className="relative w-full max-w-[600px] aspect-video rounded-3xl overflow-hidden shadow-2xl border border-pink-500/40 bg-pink-100/10 backdrop-blur-xl z-10"
          >
            <video
              playsInline
              muted
              controls
              className="w-full h-full object-cover"
              poster="/thumbnail.jpg"
            >
              <source src="/video-surprise.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Soft edge glow */}
            <div className="absolute inset-0 pointer-events-none rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(255,192,203,0.3)]" />
          </motion.div>

          {/* Handwritten Signature */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-6 text-center text-pink-200 font-[signature] text-3xl md:text-4xl z-10"
          >
            — Farhan 💖
          </motion.p>
        </>
      )}
    </section>
  );
};

export default SecretVideoSection;
