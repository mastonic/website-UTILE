import React, { useState, useEffect } from 'react';

export default function Countdown() {
  const targetDate = new Date('2026-03-15T08:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({
    jours: 0,
    heures: 0,
    minutes: 0,
    secondes: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        jours: Math.floor(distance / (1000 * 60 * 60 * 24)),
        heures: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        secondes: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-4 justify-center md:justify-start">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="text-center">
          <div className="bg-white/20 backdrop-blur-md rounded-lg p-2 min-w-[60px] border border-white/30">
            <span className="text-2xl font-black text-utiles-accent block leading-none">{value}</span>
            <span className="text-[10px] uppercase font-bold text-white/70">{label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
