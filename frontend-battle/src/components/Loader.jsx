import React, { useEffect, useState } from "react";

const Loader = ({ onComplete, color = "#00ff88" }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 800); // fade out
          return 100;
        }
        return prev + Math.random() * 2 + 1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-700 ${
        progress >= 100 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        background: "radial-gradient(circle, #000000, #0f0f0f)",
      }}
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white mb-4 tracking-widest">
          LOADING... {Math.floor(progress)}%
        </h1>
        <div className="w-64 h-3 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-100"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${color}, white, ${color})`,
              boxShadow: `0 0 12px ${color}80`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
