import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, RotateCcw, Flame, Map as MapIcon, Globe } from 'lucide-react';
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
    lat: -1.8041,
    lng: 37.6203,
    radiusKm: 32,
    description: 'Community nurseries cultivating indigenous hardwoods and dryland canopy corridors.',
  },
  {
    id: 'kajiado',
    name: 'Kajiado',
    projects: 'Eco-Village Housing Scheme',
    trees: '2,200+',
    lat: -2.0981,
    lng: 36.7820,
    radiusKm: 30,
    description: 'Solar microgrids, rainwater storage, and pastoral perimeter windbreaks.',
  },
  {
    id: 'kitui',
    name: 'Kitui',
    projects: 'River Basin Conservation Drive',
    trees: '5,000+',
    lat: -1.3683,
    lng: 38.0106,
    radiusKm: 38,
    description: 'Seasonal riverbed protection, sand dam conservation, and dryland micro-forests.',
  },
  {
    id: 'machakos',
    name: 'Machakos',
    projects: 'Grassland Agroforestry Corridor',
    trees: '4,300+',
    lat: -1.5177,
    lng: 37.2634,
    radiusKm: 26,
    description: 'Agroforestry belts intercropped with drought-hardy legumes and fruit orchards.',
  },
];

interface InteractiveMapProps {
  onSelectCounty: (county: string) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ onSelectCounty }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const activeTileLayerRef = useRef<L.TileLayer | null>(null);
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null);
  const [mapType, setMapType] = useState<'streets' | 'satellite'>('streets');

  const setTileLayer = (type: 'streets' | 'satellite') => {
    if (!mapInstanceRef.current) return;
    if (activeTileLayerRef.current) {
      mapInstanceRef.current.removeLayer(activeTileLayerRef.current);
    }

    const tileUrl = type === 'streets'
      ? 'https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
      : 'https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}';

    const newLayer = L.tileLayer(tileUrl, {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: '&copy; Google Maps',
    });

    newLayer.addTo(mapInstanceRef.current);
    activeTileLayerRef.current = newLayer;
    setMapType(type);
  };

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Initialize map centered on Kenya's active ecosystem belt
    const map = L.map(mapContainerRef.current, {
      center: [-1.6, 37.5],
      zoom: 7.5,
      minZoom: 6,
      maxZoom: 16,
      zoomControl: false,
      scrollWheelZoom: false,
    });

    // Default to Google Maps Streets
    const initialLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: '&copy; Google Maps',
    });
    initialLayer.addTo(map);
    activeTileLayerRef.current = initialLayer;

    // Zoom controls at top-right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Nairobi landmark
    const nairobiIcon = L.divIcon({
      className: 'nairobi-marker',
      html: `
        <div style="display:flex;align-items:center;gap:5px;background:#1E4620;color:#fff;padding:4px 8px;border-radius:12px;font-size:11px;font-weight:700;font-family:sans-serif;box-shadow:0 3px 8px rgba(0,0,0,0.3);border:1.5px solid #FFFFFF;white-space:nowrap;">
          <div style="width:7px;height:7px;border-radius:50%;background:#FFD700;"></div>
          <span>Nairobi HQ</span>
        </div>
      `,
      iconSize: [85, 26],
      iconAnchor: [20, 13],
    });
    L.marker([-1.2921, 36.8219], { icon: nairobiIcon, interactive: false }).addTo(map);

    // Heatmap circles & markers for each county
    COUNTIES.forEach((county) => {
      // 1. Outer dispersion heat ring
      L.circle([county.lat, county.lng], {
        radius: county.radiusKm * 1000,
        color: '#FF5722',
        fillColor: '#FF5722',
        fillOpacity: 0.22,
        weight: 1.5,
        dashArray: '4, 6',
      }).addTo(map);

      // 2. Middle intense heat layer
      L.circle([county.lat, county.lng], {
        radius: (county.radiusKm * 0.55) * 1000,
        color: '#FFA000',
        fillColor: '#FFA000',
        fillOpacity: 0.45,
        weight: 0,
      }).addTo(map);

      // 3. Central pulsing thermal marker
      const pinIcon = L.divIcon({
        className: 'gssf-google-node',
        html: `
          <div style="position:relative;width:34px;height:34px;display:flex;align-items:center;justify-content:center;cursor:pointer;">
            <div style="position:absolute;width:100%;height:100%;border-radius:50%;background:#FF5722;opacity:0.65;animation:ping 2.2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
            <div style="position:relative;width:18px;height:18px;border-radius:50%;background:#1E4620;border:3px solid #FFFFFF;box-shadow:0 3px 10px rgba(0,0,0,0.45);"></div>
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });

      const marker = L.marker([county.lat, county.lng], { icon: pinIcon }).addTo(map);

      // Interactive Google Maps style popup
      marker.bindPopup(`
        <div style="font-family:sans-serif;padding:6px;min-width:210px;text-align:left;">
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
      mapInstanceRef.current.flyTo([lat, lng], 9.5, { duration: 1.2 });
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
      
      {/* Real Google Maps Container Column */}
      <div className="w-full lg:w-[48%] relative flex flex-col justify-center bg-brand-cream/15 rounded-3xl p-3 border border-brand-cream/40">
        
        {/* Live Google Map Element */}
        <div 
          ref={mapContainerRef} 
          className="w-full h-[380px] sm:h-[440px] rounded-2xl overflow-hidden shadow-inner z-0"
        />

        {/* Map Type Switcher, Legend, & Reset Controls Overlay */}
        <div className="flex flex-wrap items-center justify-between gap-2 mt-3 px-2">
          
          {/* Map Layer Switcher (Google Streets vs Satellite) */}
          <div className="flex items-center gap-1 bg-white/95 backdrop-blur-sm border border-brand-cream/80 p-1 rounded-xl shadow-xs text-xs font-sans">
            <button
              onClick={() => setTileLayer('streets')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                mapType === 'streets'
                  ? 'bg-brand-green text-white shadow-xs'
                  : 'text-slate-600 hover:text-brand-green'
              }`}
            >
              <MapIcon className="w-3 h-3" />
              <span>Map</span>
            </button>
            <button
              onClick={() => setTileLayer('satellite')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                mapType === 'satellite'
                  ? 'bg-brand-green text-white shadow-xs'
                  : 'text-slate-600 hover:text-brand-green'
              }`}
            >
              <Globe className="w-3 h-3" />
              <span>Satellite</span>
            </button>
          </div>

          {/* Heatmap Indicator */}
          <div className="hidden sm:flex items-center gap-1.5 bg-white/95 backdrop-blur-sm border border-brand-cream/80 px-2.5 py-1 rounded-xl shadow-xs text-xs font-sans">
            <Flame className="w-3.5 h-3.5 text-[#FF5722]" />
            <span className="text-slate-600 font-semibold text-[11px]">Heatmap Activity</span>
          </div>

          {/* Reset Map View Button */}
          <button
            onClick={handleResetView}
            className="flex items-center gap-1.5 bg-white/95 hover:bg-brand-green hover:text-white backdrop-blur-sm border border-brand-cream/80 px-3 py-1.5 rounded-xl shadow-xs text-xs font-sans font-semibold text-slate-700 transition-colors"
            title="Reset to Full Kenya View"
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
          Navigate Kenya’s real landscape via live Google Maps. GSSF targets key dryland regions and ecological catchments, engaging directly with local communities to establish resilient agroforestry corridors and rebuild forest canopies.
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
