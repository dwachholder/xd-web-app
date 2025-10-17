"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Home() {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const text = "Hello World";
  const typingSpeed = 150; // milliseconds per character

  useEffect(() => {
    // Delay the start of typing by 2 seconds
    const startDelay = setTimeout(() => {
      let currentIndex = 0;

      const typeNextChar = () => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;

          // Add random delay between characters (base speed ± random variation)
          const randomDelay = typingSpeed + (Math.random() - 0.5) * typingSpeed * 0.6;
          setTimeout(typeNextChar, Math.max(50, randomDelay)); // Minimum 50ms delay
        }
      };

      typeNextChar();
    }, 2000);

    return () => clearTimeout(startDelay);
  }, []);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Main content */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          {/* Typewriter text */}
          <h1 className="text-5xl md:text-7xl font-light text-white font-mono">
            {displayText}
            <span className={`inline-block w-1 h-16 bg-white ml-2 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
          </h1>
        </div>
      </div>
    </div>
  );
}