"use client";
import React, { useState } from "react";

export default function Tooltip({ children, content, position = "top" }) {
  const [visible, setVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className={`absolute z-50 px-3 py-2 text-xs font-medium text-white bg-gray-500 rounded-lg shadow-md whitespace-nowrap transition-all duration-200 ${positionClasses[position]}`}
        >
          {content}
        </div>
      )}
    </div>
  );
}
