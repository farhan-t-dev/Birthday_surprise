// src/components/RomanticQuotes.jsx
import { motion } from "framer-motion";
import { useEffect } from "react";

const quotes = [
  {
    book: "The Spanish Deception",
    quote: "I don’t think I’ve ever wanted something as much as I want you right now."
  },
  {
    book: "The Shattered Series",
    quote: "You weren’t just a chapter. You were the whole damn book."
  },
  {
    book: "The Spanish Deception",
    quote: "I’ve never felt anything like this. Like I could fall and you’d be there to catch me every time."
  },
  {
    book: "The Shattered Series",
    quote: "You shattered my loneliness, not just my walls."
  }
];

export default function RomanticQuotes() {
    useEffect(() => {
        const container = document.getElementById("floating-elements");
      
        const interval = setInterval(() => {
          if (container && container.childNodes.length < 40) {
            const shape = document.createElement("div");
            shape.className = Math.random() > 0.5 ? "floating-heart" : "floating-paper";
      
            // Randomize position
            shape.style.left = `${Math.random() * 100}%`;
            shape.style.animationDuration = `${8 + Math.random() * 6}s`;
            shape.style.opacity = `${0.05 + Math.random() * 0.15}`;
            container.appendChild(shape);
      
            setTimeout(() => shape.remove(), 15000);
          }
        }, 800);
      
        return () => clearInterval(interval);
      }, []);
      
  return (
    <div className="relative bg-[#0b0c1a] py-20 px-6 sm:px-12 overflow-hidden">
      {/* Floating hearts + papers + text bg */}
      <div id="floating-elements" className="pointer-events-none absolute inset-0 z-0" />

      {/* Faint background text */}
      <div className="absolute top-1/3 left-0 text-[8rem] sm:text-[12rem] opacity-[0.02] text-white font-serif select-none pointer-events-none z-0">
        chapters
      </div>
      <div className="absolute bottom-10 right-0 text-[6rem] sm:text-[10rem] opacity-[0.015] text-white font-serif select-none pointer-events-none z-0">
        memories
      </div>
      <h2 className="text-3xl sm:text-4xl font-['Dancing_Script'] text-pink-200 text-center mb-12 relative z-10">
        Your Favorite Stories, My Favorite Words 💬
      </h2>

      <div className="max-w-3xl mx-auto space-y-10 relative z-10">
        {quotes.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-[#1f1f3a] bg-opacity-60 text-pink-100 p-6 rounded-2xl shadow-lg backdrop-blur-md border border-pink-400/10"
          >
            <p className="text-lg italic mb-4">“{item.quote}”</p>
            <p className="text-sm text-pink-300 text-right">— {item.book}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
