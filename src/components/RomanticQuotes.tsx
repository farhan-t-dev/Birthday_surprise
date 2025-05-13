// src/components/RomanticQuotes.jsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Check, Clipboard } from "lucide-react";

const quotes = [
  { book: "The Spanish Deception", quote: "I’ve never wanted anything the way I want a future with you—even on the quiet days." },
  { book: "The Shattered Series",   quote: "You weren’t just a chapter. You became the story I never want to end." },
  { book: "Twisted Love",           quote: "No matter how far I wander, my heart finds its way back to you—every time." },
  { book: "The Love Hypothesis",    quote: "In a world full of unknowns, loving you is the one thing that’s always certain." },
  { book: "Beach Read",             quote: "You feel like sunlight after a lifetime of winters—warm, steady, and mine." },
  { book: "People We Meet...",      quote: "Home isn’t a place anymore. It’s your voice, your laugh, your name." },
  { book: "Farhan T.", quote: "Even across the distance, you feel closer to me than most people ever standing beside me." },
  { book: "The Shattered Series",   quote: "You didn’t just break down my walls—you built something beautiful in their place." },
  { book: "The Spanish Deception",  quote: "With you, falling doesn’t feel like a risk. It feels like landing where I was always meant to be." },
  { book: "Farhan T.", quote: "Loving you feels less like something I chose and more like something the universe quietly whispered into my soul." }
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
              <p className="text-lg sm:text-xl leading-relaxed text-pink-100">
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
