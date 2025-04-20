// src/components/PolaroidCard.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react"; // You can use any flame icon

export default function PolaroidCard({ image, message }) {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <motion.div
      className="relative w-60 bg-white rounded-xl shadow-lg p-2 flex flex-col items-center mb-10 rotate-[-2deg] hover:rotate-0 transition-all duration-500"
      whileHover={{ scale: 1.05 }}
    >
      <img
        src={image}
        alt="memory"
        className="w-full h-60 object-cover rounded-md mb-3"
      />
      <button
        onClick={() => setShowMessage(!showMessage)}
        className="absolute bottom-2 right-2 bg-pink-100 p-2 rounded-full shadow hover:bg-pink-200 transition"
        title="Click to reveal"
      >
        <Flame className="text-pink-500 w-5 h-5" />
      </button>
      {showMessage && (
        <motion.p
          className="text-sm text-gray-700 mt-2 text-center px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {message}
        </motion.p>
      )}
    </motion.div>
  );
}
