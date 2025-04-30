import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import photosOfHer from "../data/galleryData";

export default function HerGallery() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [visiblePhotos, setVisiblePhotos] = useState(6);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handleToggleMessage = useCallback((idx: number) => {
    setActiveIdx((prev) => (prev === idx ? null : idx));
  }, []);

  const loadMorePhotos = () => {
    setVisiblePhotos((prev) => prev + 6);
  };

  const displayedPhotos = photosOfHer.slice(0, visiblePhotos);
  const hasMorePhotos = visiblePhotos < photosOfHer.length;

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#1a1a40] via-[#101022] to-[#0b0c1a] text-white py-16 px-6 sm:px-10 overflow-hidden">
      <h2 className="text-4xl font-['Dancing_Script'] text-pink-200 text-center mb-16">
        You, In My Eyes 📷
      </h2>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto z-10 relative">
        {displayedPhotos.map((item, idx) => (
          <motion.div
            key={item.image}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            className="bg-[#fffaf3] text-black rounded-xl shadow-2xl p-4 pt-6 pb-10 relative group cursor-pointer polaroid-frame"
          >
            <div className="relative" onClick={() => setLightbox(item.image)}>
              <img
                src={item.image}
                alt={`Memory ${idx + 1}`}
                loading="lazy"
                className="w-full h-64 object-cover rounded-sm shadow-lg transition-transform duration-500 group-hover:rotate-1 group-hover:scale-[1.02]"
              />
            </div>

            <p className="mt-4 text-center font-semibold text-lg sm:text-sl text-[#5e3c3c] drop-shadow-[0_0_6px_rgba(255,255,255,0.1)]">
              {item.caption}
            </p>

            <div className="relative mt-2 text-center">
              <button
                onClick={() => handleToggleMessage(idx)}
                className="w-full"
              >
                <div
                  className={`mt-2 px-2 py-1 text-center transition-all duration-500 ${
                    activeIdx === idx
                      ? "backdrop-blur-0 text-pink-700"
                      : "blur-sm text-pink-200"
                  }`}
                >
                  {item.hiddenMessage}
                </div>
                {activeIdx !== idx && (
                  <div className="absolute inset-0 flex items-center justify-center text-sm sm:text-base text-gray-300 font-medium pointer-events-none">
                    (click to reveal)
                  </div>
                )}
              </button>
            </div>

            <div className="absolute bottom-2 left-0 right-0 text-center text-xs text-[#a88b8b] font-['Courier_New']">
              Memory #{idx + 1}
            </div>
          </motion.div>
        ))}
      </div>

      {hasMorePhotos && (
        <div className="mt-10 flex justify-center z-10 relative">
          <motion.button
            onClick={loadMorePhotos}
            onHoverStart={() => setIsButtonHovered(true)}
            onHoverEnd={() => setIsButtonHovered(false)}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full shadow-lg font-medium relative overflow-hidden"
          >
            <motion.span 
              className="relative z-10 flex items-center gap-2"
              initial={false}
              animate={{ 
                x: isButtonHovered ? [0, 2, -2, 2, 0] : 0 
              }}
              transition={{ 
                duration: 0.6,
                times: [0, 0.2, 0.5, 0.8, 1]
              }}
            >
              View More Memories
              <motion.span
                animate={{
                  scale: isButtonHovered ? [1, 1.3, 1] : 1,
                  rotate: isButtonHovered ? [0, 20, -20, 0] : 0
                }}
                transition={{ duration: 0.6 }}
              >
                ❤️
              </motion.span>
            </motion.span>
            
            {/* Animated background elements */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-600 opacity-0"
              animate={{ 
                opacity: isButtonHovered ? [0, 0.3, 0] : 0,
                x: isButtonHovered ? [-100, 100] : -100
              }}
              transition={{ duration: 1.2 }}
            />
          </motion.button>
        </div>
      )}

      {!hasMorePhotos && photosOfHer.length > 6 && (
        <div className="mt-16 flex justify-center z-10 relative">
          <motion.div
            animate={{ 
              y: [0, 10, 0],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut"
            }}
            className="text-pink-300 text-xl flex items-center gap-2"
          >
            That's all our memories... for now 
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                delay: 1
              }}
            >
              💖
            </motion.span>
          </motion.div>
        </div>
      )}

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
              alt="Zoomed memory"
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