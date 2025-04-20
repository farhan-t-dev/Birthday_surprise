import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SecretVideoSection = () => {
  const [isVisible, setIsVisible] = useState(false);

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
      {isVisible && (
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-pink-300 mb-6 font-light italic text-center max-w-md z-10 animate-flicker"
        >
          Just one more surprise before you go... 💌
        </motion.p>
      )}

      {/* Video Reveal */}
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, ease: "easeOut", delay: 0.3 }}
          className="relative w-full max-w-[600px] aspect-video rounded-3xl overflow-hidden shadow-2xl border border-pink-500/40 bg-pink-100/10 backdrop-blur-xl z-10"
        >
          <video
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
      )}
      {/* Handwritten Signature */}
{isVisible && (
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 1.6 }}
    className="mt-6 text-center text-pink-200 font-[signature] text-3xl md:text-4xl z-10"
  >
    — Farhan 💖
  </motion.p>
)}
    </section>
  );
};

export default SecretVideoSection;
