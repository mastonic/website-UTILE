import React from 'react';

interface LogoProps {
  className?: string;
  isScrolled?: boolean;
  light?: boolean;
}

export default function Logo({ className = "", isScrolled = false, light = false }: LogoProps) {
  const mainColor = light ? "#FFFFFF" : (isScrolled ? "#0E5A7A" : "#FFFFFF");
  const accentColor = "#9BD53C";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width="140" height="45" viewBox="0 0 140 45" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
        {/* Puzzle Piece Icon above the 'I' */}
        <g transform="translate(78, 2)">
          {/* Top Left */}
          <path d="M1 1H6V6H1V1Z" fill={mainColor} />
          <circle cx="6" cy="3.5" r="1.5" fill={mainColor} />
          
          {/* Top Right */}
          <path d="M8 1H13V6H8V1Z" fill={accentColor} />
          <circle cx="10.5" cy="6" r="1.5" fill={accentColor} />
          
          {/* Bottom Left */}
          <path d="M1 8H6V13H1V8Z" fill={accentColor} />
          <circle cx="3.5" cy="8" r="1.5" fill={accentColor} />
          
          {/* Bottom Right */}
          <path d="M8 8H13V13H8V8Z" fill={mainColor} />
          <circle cx="8" cy="10.5" r="1.5" fill={mainColor} />
        </g>
        
        {/* UTILES Text */}
        <text 
          x="0" 
          y="38" 
          fill={mainColor} 
          style={{ 
            fontFamily: 'Poppins, sans-serif', 
            fontWeight: 900, 
            fontSize: '34px',
            letterSpacing: '-1.5px'
          }}
        >
          UTILES
        </text>
      </svg>
    </div>
  );
}
