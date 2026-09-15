import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, RotateCcw, Flame } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface CountyData {
  id: string;
  name: string;
  projects: string;
  trees: string;
  lat: number;
  lng: number;
  radiusKm: number;
  description: string;
}

const COUNTIES: CountyData[] = [
  {
    id: 'makueni',
    name: 'Makueni',
    projects: 'Forest Canopy Restoration',
    trees: '10,000+',
    lat: -1.80,
    lng: 37.62,
    radiusKm: 35,
    description: 'Community nurseries cultivating indigenous hardwoods and dryland canopy corridors.',
  },
  {
    id: 'kajiado',
    name: 'Kajiado',
    projects: 'Eco-Village Housing Scheme',
    trees: '2,200+',
    lat: -2.09,
    lng: 36.78,
    radiusKm: 32,
    description: 'Solar microgrids, rainwater storage, and pastoral perimeter windbreaks.',
  },
  {
    id: 'kitui',
    name: 'Kitui',
    projects: 'River Basin Conservation Drive',
    trees: '5,000+',
    lat: -1.37,
    lng: 38.01,
    radiusKm: 40,
    description: 'Seasonal riverbed protection, sand dam conservation, and dryland micro-forests.',
  },
  {
    id: 'machakos',
    name: 'Machakos',
    projects: 'Grassland Agroforestry Corridor',
    trees: '4,300+',
    lat: -1.52,
    lng: 37.26,
    radiusKm: 28,
    description: 'Agroforestry belts intercropped with drought-hardy legumes and fruit orchards.',
  },
];

