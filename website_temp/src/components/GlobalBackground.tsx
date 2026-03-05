import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function GlobalBackground() {
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 2000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 2000], [0, 300]);
  const rotate = useTransform(scrollY, [0, 2000], [0, 45]);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      {/* Main Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-utiles-blue-deep via-utiles-blue to-utiles-green opacity-100"></div>
      
      {/* Animated Blobs */}
      <motion.div 
        style={{ y: y1, rotate }}
        className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-utiles-accent/10 rounded-full blur-[100px] mix-blend-overlay"
      />
      
      <motion.div 
        style={{ y: y2, rotate: useTransform(scrollY, [0, 2000], [0, -30]) }}
        className="absolute top-[40%] -left-[20%] w-[600px] h-[600px] bg-utiles-blue/20 rounded-full blur-[80px] mix-blend-overlay"
      />

      <motion.div 
        style={{ y: useTransform(scrollY, [0, 2000], [0, -150]) }}
        className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-utiles-green/10 rounded-full blur-[90px] mix-blend-overlay"
      />
      
      {/* Texture Overlay (Optional for grain) */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/noise.png')]"></div>
    </div>
  );
}
