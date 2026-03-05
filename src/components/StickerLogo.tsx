import React from 'react';

export default function StickerLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative inline-block ${className}`}>
      {/* Outer Circle with "JE VEUX ME RENDRE" text */}
      <div className="w-48 h-48 rounded-full bg-utiles-green/10 border-4 border-white shadow-2xl flex items-center justify-center overflow-hidden relative group">
        <div className="absolute inset-0 bg-utiles-blue/5 group-hover:bg-utiles-blue/10 transition-colors"></div>
        
        {/* Curved Text (Approximated with SVG) */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite]">
          <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
          <text className="text-[8px] font-bold uppercase tracking-widest fill-utiles-blue/40">
            <textPath href="#circlePath">
              JE VEUX ME RENDRE • JE VEUX ME RENDRE • JE VEUX ME RENDRE • 
            </textPath>
          </text>
        </svg>

        {/* Inner Teal Circle */}
        <div className="w-32 h-32 rounded-full bg-[#1BAA6F] shadow-inner flex flex-col items-center justify-center text-white p-4 text-center transform rotate-[-5deg]">
          <div className="flex flex-col items-center">
             {/* Small Puzzle Icon */}
             <div className="grid grid-cols-2 gap-0.5 mb-1">
                <div className="w-1.5 h-1.5 bg-white"></div>
                <div className="w-1.5 h-1.5 bg-utiles-accent"></div>
                <div className="w-1.5 h-1.5 bg-utiles-accent"></div>
                <div className="w-1.5 h-1.5 bg-white"></div>
             </div>
             <span className="text-2xl font-black tracking-tighter leading-none">UTILES</span>
             <div className="w-full h-[1px] bg-white/30 my-1"></div>
             <span className="text-[6px] uppercase font-bold tracking-tighter leading-tight">
                Ultra-marins, Territoires, Indépendants,<br/> Liberté - Écologie et Solidarité
             </span>
          </div>
        </div>
        
        {/* Peel Effect (Bottom Right) */}
        <div className="absolute bottom-0 right-0 w-12 h-12 bg-white transform rotate-45 translate-x-6 translate-y-6 shadow-lg"></div>
      </div>
    </div>
  );
}
