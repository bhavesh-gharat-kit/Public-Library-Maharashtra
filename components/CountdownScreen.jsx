"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaClock } from "react-icons/fa";

export default function CountdownScreen({ onComplete, count = 3 }) {
  const [countdown, setCountdown] = useState(count);
  const [showCountdown, setShowCountdown] = useState(true);
  const [displayedCountdown, setDisplayedCountdown] = useState(count);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      const delay = setTimeout(() => {
        setShowCountdown(false);
        onComplete();
      }, 500);
      return () => clearTimeout(delay);
    }
  }, [countdown, onComplete]);

  // Update displayed countdown after countdown is updated, with slight delay
  useEffect(() => {
    const displayDelay = setTimeout(() => {
      setDisplayedCountdown(countdown);
    }, 50); // 50ms ensures React has rendered the previous value

    return () => clearTimeout(displayDelay);
  }, [countdown]);

  if (!showCountdown) return null;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <FaClock className="text-5xl text-yellow-400 mb-4 animate-pulse" />

      {/* <AnimatePresence mode="wait">
        <motion.div
          key={displayedCountdown}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1.3, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
            type: "spring",
            stiffness: 180,
          }}
          className="text-7xl font-extrabold tracking-widest"
          > */}
      <div className="text-7xl font-extrabold tracking-widest animate-ping transition-all duration-1000">
        {displayedCountdown}
      </div>
      {/* </motion.div>
      </AnimatePresence> */}

      <p className="mt-6 text-sm text-gray-400 tracking-wider uppercase">
        Get Ready!
      </p>
    </div>
  );
}