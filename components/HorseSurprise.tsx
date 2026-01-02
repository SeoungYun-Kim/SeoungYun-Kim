
import React, { useEffect, useState } from 'react';

interface HorseSurpriseProps {
  onComplete: () => void;
}

const HorseSurprise: React.FC<HorseSurpriseProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 500); // Horse enters
    const timer2 = setTimeout(() => setStage(2), 2500); // Text appears
    const timer3 = setTimeout(() => onComplete(), 5500); // Finish

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 overflow-hidden">
      {/* Red Horse Animation Area */}
      <div className={`transition-all duration-1000 ease-out transform ${stage >= 1 ? 'translate-x-0 opacity-100 scale-125' : '-translate-x-full opacity-0 scale-50'}`}>
         <div className="relative">
            {/* Using a stylized SVG Horse for high quality animation */}
            <svg width="400" height="400" viewBox="0 0 512 512" className="fill-red-600 animate-pulse drop-shadow-[0_0_50px_rgba(220,38,38,0.8)]">
                <path d="M495.9 133.4c-6.1-23.7-27.4-39.4-51.5-39.4-1.2 0-2.3 0-3.5 .1C427.7 41.5 373.9 0 312 0 241.3 0 184 57.3 184 128c0 3 .1 6 .3 8.9C168.3 150.3 152 173.2 152 200c0 44.2 35.8 80 80 80h16.2c-15.6 20.2-28.5 44.2-36.4 71.3-4.1-1.3-8.4-2.1-12.8-2.1-24.8 0-45 20.2-45 45s20.2 45 45 45c22.1 0 40.5-16 44.3-37.1 24.1 6.3 50.1 9.8 77.1 9.8 82 0 152.1-32.5 190.1-81.8 17.5 10.3 38.1 16.3 60.1 16.3 63.8 0 115.5-51.7 115.5-115.5 0-41.9-22.3-78.5-55.6-99.3zM408 240c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z"/>
                {/* Simplified Horse Silhouette (Fallback or Symbol) */}
                <path d="M128 320c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200-200-89.5-200-200zm64 0c0 75.1 60.9 136 136 136s136-60.9 136-136-60.9-136-136-136-136 60.9-136 136z" opacity="0.2"/>
            </svg>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="text-9xl">🐎</span>
            </div>
         </div>
      </div>

      {/* Jackpot Text */}
      <div className={`absolute bottom-20 text-center transition-all duration-700 delay-500 transform ${stage >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <h2 className="text-5xl font-bold text-yellow-400 drop-shadow-lg font-traditional mb-4">
          축하합니다! 당첨!
        </h2>
        <p className="text-2xl text-white font-traditional">
          2026년 붉은 말의 기운이 당신을 향해 달려옵니다.
        </p>
      </div>

      {/* Particle background simulation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="absolute bg-red-500 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HorseSurprise;
