// src/components/HerGallery.jsx
import { motion } from "framer-motion";

const photosOfHer = [
  {
    image: "/images/her1.jpg",
    caption: "You looked like a sunrise I never wanted to end.",
    hiddenMessage: "Even the stars would envy how you shine."
  },
  {
    image: "/images/her2.jpg",
    caption: "Caught between grace and fire — that’s you.",
    hiddenMessage: "You’re the soft place my heart falls into."
  },
  {
    image: "/images/her3.jpg",
    caption: "The universe must’ve taken its time with you.",
    hiddenMessage: "You're more art than anything else."
  },
  {
    image: "/images/her1.jpg",
    caption: "You looked like a sunrise I never wanted to end.",
    hiddenMessage: "Even the stars would envy how you shine."
  },
  {
    image: "/images/her2.jpg",
    caption: "Caught between grace and fire — that’s you.",
    hiddenMessage: "You’re the soft place my heart falls into."
  },
  {
    image: "/images/her3.jpg",
    caption: "The universe must’ve taken its time with you.",
    hiddenMessage: "You're more art than anything else."
  },
  // Add more photos & praises here
];

export default function HerGallery() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#1a1a40] via-[#101022] to-[#0b0c1a] text-white py-16 px-6 sm:px-10 overflow-hidden">
      {/* Floating Stars */}
      <div className="absolute top-10 left-10 w-3 h-3 bg-pink-300 rounded-full blur-sm animate-pulse"></div>
      <div className="absolute bottom-12 right-10 w-2 h-2 bg-white rounded-full blur-sm animate-bounce"></div>
      <div className="absolute top-1/3 right-1/4 w-2.5 h-2.5 bg-yellow-300 rounded-full blur-md animate-ping"></div>

      <h2 className="text-3xl sm:text-4xl font-['Dancing_Script'] text-pink-200 text-center mb-12 relative z-10">
        You, In My Eyes 📷
      </h2>

      <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto relative z-10">
        {photosOfHer.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            className="w-64 h-80 bg-white rounded-xl shadow-2xl overflow-hidden relative group cursor-pointer"
          >
            <img
              src={item.image}
              alt="Her photo"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:rotate-2 group-hover:scale-105"
            />

            {/* Caption */}
            <div className="absolute bottom-0 left-0 w-full bg-white bg-opacity-80 text-center py-2 text-black text-sm font-medium z-10">
              {item.caption}
            </div>

            {/* Hidden praise on hover */}
            <div className="absolute inset-0 bg-[#1a1a40] bg-opacity-90 text-pink-100 text-sm flex items-center justify-center px-4 text-center opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500 z-20">
              <p>{item.hiddenMessage}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="mt-12 flex justify-center relative z-10">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-pink-300 text-xl"
        >
          ↓ Scroll for more love
        </motion.div>
      </div>
    </div>
  );
}
