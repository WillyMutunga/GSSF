import React, { useState, useEffect } from 'react';
import { ArrowRight, Leaf } from 'lucide-react';
import { Button } from 'antd';

const HERO_BACKGROUNDS = [
  `${import.meta.env.BASE_URL}reforestation_kenya.png`,
  `${import.meta.env.BASE_URL}mount_kenya_watershed.png`,
  `${import.meta.env.BASE_URL}kajiado_eco_village.png`,
  `${import.meta.env.BASE_URL}laikipia_grassland.png`,
  `${import.meta.env.BASE_URL}kilifi_mangrove.png`,
  'https://ik.imagekit.io/36h5sgvlw/Screenshot%202026-06-07%20135517.png',
];

export const Hero: React.FC = () => {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % HERO_BACKGROUNDS.length);
    }, 6000); // Transition background image every 6 seconds
    return () => clearInterval(interval);
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center bg-brand-dark overflow-hidden"
    >
      {/* Background Slideshow Layers with Cross-Fade */}
      {HERO_BACKGROUNDS.map((bgUrl, index) => (
        <div
          key={bgUrl}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out z-0"
          style={{
            backgroundImage: `url(${bgUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: bgIndex === index ? 1 : 0,
          }}
        />
      ))}

      {/* Dark overlay for contrast and readability (left-to-right gradient overlay) */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/80 to-brand-dark/40 z-10" />
      
      {/* Ambient color accent glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-green/20 rounded-full blur-3xl pointer-events-none z-10" />

      {/* Organic transition flow to the next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-alabaster to-transparent z-10 pointer-events-none" />

      <div className="w-full px-6 md:px-12 lg:px-16 relative z-20 pt-32 pb-20">
        <div className="max-w-3xl space-y-8 text-left">
          
          {/* Tag / Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-green/30 text-white font-bold text-xs tracking-wider uppercase font-sans border border-brand-green/40 backdrop-blur-sm">
            <Leaf className="w-3.5 h-3.5 text-brand-gold fill-brand-gold/20" />
            <span>GSSF 2024 • Established in Kenya</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white leading-[1.15] font-bold">
            Fostering <span className="text-brand-gold italic">Environmental</span> Sustainability through <span className="text-brand-gold">Universal</span> Responsibility.
          </h1>

          {/* Subtitle / Paragraph */}
          <p className="text-md sm:text-lg text-slate-200 font-sans max-w-2xl leading-relaxed">
            We empower communities across Kenya to create ecological balance, establish climate-resilient settlements, and promote universal responsibility for our shared environment.
          </p>

          {/* Call To Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Button
              type="primary"
              size="large"
              icon={<ArrowRight className="w-4 h-4 ml-1" />}
              className="bg-brand-green hover:bg-brand-green/90 border-none font-semibold text-white px-8 py-6 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-all-300 shadow-lg shadow-brand-green/25"
              onClick={() => handleScrollTo('#about')}
              style={{ backgroundColor: '#3B5A2B', borderRadius: '12px' }}
            >
              Explore Our Work
            </Button>
            
            <Button
              type="default"
              size="large"
              className="border-2 border-white hover:border-brand-gold text-white hover:text-brand-gold font-semibold px-8 py-6 rounded-xl flex items-center justify-center hover:bg-white/10 hover:scale-[1.02] transition-all-300"
              onClick={() => handleScrollTo('#get-involved')}
              style={{ borderColor: '#FFFFFF', color: '#FFFFFF', borderRadius: '12px' }}
            >
              Become a Volunteer
            </Button>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8 max-w-lg">
            <div>
              <p className="text-2xl sm:text-3xl font-serif font-bold text-white">15K+</p>
              <p className="text-xs text-slate-300 font-sans uppercase tracking-wider font-semibold mt-1">Trees Planted</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-serif font-bold text-white">10+</p>
              <p className="text-xs text-slate-300 font-sans uppercase tracking-wider font-semibold mt-1">Settlements</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-serif font-bold text-white">250+</p>
              <p className="text-xs text-slate-300 font-sans uppercase tracking-wider font-semibold mt-1">Volunteers</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
