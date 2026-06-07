import React, { useState, useEffect, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  X, 
  Filter, 
  Image as ImageIcon,
  ArrowLeft
} from 'lucide-react';
import { Button, Card, Badge } from 'antd';

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
  category: 'Reforestation' | 'Eco-Housing' | 'Communities';
}

// ============================================================================
// INSTRUCTIONS TO USER FOR IMAGEKIT.IO INTEGRATION:
// To display your own images from imagekit.io, replace the 'url' fields below 
// with your copied imagekit URLs.
// Example: url: "https://ik.imagekit.io/your_imagekit_id/folder/image.jpg"
// ============================================================================
const GALLERY_DATA: GalleryImage[] = [
  {
    id: 'gssf-img-1',
    title: 'Kenyan Nursery Reforestation',
    description: 'Local community members setting up seed beds and raising indigenous trees for regional reforestation initiatives.',
    category: 'Reforestation',
    url: `${import.meta.env.BASE_URL}reforestation_kenya.png`,
  },
  {
    id: 'gssf-img-2',
    title: 'Water Catchment Rehabilitation',
    description: 'Securing soil structures and preserving essential watersheds around mountain zones in Kenya.',
    category: 'Reforestation',
    url: `${import.meta.env.BASE_URL}mount_kenya_watershed.png`,
  },
  {
    id: 'gssf-img-3',
    title: 'Solar Powered Eco-Housing',
    description: 'Modern, low-carbon mud-brick dwellings built in Kajiado, featuring solar mini-grids and biogas facilities.',
    category: 'Eco-Housing',
    url: `${import.meta.env.BASE_URL}kajiado_eco_village.png`,
  },
  {
    id: 'gssf-img-4',
    title: 'Dryland Pastoral Agroforestry',
    description: 'Integrating drought-resilient trees with grasslands to combat desertification and support native livestock.',
    category: 'Communities',
    url: `${import.meta.env.BASE_URL}laikipia_grassland.png`,
  },
  {
    id: 'gssf-img-5',
    title: 'Estuary Mangrove Restoration',
    description: 'Planting mangrove saplings in the coastal tidal flats to protect marine life and prevent shoreline erosion.',
    category: 'Reforestation',
    url: `${import.meta.env.BASE_URL}kilifi_mangrove.png`,
  },
  {
    id: 'gssf-img-6',
    title: 'Green Living Day',
    description: 'Tree Planting and community clean-up event in Emali, engaging local youth in hands-on climate action.',
    category: 'Reforestation',
    url: 'https://ik.imagekit.io/36h5sgvlw/Screenshot%202026-06-07%20135517.png',
  },
];

