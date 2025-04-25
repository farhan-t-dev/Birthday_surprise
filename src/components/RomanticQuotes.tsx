// src/components/RomanticQuotes.jsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Check, Clipboard } from "lucide-react";

const quotes = [
  { book: "The Spanish Deception", quote: "I don’t think I’ve ever wanted something as much as I want you right now." },
  { book: "The Shattered Series",   quote: "You weren’t just a chapter. You were the whole damn book." },
  { book: "Twisted Love",           quote: "Every path I take still leads me back to you." },
  { book: "The Love Hypothesis",    quote: "In a universe of variables, you are my one constant." },
  { book: "Beach Read",             quote: "You feel like every good day I’ve ever had, all at once." },
  { book: "People We Meet...",      quote: "Home stopped being a place the moment it became a person—and that person was you." },
  { book: "The Shattered Series",   quote: "You shattered my loneliness, not just my walls." },
  { book: "The Spanish Deception",  quote: "I’ve never felt anything like this—like I could fall and you’d catch me every time." },
];

export default function RomanticQuotes() {
  /* small toast state for copy feedback */
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  /* ambient floaters (same as before, trimmed for brevity) */
  useEffect(() => {
    const root = document.getElementById("float-root");
    const spawn = () => {
      if (!root || root.childNodes.length > 40) return;
      const el = document.createElement("div");
      el.className = "float-heart";
      el.style.left = `${Math.random() * 100}%`;
      el.style.animationDuration = `${8 + Math.random() * 6}s`;
      el.style.opacity = `${0.06 + Math.random() * 0.14}`;
      root.appendChild(el);
      setTimeout(() => el.remove(), 15000);
    };
    const id = setInterval(spawn, 800);
    return () => clearInterval(id);
  }, []);

  /* copy handler */
  const handleCopy = async (q: string, idx: number) => {
    await navigator.clipboard.writeText(q);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };
      
  return (
    <section className="relative bg-[#0b0c1a] py-16 sm:py-24 px-5 sm:px-10 overflow-hidden">
      {/* floating hearts canvas */}
      <div id="float-root" className="pointer-events-none absolute inset-0 z-0" />

      {/* Faint background text */}
      <div className="absolute top-1/3 left-0 text-[8rem] sm:text-[12rem] opacity-[0.02] text-white font-serif select-none pointer-events-none z-0">
        chapters
      </div>
      <div className="absolute bottom-10 right-0 text-[6rem] sm:text-[10rem] opacity-[0.015] text-white font-serif select-none pointer-events-none z-0">
        memories
      </div>
      {/* heading */}
      <h2 className="relative z-10 text-4xl sm:text-5xl font-['Dancing_Script'] text-pink-200 text-center mb-12">
        Quotes that feel like us 💬
      </h2>

      {/* responsive Masonry grid */}
      <div className="relative z-10 columns-1 sm:columns-2 gap-6 space-y-6 max-w-4xl mx-auto">
        {quotes.map((q, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="break-inside-avoid group rounded-2xl bg-gradient-to-br from-[#24244a] to-[#1a1a38] p-[2px] hover:shadow-pink-400/25"
          >
            <div className="rounded-2xl bg-[#1a1a38]/70 backdrop-blur-md p-5 sm:p-6 hover:rotate-[2deg] transition-transform duration-300">
              <p className="text-lg sm:text-xl leading-relaxed text-pink-100 italic">
                “{q.quote}”
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm sm:text-base text-pink-300">— {q.book}</span>

                {/* copy button */}
                <button
                  onClick={() => handleCopy(q.quote, i)}
                  className="text-pink-300 hover:text-pink-200 transition-colors"
                  aria-label="Copy quote"
                >
                  {copiedIdx === i ? <Check size={18} /> : <Clipboard size={18} />}
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
