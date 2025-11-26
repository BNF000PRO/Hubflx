"use client";

const Waveform = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden opacity-20 pointer-events-none">
      <svg
        className="absolute bottom-0 w-full h-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M 0,60 Q 150,20 300,60 T 600,60 T 900,60 T 1200,60 L 1200,120 L 0,120 Z"
          fill="url(#waveGradient)"
          className="animate-waveform"
        />
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(98, 76, 245, 0.3)" />
            <stop offset="50%" stopColor="rgba(98, 76, 245, 0.5)" />
            <stop offset="100%" stopColor="rgba(98, 76, 245, 0.3)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Waveform;