interface GalleryProps {
  onBackToHome: () => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onBackToHome }) => {
  // Slideshow State
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  
  // Grid/Filter State
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Slideshow Auto-play logic
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % GALLERY_DATA.length);
    }, 5000); // Advance slide every 5 seconds

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Slideshow Navigation Handlers
  const handlePrevSlide = () => {
    setSlideIndex((prev) => (prev - 1 + GALLERY_DATA.length) % GALLERY_DATA.length);
  };

  const handleNextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % GALLERY_DATA.length);
  };

  // Filter grid items based on chosen category tab
  const filteredGridImages = selectedCategory === 'All' 
    ? GALLERY_DATA 
    : GALLERY_DATA.filter(img => img.category === selectedCategory);

  // Lightbox Navigation Handlers
  const handlePrevLightbox = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => 
      prev === null ? null : (prev - 1 + filteredGridImages.length) % filteredGridImages.length
    );
  }, [lightboxIndex, filteredGridImages]);

  const handleNextLightbox = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => 
      prev === null ? null : (prev + 1) % filteredGridImages.length
    );
  }, [lightboxIndex, filteredGridImages]);

  // Keyboard Event Listeners for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowLeft') handlePrevLightbox();
      if (e.key === 'ArrowRight') handleNextLightbox();
      if (e.key === 'Escape') setLightboxIndex(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, handlePrevLightbox, handleNextLightbox]);

  return (
    <div className="bg-brand-alabaster min-h-screen pt-24 pb-20 font-sans">
      <div className="w-full px-6 md:px-12 lg:px-16 space-y-12">
        
        {/* Header Breadcrumb & Back CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-cream pb-6 text-left">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark">GSSF Photo Gallery</h1>
            <p className="text-slate-500 text-sm">Visual stories of ecological preservation, eco-villages, and communities in Kenya.</p>
          </div>
          <Button 
            type="default" 
            icon={<ArrowLeft className="w-4 h-4" />}
            onClick={onBackToHome}
            className="flex items-center gap-2 border-brand-green/30 text-brand-green hover:text-brand-green hover:border-brand-green font-semibold rounded-xl py-5 self-start sm:self-auto"
            style={{ borderRadius: '12px' }}
          >
            Back to Home
          </Button>
        </div>

        {/* 1. Large Slideshow Component */}
        <div className="relative bg-brand-dark rounded-2xl overflow-hidden shadow-lg border border-brand-green/10">
          {/* Active Image Window */}
          <div className="relative h-[350px] sm:h-[450px] md:h-[550px] w-full overflow-hidden flex items-center justify-center">
            <img 
              src={GALLERY_DATA[slideIndex].url} 
              alt={GALLERY_DATA[slideIndex].title} 
              className="w-full h-full object-cover transition-all duration-700 ease-in-out"
            />
            {/* Dark shadow gradient for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            
            {/* Category Tag */}
            <div className="absolute top-6 left-6 z-10">
              <span className="px-3.5 py-1.5 rounded-full bg-brand-gold text-white text-xs font-bold font-sans uppercase tracking-widest shadow-md">
                {GALLERY_DATA[slideIndex].category}
              </span>
            </div>

            {/* Previous/Next Navigation Arrows overlay */}
            <button 
              onClick={handlePrevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-brand-gold text-white hover:scale-105 transition-all duration-300 backdrop-blur-sm focus:outline-none"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={handleNextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-brand-gold text-white hover:scale-105 transition-all duration-300 backdrop-blur-sm focus:outline-none"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Play/Pause Auto-play state overlay */}
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute right-6 top-6 z-10 p-2.5 rounded-full bg-black/50 hover:bg-brand-gold text-white transition-all-300 backdrop-blur-sm focus:outline-none"
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            </button>

            {/* Caption Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-left text-white space-y-2 z-10 pointer-events-none">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold leading-tight">
                {GALLERY_DATA[slideIndex].title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 max-w-3xl leading-relaxed font-sans font-light">
                {GALLERY_DATA[slideIndex].description}
              </p>
            </div>
          </div>

          {/* Slideshow Horizontal Thumbnails bar */}
          <div className="bg-brand-dark/95 border-t border-white/10 p-4 flex items-center gap-3 overflow-x-auto scrollbar-thin">
            {GALLERY_DATA.map((img, index) => (
              <button
                key={img.id}
                onClick={() => {
                  setSlideIndex(index);
                  setIsPlaying(false); // Pause auto-play when user manually clicks thumbnail
                }}
                className={`relative flex-shrink-0 w-20 sm:w-24 h-14 sm:h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 focus:outline-none ${
                  slideIndex === index 
                    ? 'border-brand-gold scale-[1.03] shadow-md shadow-brand-gold/20' 
                    : 'border-transparent opacity-50 hover:opacity-80'
                }`}
              >
                <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* 2. Grid & Filter Section */}
        <div className="space-y-8">
          
          {/* Header & Tabs */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-brand-cream/80 pb-6 text-left">
            <div className="flex items-center gap-2 text-brand-green font-bold uppercase tracking-wider text-xs font-sans">
              <Filter className="w-4 h-4" />
              <span>Explore Initiatives Library</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {['All', 'Reforestation', 'Eco-Housing', 'Communities'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full font-sans text-xs sm:text-sm font-semibold border transition-all-300 ${
                    selectedCategory === cat
                      ? 'bg-brand-green text-white border-brand-green shadow-md shadow-brand-green/10'
                      : 'bg-brand-cream/30 text-brand-dark/75 border-brand-cream hover:bg-brand-cream/60 hover:text-brand-dark'
                  }`}
                >
                  {cat === 'All' ? 'All Images' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout of Filtered Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGridImages.map((img, index) => (
              <Card
                key={img.id}
                hoverable
                onClick={() => setLightboxIndex(index)}
                className="overflow-hidden border border-brand-cream/60 rounded-2xl bg-brand-alabaster shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
                bodyStyle={{ padding: '20px', textAlign: 'left' }}
                cover={
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-cream">
                    <img 
                      src={img.url} 
                      alt={img.title} 
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
                    <div className="absolute top-4 left-4">
                      <Badge 
                        text={img.category} 
                        className="px-2.5 py-1 rounded bg-brand-alabaster/95 backdrop-blur-sm text-[10px] font-sans font-bold uppercase tracking-wider border border-brand-cream/50 text-brand-green"
                      />
                    </div>
                  </div>
                }
              >
                <div className="space-y-2">
                  <h3 className="text-md sm:text-lg font-serif font-bold text-brand-dark group-hover:text-brand-green transition-colors flex items-center justify-between">
                    <span>{img.title}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-sans leading-relaxed line-clamp-2">
                    {img.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredGridImages.length === 0 && (
            <div className="text-center py-20 bg-brand-cream/20 rounded-2xl border border-dashed border-brand-cream">
              <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-sans">No gallery images found matching this category.</p>
            </div>
          )}
        </div>

      </div>

      {/* 3. Lightbox Viewer Modal */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-between py-6 px-4"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Lightbox Header Controls */}
          <div className="w-full flex items-center justify-between max-w-6xl px-4 z-10">
            <span className="text-white/70 font-sans text-sm font-semibold">
              Image {lightboxIndex + 1} of {filteredGridImages.length}
            </span>
            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-brand-gold text-white hover:scale-105 transition-all duration-300 backdrop-blur-sm focus:outline-none"
              aria-label="Close viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lightbox Middle Viewer (Arrows and Image) */}
          <div 
            className="w-full flex items-center justify-between max-w-6xl flex-grow"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image area
          >
            {/* Left Nav Button */}
            <button
              onClick={handlePrevLightbox}
              className="p-3 rounded-full bg-white/10 hover:bg-brand-gold text-white hover:scale-105 transition-all duration-300 backdrop-blur-sm focus:outline-none mx-2 sm:mx-4"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Displaying Image */}
            <div className="flex-grow max-h-[70vh] flex items-center justify-center p-2">
              <img 
                src={filteredGridImages[lightboxIndex].url} 
                alt={filteredGridImages[lightboxIndex].title} 
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl animate-fade-in"
              />
            </div>

            {/* Right Nav Button */}
            <button
              onClick={handleNextLightbox}
              className="p-3 rounded-full bg-white/10 hover:bg-brand-gold text-white hover:scale-105 transition-all duration-300 backdrop-blur-sm focus:outline-none mx-2 sm:mx-4"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Footer Captions */}
          <div 
            className="w-full max-w-3xl text-center text-white px-6 space-y-2 z-10 pointer-events-none pb-4"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="inline-block px-3 py-1 rounded bg-brand-gold text-white text-[10px] font-bold font-sans uppercase tracking-widest">
              {filteredGridImages[lightboxIndex].category}
            </span>
            <h2 className="text-lg sm:text-xl md:text-2xl font-serif font-bold">
              {filteredGridImages[lightboxIndex].title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-2xl mx-auto font-light">
              {filteredGridImages[lightboxIndex].description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