interface InteractiveMapProps {
  onSelectCounty: (county: string) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ onSelectCounty }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Initialize authentic Leaflet map centered on Kenya's active ecosystem belt
    const map = L.map(mapContainerRef.current, {
      center: [-1.6, 37.5],
      zoom: 7.5,
      minZoom: 6,
      maxZoom: 13,
      zoomControl: false,
      scrollWheelZoom: false,
    });

    // Add CartoDB Clean Voyager High-Resolution Map Tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    // Zoom controls at top-right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Nairobi landmark label
    const nairobiIcon = L.divIcon({
      className: 'nairobi-marker',
      html: `
        <div style="display:flex;align-items:center;gap:5px;background:rgba(30,70,32,0.92);color:#fff;padding:3px 8px;border-radius:12px;font-size:11px;font-weight:700;font-family:sans-serif;box-shadow:0 2px 6px rgba(0,0,0,0.25);border:1px solid rgba(255,255,255,0.4);white-space:nowrap;">
          <div style="width:6px;height:6px;border-radius:50%;background:#FFD700;"></div>
          <span>Nairobi</span>
        </div>
      `,
      iconSize: [65, 24],
      iconAnchor: [15, 12],
    });
    L.marker([-1.2921, 36.8219], { icon: nairobiIcon, interactive: false }).addTo(map);

    // Add Heatmap Layers & County Nodes
    COUNTIES.forEach((county) => {
      // 1. Outer dispersion heat ring
      L.circle([county.lat, county.lng], {
        radius: county.radiusKm * 1000,
        color: '#FF6B35',
        fillColor: '#FF6B35',
        fillOpacity: 0.18,
        weight: 1.5,
        dashArray: '4, 6',
      }).addTo(map);

      // 2. Middle intense heat layer
      L.circle([county.lat, county.lng], {
        radius: (county.radiusKm * 0.55) * 1000,
        color: '#FFB13D',
        fillColor: '#FFB13D',
        fillOpacity: 0.4,
        weight: 0,
      }).addTo(map);

      // 3. Central pulsing thermal marker
      const pinIcon = L.divIcon({
        className: 'gssf-heatmap-node',
        html: `
          <div style="position:relative;width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;">
            <div style="position:absolute;width:100%;height:100%;border-radius:50%;background:#FF6B35;opacity:0.65;animation:ping 2.2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
            <div style="position:relative;width:16px;height:16px;border-radius:50%;background:#1E4620;border:3px solid #FFFFFF;box-shadow:0 3px 10px rgba(0,0,0,0.35);"></div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([county.lat, county.lng], { icon: pinIcon }).addTo(map);

      // Interactive popup
      marker.bindPopup(`
        <div style="font-family:sans-serif;padding:6px;min-width:200px;text-align:left;">
          <div style="font-size:10px;font-weight:bold;color:#997D2F;text-transform:uppercase;letter-spacing:1px;margin-bottom:2px;">
            ${county.name} County
          </div>
          <div style="font-size:14px;font-weight:bold;color:#1E4620;margin-bottom:4px;">
            ${county.projects}
          </div>
          <div style="font-size:11px;color:#555;margin-bottom:10px;line-height:1.4;">
            ${county.description}
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid #eee;padding-top:8px;">
            <span style="font-size:11px;font-weight:bold;color:#3B5A2B;">🌱 ${county.trees} Trees</span>
            <span style="font-size:10px;font-weight:bold;color:#997D2F;text-transform:uppercase;">View Schemes &rarr;</span>
          </div>
        </div>
      `);

      marker.on('click', () => {
        handleCountySelection(county.name, county.lat, county.lng);
      });
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  const handleCountySelection = (countyName: string, lat?: number, lng?: number) => {
    setSelectedCounty(countyName);
    onSelectCounty(countyName);

    if (mapInstanceRef.current && lat !== undefined && lng !== undefined) {
      mapInstanceRef.current.flyTo([lat, lng], 9.2, { duration: 1.2 });
    }

    const element = document.getElementById('impact-grid');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleResetView = () => {
    setSelectedCounty(null);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([-1.6, 37.5], 7.5, { duration: 1 });
    }
  };

  return (
    <div className="bg-white border border-brand-cream/65 rounded-3xl p-6 md:p-10 shadow-sm flex flex-col lg:flex-row items-center gap-12 mb-16">
      
      {/* Real Interactive Map Container Column */}
      <div className="w-full lg:w-[48%] relative flex flex-col justify-center bg-brand-cream/15 rounded-3xl p-3 border border-brand-cream/40">
        
        {/* Live Leaflet Map Element */}
        <div 
          ref={mapContainerRef} 
          className="w-full h-[380px] sm:h-[440px] rounded-2xl overflow-hidden shadow-inner z-0"
        />

        {/* Heatmap Legend & Reset Map Controls Overlay */}
        <div className="flex items-center justify-between mt-3 px-2">
          {/* Heatmap Legend */}
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-brand-cream/80 px-3 py-1.5 rounded-xl shadow-xs text-xs font-sans">
            <Flame className="w-3.5 h-3.5 text-[#FF6B35]" />
            <span className="text-slate-500 font-semibold">Heatmap Activity:</span>
            <div className="flex items-center gap-1.5 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B35]"></span>
              <span className="text-[10px] text-slate-700">Reforestation Densities</span>
            </div>
          </div>

          {/* Reset Map View Button */}
          <button
            onClick={handleResetView}
            className="flex items-center gap-1.5 bg-white/90 hover:bg-brand-green hover:text-white backdrop-blur-sm border border-brand-cream/80 px-3 py-1.5 rounded-xl shadow-xs text-xs font-sans font-semibold text-slate-700 transition-colors"
            title="Reset Map View"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset View</span>
          </button>
        </div>

      </div>

      {/* Info Column */}
      <div className="w-full lg:w-[52%] space-y-6 text-left">
        <div className="inline-block px-3 py-1 rounded-full bg-brand-green/10 text-brand-green font-bold text-xs uppercase tracking-widest font-sans">
          Geographic Footprint
        </div>
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-brand-dark leading-tight">
          Where GSSF is Restoring Ecosystems
        </h3>
        <p className="text-slate-500 font-sans text-sm sm:text-md leading-relaxed">
          Explore real geographic terrain and satellite data across Kenya. GSSF targets key dryland regions and ecological catchments, engaging directly with local communities to establish resilient agroforestry corridors and rebuild forest canopies.
        </p>
        
        {/* County cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {COUNTIES.map((county) => {
            const isSelected = selectedCounty === county.name;
            return (
              <button
                key={county.name}
                onClick={() => handleCountySelection(county.name, county.lat, county.lng)}
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 text-left font-sans group ${
                  isSelected
                    ? 'bg-brand-green text-white border-brand-green shadow-md shadow-brand-green/20'
                    : 'border-brand-cream bg-brand-cream/5 hover:bg-brand-green hover:text-white hover:border-brand-green hover:shadow-md hover:shadow-brand-green/10'
                }`}
              >
                <div className="space-y-1">
                  <span className={`block text-xs font-bold uppercase tracking-wider ${isSelected ? 'text-brand-cream' : 'text-brand-gold group-hover:text-brand-cream'}`}>
                    {county.name} County
                  </span>
                  <span className={`text-sm font-serif font-bold block ${isSelected ? 'text-white' : 'text-brand-dark group-hover:text-white'}`}>
                    {county.trees} Trees
                  </span>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isSelected ? 'bg-white/20 text-white' : 'bg-brand-green/5 group-hover:bg-white/10 text-brand-green group-hover:text-white'}`}>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
