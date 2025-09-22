"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaClock } from "react-icons/fa";

export default function CountdownScreen({ onComplete, count = 3 }) {
  const [countdown, setCountdown] = useState(count);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      const delay = setTimeout(() => {
        setShow(false);
        onComplete?.();
      }, 500);
      return () => clearTimeout(delay);
    }
  }, [countdown, onComplete]);

  if (!show) return null;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-red-600/10 to-red-800/10 text-red-600">
      {/* Clock Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <FaClock className="text-6xl drop-shadow-lg" />
      </motion.div>

      {/* Countdown Number */}
      <AnimatePresence mode="wait">
        <motion.span
          key={countdown}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.5 }}
          transition={{ duration: 0.6 }}
          className="text-[8rem] font-extrabold drop-shadow-md"
        >
          {countdown}
        </motion.span>
      </AnimatePresence>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 text-lg font-medium tracking-wider uppercase"
      >
        Get Ready!
      </motion.p>
    </div>
  );
}
