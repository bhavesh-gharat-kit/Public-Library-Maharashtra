"use client"
import React from 'react';

const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="flex space-x-3">
        <div className="w-4 h-4 bg-white rounded-full custom-bounce"></div>
        <div className="w-4 h-4 bg-white rounded-full custom-bounce delay-1"></div>
        <div className="w-4 h-4 bg-white rounded-full custom-bounce delay-2"></div>
      </div>

      <style jsx>{`
        @keyframes big-bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-1.5rem);
          }
        }

        .custom-bounce {
          animation: big-bounce 0.6s infinite ease-in-out;
        }

        .delay-1 {
          animation-delay: 0.15s;
        }

        .delay-2 {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  );
};

export default FullScreenLoader;
