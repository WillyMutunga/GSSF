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
    x: 230,
    y: 340,
  },
  {
    name: 'Kajiado',
    projects: 'Eco-Village Housing Scheme',
    trees: '2,200+',
    x: 160,
    y: 350,
  },
  {
    name: 'Kitui',
    projects: 'River Basin Conservation Drive',
    trees: '5,000+',
    x: 270,
    y: 290,
  },
  {
    name: 'Machakos',
    projects: 'Grassland Agroforestry Corridor',
    trees: '4,300+',
    x: 210,
    y: 280,
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
    <div className="bg-white border border-brand-cream/60 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col lg:flex-row items-center gap-8 mb-16">
      
      {/* Map Content Column */}
      <div className="w-full lg:w-1/2 relative flex justify-center bg-brand-alabaster/40 rounded-2xl p-4 border border-brand-cream/20">
        
        {/* SVG Kenya Silhouette Map */}
        <svg
          viewBox="0 0 500 500"
          className="w-full max-w-[380px] h-auto drop-shadow-md transition-all duration-300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stylized Kenya Outline */}
          <path
            d="M 190 60 C 210 60, 240 70, 260 80 C 280 90, 310 90, 330 110 C 350 130, 370 140, 390 170 C 410 200, 420 230, 400 270 C 380 310, 360 330, 340 350 C 320 370, 310 390, 280 430 C 260 450, 240 480, 220 480 C 200 480, 180 440, 160 420 C 140 400, 110 390, 90 380 C 70 370, 60 340, 60 320 C 60 300, 80 270, 70 250 C 60 230, 50 200, 70 180 C 90 160, 110 140, 130 120 C 150 100, 170 60, 190 60 Z"
            fill="#EAF0E8"
            stroke="#C5D3C1"
            strokeWidth="3"
            strokeLinejoin="round"
            className="transition-colors duration-500"
          />
          
          {/* Subtle Grid / Texture for premium look */}
          <path
            d="M 100 100 L 400 400 M 150 50 L 350 450 M 50 200 L 450 200 M 50 300 L 450 300"
            stroke="#DCE5D9"
            strokeWidth="0.5"
            strokeDasharray="4 4"
          />

          {/* Interactive Pins */}
          {COUNTIES.map((county) => (
            <g
              key={county.name}
              className="cursor-pointer group"
              onMouseEnter={() => setActiveCounty(county)}
              onMouseLeave={() => setActiveCounty(null)}
              onClick={() => handleCountyClick(county.name)}
            >
              {/* Outer Pulsing Circle */}
              <circle
                cx={county.x}
                cy={county.y}
                r="18"
                className="fill-brand-green/10 stroke-brand-green/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"
              />
              
              {/* Core Pulse Ring */}
              <circle
                cx={county.x}
                cy={county.y}
                r="8"
                className="fill-brand-gold/30 stroke-brand-gold/60 animate-ping opacity-75"
              />

              {/* Pin Center */}
              <circle
                cx={county.x}
                cy={county.y}
                r="6"
                className="fill-brand-green stroke-white stroke-2 transition-transform duration-300 transform group-hover:scale-125"
              />
            </g>
          ))}
        </svg>

        {/* Floating Custom Tooltip overlay */}
        {activeCounty && (
          <div
            className="absolute z-20 bg-brand-dark text-white p-4 rounded-xl shadow-lg border border-white/10 w-[220px] transition-all duration-300 font-sans pointer-events-none"
            style={{
              left: `${(activeCounty.x / 500) * 100}%`,
              top: `${(activeCounty.y / 500) * 100 - 24}%`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-brand-dark"></div>
            
            <div className="space-y-2 text-left">
              <div className="flex items-center gap-1.5 text-xs font-bold text-brand-gold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>{activeCounty.name} County</span>
              </div>
              <h4 className="text-sm font-serif font-bold text-white line-clamp-1">{activeCounty.projects}</h4>
              
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div className="flex items-center gap-1 text-brand-cream opacity-90 text-xs">
                  <Trees className="w-3.5 h-3.5 text-brand-gold" />
                  <span>{activeCounty.trees} Trees</span>
                </div>
                <div className="flex items-center gap-0.5 text-brand-gold font-bold text-[10px] uppercase">
                  <span>View</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Info Column */}
      <div className="w-full lg:w-1/2 space-y-6 text-left">
        <div className="inline-block px-3 py-1 rounded-full bg-brand-green/10 text-brand-green font-bold text-xs uppercase tracking-widest font-sans">
          Geographic Footprint
        </div>
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-brand-dark leading-tight">
          Where GSSF is Restoring Ecosystems
        </h3>
        <p className="text-slate-500 font-sans text-sm sm:text-md leading-relaxed">
          GSSF targets key dryland regions and ecological catchments in Kenya. Our localized models engage directly with communities on the ground, creating resilient agroforestry corridors and rebuilding forest canopies.
        </p>
        
        {/* Interactive instructions */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          {COUNTIES.map((county) => (
            <button
              key={county.name}
              onClick={() => handleCountyClick(county.name)}
              className="flex items-center justify-between p-3.5 rounded-xl border border-brand-cream bg-brand-cream/10 hover:bg-brand-green hover:text-white hover:border-brand-green transition-all duration-300 text-left font-sans group"
            >
              <div>
                <span className="block text-xs font-bold text-brand-gold uppercase tracking-wider group-hover:text-brand-cream">
                  {county.name} County
                </span>
                <span className="text-xs opacity-75 font-medium line-clamp-1">
                  {county.trees} Trees
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-brand-green group-hover:text-white transform group-hover:translate-x-1 transition-transform" />
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
