import React from 'react';
import { MapPin, Navigation, Compass, Layers } from 'lucide-react';

interface LiveMapProps {
    progress: number;
}

const LiveMap: React.FC<LiveMapProps> = ({ progress }) => {
  // Interpolation logic for the path
  const t = progress / 100;
  
  // Quadratic Bezier Formula
  // Matches the SVG path: M 25 38 Q 35 35 55 18
  const x = Math.pow(1 - t, 2) * 25 + 2 * (1 - t) * t * 35 + Math.pow(t, 2) * 55;
  const y = Math.pow(1 - t, 2) * 38 + 2 * (1 - t) * t * 35 + Math.pow(t, 2) * 18;

  return (
    <div className="h-full min-h-[400px] w-full bg-bae-card rounded-3xl overflow-hidden relative border border-bae-hover shadow-2xl">
      {/* Map Background Layer */}
      <div className="absolute inset-0 z-0 bg-[#0f172a]">
          {/* Map Image */}
          <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop" 
            alt="Map" 
            className="w-full h-full object-cover opacity-40 filter grayscale contrast-125"
          />
          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-bae-main/10 via-bae-main/20 to-bae-main/60"></div>
      </div>
      
      {/* Route Path SVG - Using percentages (0-100 coordinate space) for responsiveness */}
      <div className="absolute inset-0 z-10 pointer-events-none">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]">
            {/* Dashed Path Line */}
            <path 
                d="M 25 38 Q 35 35 55 18" 
                fill="none" 
                stroke="#3b82f6" 
                strokeWidth="0.5" 
                strokeDasharray="1 1" 
                strokeLinecap="round"
                className="opacity-80"
            />
            {/* Start Point Dot */}
            <circle cx="25" cy="38" r="0.8" fill="white" fillOpacity="0.5" />
          </svg>
      </div>

      {/* User Marker (Dynamic) */}
      <div 
        className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-75 ease-linear z-30"
        style={{ top: `${y}%`, left: `${x}%` }}
      >
          <div className="relative group">
             {/* Ping Effect */}
             <div className="w-16 h-16 bg-bae-blue/30 rounded-full animate-ping absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
             
             {/* Main Marker Icon */}
             <div className="w-10 h-10 bg-bae-main rounded-full shadow-[0_0_20px_rgba(59,130,246,0.8)] flex items-center justify-center relative z-10 border-2 border-bae-blue">
                 <div className="w-full h-full bg-bae-blue rounded-full flex items-center justify-center text-white scale-75">
                    <Navigation className="w-5 h-5 fill-current transform rotate-45" />
                 </div>
             </div>
             
             {/* "You" Tag */}
             <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-bae-main/90 text-white text-[10px] px-2 py-1 rounded-md border border-bae-hover whitespace-nowrap backdrop-blur-sm shadow-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                You
             </div>
          </div>
      </div>

      {/* Destination Marker (Coffee Shop) */}
      <div className="absolute top-[18%] left-[55%] transform -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="relative group cursor-pointer">
             <div className={`w-10 h-10 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.6)] flex items-center justify-center relative z-10 text-white border-2 border-bae-main transition-transform duration-500 ${progress >= 100 ? 'scale-110 bg-bae-green shadow-[0_0_20px_rgba(16,185,129,0.6)]' : 'bg-bae-red'}`}>
                <MapPin className="w-5 h-5 fill-current" />
             </div>
             {/* Label */}
             <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-bae-card px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap border border-bae-hover flex flex-col items-center">
                <span className="text-xs font-bold text-white">The Daily Grind</span>
                <span className="text-[9px] text-bae-green font-mono uppercase tracking-wider">{progress >= 100 ? 'Arrived' : 'Target'}</span>
                {/* Little Triangle Pointer */}
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-bae-card border-t border-l border-bae-hover transform rotate-45"></div>
             </div>
          </div>
      </div>
      
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-40">
          <button className="w-9 h-9 bg-bae-card/80 backdrop-blur rounded-lg shadow-lg flex items-center justify-center text-bae-text border border-bae-hover hover:bg-bae-hover hover:text-white transition-colors">
            <Compass className="w-4 h-4" />
          </button>
          <button className="w-9 h-9 bg-bae-card/80 backdrop-blur rounded-lg shadow-lg flex items-center justify-center text-bae-text border border-bae-hover hover:bg-bae-hover hover:text-white transition-colors">
            <Layers className="w-4 h-4" />
          </button>
      </div>

      {/* Status Overlay */}
      <div className="absolute bottom-4 left-4 z-40">
         <div className="bg-bae-card/90 backdrop-blur border border-bae-hover px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-lg">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-[10px] text-bae-muted font-mono tracking-wider font-bold">LIVE TRACKING</span>
         </div>
      </div>
    </div>
  );
};

export default LiveMap;