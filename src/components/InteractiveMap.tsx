import React, { useState } from 'react';
import { MapPin, Trees, ArrowRight } from 'lucide-react';

interface CountyData {
  name: string;
  projects: string;
  trees: string;
  x: number;
  y: number;
}

const COUNTIES: CountyData[] = [
  {
    name: 'Makueni',
    projects: 'Forest Canopy Restoration',
    trees: '10,000+',
    x: 270,
    y: 360,
  },
  {
    name: 'Kajiado',
    projects: 'Eco-Village Housing Scheme',
    trees: '2,200+',
    x: 210,
    y: 370,
  },
  {
    name: 'Kitui',
    projects: 'River Basin Conservation Drive',
    trees: '300',
    x: 300,
    y: 290,
  },
  {
    name: 'Machakos',
    projects: 'Grassland Agroforestry Corridor',
    trees: '4,300+',
    x: 240,
    y: 300,
  },
];

interface InteractiveMapProps {
  onSelectCounty: (county: string) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ onSelectCounty }) => {
  const [activeCounty, setActiveCounty] = useState<CountyData | null>(null);

  const handleCountyClick = (countyName: string) => {
    onSelectCounty(countyName);
    const element = document.getElementById('impact-grid');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-white border border-brand-cream/65 rounded-3xl p-6 md:p-10 shadow-sm flex flex-col lg:flex-row items-center gap-12 mb-16">
      
      {/* Map Content Column */}
      <div className="w-full lg:w-[45%] relative flex justify-center bg-brand-cream/15 rounded-3xl p-6 border border-brand-cream/40">
        
        {/* SVG Kenya Silhouette Map */}
        <svg
          viewBox="0 0 500 500"
          className="w-full max-w-[390px] h-auto transition-all duration-300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Soft Shadow for Map Outline */}
            <filter id="map-shadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="3" dy="6" stdDeviation="5" floodColor="#3B5A2B" floodOpacity="0.08" />
            </filter>
            {/* Map Gradient */}
            <linearGradient id="map-grad" x1="190" y1="40" x2="330" y2="440" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#EAF0E8" />
              <stop offset="100%" stopColor="#D9E4D6" />
            </linearGradient>
          </defs>

          {/* Stylized Detailed Kenya Outline */}
          <path
            d="M 190 40 L 385 40 L 385 110 L 435 240 L 360 380 L 325 435 L 290 445 L 265 445 L 205 435 L 180 405 L 155 405 L 115 340 L 125 285 L 105 245 L 125 185 L 155 125 Z"
            fill="url(#map-grad)"
            stroke="#BDCDB9"
            strokeWidth="3.5"
            strokeLinejoin="round"
            filter="url(#map-shadow)"
            className="transition-all duration-500"
          />
          
          {/* Subtle Grid Lines inside Map Area */}
          <path
            d="M 150 100 L 380 330 M 150 200 L 420 200 M 120 300 L 350 300 M 200 80 L 200 420 M 300 80 L 300 420"
            stroke="#BDCDB9"
            strokeWidth="0.5"
            strokeDasharray="4 6"
            className="opacity-60"
          />

          {/* Lake Victoria Accent on West */}
          <path
            d="M 115 330 C 110 325, 105 328, 103 333 C 101 338, 105 345, 110 348 C 115 350, 120 345, 118 338 Z"
            fill="#C9D6E4"
            stroke="#A3B4C5"
            strokeWidth="1"
          />
          <text x="75" y="342" fill="#8796A5" className="text-[9px] font-sans font-bold select-none opacity-85">
            L. Victoria
          </text>

          {/* Nairobi Capital Star Landmark */}
          <g transform="translate(220, 310)" className="opacity-80 select-none">
            <circle cx="0" cy="0" r="8" className="fill-brand-gold/25 stroke-brand-gold/40" />
            <circle cx="0" cy="0" r="3" className="fill-brand-gold" />
            <text x="8" y="3" fill="#697565" className="text-[9px] font-sans font-bold">Nairobi</text>
          </g>

          {/* Interactive County Pins */}
          {COUNTIES.map((county) => (
            <g
              key={county.name}
              className="cursor-pointer group"
              onMouseEnter={() => setActiveCounty(county)}
              onMouseLeave={() => setActiveCounty(null)}
              onClick={() => handleCountyClick(county.name)}
            >
              {/* Outer pulsing ripple */}
              <circle
                cx={county.x}
                cy={county.y}
                r="18"
                className="fill-brand-green/10 stroke-brand-green/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"
              />
              
              {/* Core Pulse Ring */}
              <circle
                cx={county.x}
                cy={county.y}
                r="7"
                className="fill-brand-gold/30 stroke-brand-gold/60 animate-ping opacity-85"
              />

              {/* Pin Center */}
              <circle
                cx={county.x}
                cy={county.y}
                r="5.5"
                className="fill-brand-green stroke-white stroke-[2] transition-transform duration-300 transform group-hover:scale-125 shadow-sm"
              />
            </g>
          ))}
        </svg>

        {/* Floating Glassmorphic Tooltip overlay */}
        {activeCounty && (
          <div
            className="absolute z-20 bg-brand-dark/95 backdrop-blur-md text-white p-4 rounded-2xl shadow-xl border border-white/15 w-[230px] transition-all duration-300 font-sans pointer-events-none"
            style={{
              left: `${(activeCounty.x / 500) * 100}%`,
              top: `${(activeCounty.y / 500) * 100 - 24}%`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            {/* Speech bubble pointer */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-brand-dark/95"></div>
            
            <div className="space-y-2.5 text-left">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-brand-gold uppercase tracking-widest">
                <MapPin className="w-3.5 h-3.5" />
                <span>{activeCounty.name} County</span>
              </div>
              <h4 className="text-sm font-serif font-bold text-white leading-snug line-clamp-1">{activeCounty.projects}</h4>
              
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div className="flex items-center gap-1 text-brand-cream opacity-90 text-xs">
                  <Trees className="w-4 h-4 text-brand-gold" />
                  <span>{activeCounty.trees} Trees</span>
                </div>
                <div className="flex items-center gap-0.5 text-brand-gold font-bold text-[9px] uppercase tracking-wider">
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Info Column */}
      <div className="w-full lg:w-[55%] space-y-6 text-left">
        <div className="inline-block px-3 py-1 rounded-full bg-brand-green/10 text-brand-green font-bold text-xs uppercase tracking-widest font-sans">
          Geographic Footprint
        </div>
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-brand-dark leading-tight">
          Where GSSF is Restoring Ecosystems
        </h3>
        <p className="text-slate-500 font-sans text-sm sm:text-md leading-relaxed">
          GSSF targets key dryland regions and ecological catchments in Kenya. Our localized models engage directly with communities on the ground, creating resilient agroforestry corridors and rebuilding forest canopies.
        </p>
        
        {/* County cards grid - Styled beautifully */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {COUNTIES.map((county) => (
            <button
              key={county.name}
              onClick={() => handleCountyClick(county.name)}
              className="flex items-center justify-between p-4 rounded-2xl border border-brand-cream bg-brand-cream/5 hover:bg-brand-green hover:text-white hover:border-brand-green hover:shadow-md hover:shadow-brand-green/10 transition-all duration-300 text-left font-sans group"
            >
              <div className="space-y-1">
                <span className="block text-xs font-bold text-brand-gold uppercase tracking-wider group-hover:text-brand-cream">
                  {county.name} County
                </span>
                <span className="text-sm font-serif font-bold text-brand-dark group-hover:text-white block">
                  {county.trees} Trees
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-brand-green/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <ArrowRight className="w-4 h-4 text-brand-green group-hover:text-white transform group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
