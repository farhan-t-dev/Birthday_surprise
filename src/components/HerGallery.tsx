// src/components/HerGallery.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const photosOfHer = [
  {
    image: "src/assets/Farhan.jpeg",
    caption: "You looked like a sunrise I never wanted to end.",
    hiddenMessage: "Even the stars would envy how you shine.",
  },
  {
    image: "/images/her2.jpg",
    caption: "Caught between grace and fire — that’s you.",
    hiddenMessage: "You’re the soft place my heart falls into.",
  },
  {
    image: "/images/her3.jpg",
    caption: "The universe must’ve taken its time with you.",
    hiddenMessage: "You're more art than anything else.",
  },
  {
    image: "/images/her1.jpg",
    caption: "You looked like a sunrise I never wanted to end.",
    hiddenMessage: "Even the stars would envy how you shine.",
  },
  {
    image: "/images/her2.jpg",
    caption: "Caught between grace and fire — that’s you.",
    hiddenMessage: "You’re the soft place my heart falls into.",
  },
  {
    image: "/images/her3.jpg",
    caption: "The universe must’ve taken its time with you.",
    hiddenMessage: "You're more art than anything else.",
  },
  // Add more photos & praises here
];

export default function HerGallery() {
  const [activeMessage, setActiveMessage] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#1a1a40] via-[#101022] to-[#0b0c1a] text-white py-16 px-6 sm:px-10 overflow-hidden">
      <h2 className="text-4xl font-['Dancing_Script'] text-pink-200 text-center mb-16">
        You, In My Eyes 📷
      </h2>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto z-10 relative">
        {photosOfHer.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            className="bg-[#fffaf3] text-black rounded-xl shadow-2xl p-4 pt-6 pb-10 relative group cursor-pointer polaroid-frame"
          >
            <div className="relative" onClick={() => setLightbox(item.image)}>
              <img
                src={item.image}
                alt="Her"
                className="w-full h-64 object-cover rounded-sm shadow-lg transition-transform duration-500 group-hover:rotate-1 group-hover:scale-[1.02]"
              />
            </div>

            <div className="mt-4 text-center font-semibold text-lg sm:text-sl text-[#5e3c3c] drop-shadow-[0_0_6px_rgba(255,255,255,0.1)]">
              {item.caption}
            </div>

            <div
              className="relative mt-2 text-center cursor-pointer"
              onClick={() => setActiveMessage(idx)}
            >
              <div
                className={`mt-2 px-2 py-1 text-center text-mm transition-all duration-500 ${
                  activeMessage === idx
                    ? "backdrop-blur-0 text-pink-700"
                    : "blur-sm text-pink-200"
                }`}
                onClick={() => setActiveMessage(idx)}
              >
                {item.hiddenMessage}
              </div>
              {/* "Click to reveal" hint - only when not active */}
              {activeMessage !== idx && (
                <div className="absolute inset-0 flex items-center justify-center text-sm sm:text-base text-gray-300 font-medium pointer-events-none">
                  (click to reveal)
                </div>
              )}
            </div>

            {/* Polaroid-style label */}
            <div className="absolute bottom-2 left-0 right-0 text-center text-xs text-[#a88b8b] font-['Courier_New']">
              Memory #{idx + 1}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="mt-16 flex justify-center z-10 relative">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-pink-300 text-xl"
        >
          ↓ Scroll for more love
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.img
              src={lightbox}
              alt="Zoomed"
              className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
