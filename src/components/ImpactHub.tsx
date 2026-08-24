import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Trees, Calendar, Leaf, Award, X } from 'lucide-react';
import { Card, Badge, Modal } from 'antd';
import { InteractiveMap } from './InteractiveMap';

// Extended Project Interface
export interface Project {
  id: string;
  title: string;
  location: string;
  county: string;
  constituency?: string;
  treesPlanted: number;
  description: string;
  imageUrl?: string;
  imageUrls?: string[];
  year: number;
  status: 'active' | 'completed';
  milestones?: string[];
  partners?: string[];
}

// Seed Data
const PROJECTS: Project[] = [
  {
    id: 'proj0',
    title: 'Makueni Forest Canopy Restoration',
    location: 'Ngwata Vocational Training Centre',
    county: 'Makueni',
    constituency: 'Kibwezi East',
    treesPlanted: 1500,
    description:
      'At Ngwata Vocational Training Centre in Kibwezi East, this initiative is restoring native tree cover while engaging learners and the local community in practical environmental conservation. The project supports soil and water protection, strengthens climate resilience, and promotes long-term stewardship of Makueni’s natural resources.',
    imageUrls: [
      'https://ik.imagekit.io/36h5sgvlw/WhatsApp%20Image%202026-08-16%20at%2014.51.24%20(2).jpeg',
      'https://ik.imagekit.io/36h5sgvlw/WhatsApp%20Image%202026-08-16%20at%2014.51.24.jpeg',
      'https://ik.imagekit.io/36h5sgvlw/WhatsApp%20Image%202026-08-16%20at%2014.51.22.jpeg',
      'https://ik.imagekit.io/36h5sgvlw/WhatsApp%20Image%202026-08-16%20at%2014.51.22%20(1).jpeg',
    ],
    year: 2024,
    status: 'active',
    milestones: [
      'Successfully raised and planted 1,500 indigenous seedlings',
      'Trained 80+ Ngwata VTC students in nursery care techniques',
      'Set up a solar-powered drip irrigation loop for dry season support'
    ],
    partners: ['Ngwata VTC Board', 'Kibwezi East Farmers Association']
  },
  {
    id: 'proj1',
    title: 'Makueni Forest Canopy Restoration',
    location: 'Kibwezi Forest',
    county: 'Makueni',
    treesPlanted: 8500,
    description: 'Restoring depleted native forest cover in the Kibwezi area to secure micro-climate stability and clean groundwater sources for local community schemes.',
    imageUrl: `${import.meta.env.BASE_URL}mount_kenya_watershed.png`,
    year: 2024,
    status: 'active',
    milestones: [
      'Rehabilitated 12 hectares of degraded forest zone',
      'Cleared invasive shrub species to allow native canopy recovery',
      'Organized 5 community-led tree planting drives'
    ],
    partners: ['Kenya Forest Service (KFS)', 'Kibwezi Community Forest Association']
  },
  {
    id: 'proj2',
    title: 'Kajiado Eco-Village Housing Scheme',
    location: 'Oloitokitok Plains',
    county: 'Kajiado',
    treesPlanted: 2200,
    description: 'Developing climate-resilient mud-brick housing utilizing solar microgrids, community biogas, and surrounding multi-layered agroforestry buffer zones.',
    imageUrl: `${import.meta.env.BASE_URL}kajiado_eco_village.png`,
    year: 2024,
    status: 'active',
    milestones: [
      'Constructed 4 pilot eco-friendly mud-brick homes',
      'Installed a 10 kW community solar microgrid',
      'Planted a protective windbreak corridor with 2,200 acacia trees'
    ],
    partners: ['Oloitokitok Trust', 'Renewable Energy East Africa']
  },
  {
    id: 'proj3',
    title: 'Machakos Grassland Agroforestry Corridor',
    location: 'Yatta Plateau',
    county: 'Machakos',
    treesPlanted: 4300,
    description: 'Partnering with local farmers to plant dryland-resilient trees (Acacia, Neem) that offer shade for livestock, improve soil nutrients, and combat regional desertification.',
    imageUrl: `${import.meta.env.BASE_URL}laikipia_grassland.png`,
    year: 2024,
    status: 'completed',
    milestones: [
      'Signed agroforestry agreements with 45 smallholder farmers',
      'Distributed and planted 4,300 neem and acacia saplings',
      'Achieved a 92% seedling survival rate after first rainy season'
    ],
    partners: ['Yatta Cooperative Society', 'Dryland Research Center']
  },
  {
    id: 'proj4',
    title: 'Kitui River Basin Conservation Drive',
    location: 'Athiriver Catchment',
    county: 'Kitui',
    treesPlanted: 5000,
    description: 'Rehabilitating semi-arid river basins and seasonal sand-dam catchments through dryland-adapted forest growth to secure water tables and promote community agriculture.',
    imageUrl: `${import.meta.env.BASE_URL}kilifi_mangrove.png`,
    year: 2024,
    status: 'active',
    milestones: [
      'Planted 5,000 deep-rooted seedlings along the Athiriver banks',
      'Built 2 sand-dams to improve dry-season water storage',
      'Formed a riverbank protection monitoring committee'
    ],
    partners: ['Kitui Water Catchment Board', 'Athiriver Self-Help Group']
  },
];

// Helper Animated Counter Component
const AnimatedCounter: React.FC<{ target: number; suffix?: string; duration?: number }> = ({ 
  target, 
  suffix = '', 
  duration = 2000 
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = target;
    const increment = Math.ceil(end / (duration / 30));
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [isVisible, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

// Project Card Component
interface ProjectCardProps {
  project: Project;
  hoveredCard: string | null;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  hoveredCard, 
  onMouseEnter, 
  onMouseLeave 
}) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!project.imageUrls || project.imageUrls.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % project.imageUrls!.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [project.imageUrls]);

  const hasMultipleImages = project.imageUrls && project.imageUrls.length > 0;

  return (
    <>
      <Card
        onClick={() => setIsModalOpen(true)}
        className="overflow-hidden border border-brand-cream/60 rounded-2xl bg-brand-alabaster shadow-sm hover:shadow-xl transition-all duration-300 transform cursor-pointer"
        style={{ padding: 0 }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        bodyStyle={{ padding: 0 }}
      >
        <div className="flex flex-col sm:flex-row h-full">
          
          {/* Card Image Column */}
          <div className="sm:w-2/5 relative aspect-square sm:aspect-auto min-h-[200px] overflow-hidden bg-brand-cream flex-shrink-0">
            {hasMultipleImages ? (
              project.imageUrls!.map((url, idx) => (
                <img
                  key={url}
                  src={url}
                  alt={`${project.title} - ${idx + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transform transition-all duration-1000 ${
                    hoveredCard === project.id ? 'scale-105' : 'scale-100'
                  }`}
                  style={{
                    opacity: currentImgIndex === idx ? 1 : 0,
                    pointerEvents: currentImgIndex === idx ? 'auto' : 'none'
                  }}
                />
              ))
            ) : (
              <img
                src={project.imageUrl}
                alt={project.title}
                className={`w-full h-full object-cover transform transition-transform duration-700 ${
                  hoveredCard === project.id ? 'scale-105' : 'scale-100'
                }`}
              />
            )}

            {/* Slideshow Dot Indicators overlay */}
            {hasMultipleImages && project.imageUrls!.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-black/40 backdrop-blur-sm px-3 py-2 rounded-full">
                {project.imageUrls!.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImgIndex(idx);
                    }}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 focus:outline-none ${
                      currentImgIndex === idx ? 'bg-brand-gold w-3' : 'bg-white/60 hover:bg-white'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Status Tag overlay */}
            <div className="absolute top-4 left-4 z-10">
              <Badge
                status={project.status === 'active' ? 'processing' : 'success'}
                text={project.status === 'active' ? 'Active' : 'Completed'}
                className="px-2.5 py-1 rounded bg-brand-alabaster/95 backdrop-blur-sm text-xs font-sans font-bold uppercase tracking-wider border border-brand-cream/50"
              />
            </div>
          </div>

          {/* Card Text Column */}
          <div className="sm:w-3/5 p-6 flex flex-col justify-between text-left space-y-4">
            <div className="space-y-2">
              {/* Location Info */}
              <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-gold font-sans uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>{project.location}{project.constituency ? `, ${project.constituency}` : ''}, {project.county}</span>
              </div>

              {/* Project Title */}
              <h3 className="text-lg font-serif font-bold text-brand-dark leading-snug hover:text-brand-green transition-colors">
                {project.title}
              </h3>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-slate-500 font-sans leading-relaxed line-clamp-3">
                {project.description}
              </p>
            </div>

            {/* Card Bottom Meta Data */}
            <div className="flex items-center justify-between pt-4 border-t border-brand-cream/60">
              <div className="flex items-center gap-1.5 text-brand-green font-semibold">
                <Trees className="w-4 h-4" />
                <span className="text-xs sm:text-sm font-sans font-bold">{project.treesPlanted.toLocaleString()} Trees</span>
              </div>
              
              <div className="flex items-center gap-1 text-slate-400 font-semibold">
                <Calendar className="w-3.5 h-3.5" />
                <span className="text-xs font-sans">{project.year}</span>
              </div>
            </div>

          </div>

        </div>
      </Card>

      {/* Expanded Project Details Modal */}
      <Modal
        title={null}
        open={isModalOpen}
        onCancel={(e) => {
          e.stopPropagation();
          setIsModalOpen(false);
        }}
        footer={null}
        width={750}
        bodyStyle={{ padding: 0 }}
        centered
        className="rounded-3xl overflow-hidden"
      >
        <div className="flex flex-col text-left">
          
          {/* Modal Header Slideshow */}
          <div className="relative h-[250px] sm:h-[350px] bg-brand-cream overflow-hidden">
            {hasMultipleImages ? (
              project.imageUrls!.map((url, idx) => (
                <img
                  key={url}
                  src={url}
                  alt={`${project.title} - ${idx + 1}`}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-1000"
                  style={{
                    opacity: currentImgIndex === idx ? 1 : 0,
                  }}
                />
              ))
            ) : (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            )}
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            
            {/* Title Overlaid */}
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <div className="flex flex-wrap gap-2">
                <Badge
                  status={project.status === 'active' ? 'processing' : 'success'}
                  text={project.status === 'active' ? 'Active' : 'Completed'}
                  className="px-2.5 py-0.5 rounded bg-brand-green text-white text-[10px] font-sans font-bold uppercase tracking-wider"
                />
                <span className="px-2.5 py-0.5 rounded bg-brand-gold text-white text-[10px] font-sans font-bold uppercase tracking-wider">
                  {project.county} County
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
                {project.title}
              </h3>
            </div>
            
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-20 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm transition-all focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
            
            {/* Meta Stats Panel */}
            <div className="grid grid-cols-3 gap-4 p-4 rounded-xl border border-brand-cream bg-brand-cream/10">
              <div className="text-center space-y-1">
                <span className="block text-slate-400 text-[10px] uppercase font-sans font-semibold tracking-wider">Plant Count</span>
                <div className="flex items-center justify-center gap-1 text-brand-green font-bold">
                  <Trees className="w-4 h-4" />
                  <span className="text-sm font-sans">{project.treesPlanted.toLocaleString()}</span>
                </div>
              </div>
              <div className="text-center space-y-1 border-x border-brand-cream/60">
                <span className="block text-slate-400 text-[10px] uppercase font-sans font-semibold tracking-wider">Launch Year</span>
                <div className="flex items-center justify-center gap-1 text-slate-700 font-bold">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-sans">{project.year}</span>
                </div>
              </div>
              <div className="text-center space-y-1">
                <span className="block text-slate-400 text-[10px] uppercase font-sans font-semibold tracking-wider">Subcounty</span>
                <div className="flex items-center justify-center gap-1 text-brand-gold font-bold">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-sans line-clamp-1">{project.constituency || 'Central'}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-sm font-serif font-bold text-brand-dark uppercase tracking-wider border-b border-brand-cream/40 pb-2">
                Field Report & Objectives
              </h4>
              <p className="text-slate-500 font-sans text-sm sm:text-md leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Milestones list */}
            {project.milestones && project.milestones.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-serif font-bold text-brand-dark uppercase tracking-wider border-b border-brand-cream/40 pb-2">
                  Key Milestones Reached
                </h4>
                <ul className="space-y-2">
                  {project.milestones.map((milestone, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 font-sans">
                      <Award className="w-4 h-4 text-brand-green mt-0.5 flex-shrink-0" />
                      <span>{milestone}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Partners list */}
            {project.partners && project.partners.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-serif font-bold text-brand-dark uppercase tracking-wider border-b border-brand-cream/40 pb-2">
                  Strategic Field Partners
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.partners.map((partner, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg border border-brand-cream bg-brand-cream/15 text-xs text-brand-dark font-sans font-semibold"
                    >
                      {partner}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </Modal>
    </>
  );
};

// Main Component
export const ImpactHub: React.FC = () => {
  const [selectedCounty, setSelectedCounty] = useState<string>('all');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const counties = ['all', 'Makueni', 'Kitui', 'Machakos', 'Kajiado'];

  const filteredProjects = selectedCounty === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.county === selectedCounty);

  const totalTrees = PROJECTS.reduce((acc, curr) => acc + curr.treesPlanted, 0);

  // Carbon: 22kg CO2 offset annually per tree. 
  // Equivalent: 1 passenger car emits 4600kg CO2 per year.
  const co2OffsetKg = totalTrees * 22;
  const carEquivalence = Math.round(co2OffsetKg / 4600);

  return (
    <section id="impact" className="py-24 bg-brand-alabaster relative">
      <div className="w-full px-6 md:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-brand-green/10 text-brand-green font-bold text-xs uppercase tracking-widest font-sans">
            Impact Hub
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-dark">
            Localized Projects Across Kenya
          </h2>
          <p className="text-slate-500 font-sans text-sm sm:text-md">
            GSSF implements action-oriented programs designed to restore land health and secure sustainable community settlements.
          </p>
        </div>

        {/* 1. Interactive Reforestation Map of Kenya */}
        <InteractiveMap onSelectCounty={setSelectedCounty} />

        {/* 3. Live Impact Dashboard Grid */}
        <div id="impact-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          {/* Dashboard Metric 1: Total Trees */}
          <div className="bg-white border border-brand-cream/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 text-left space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green">
              <Trees className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="block text-slate-400 text-xs uppercase font-sans font-semibold tracking-wider">Trees Planted</span>
              <h4 className="text-2xl sm:text-3xl font-serif font-bold text-brand-dark">
                <AnimatedCounter target={totalTrees} suffix="+" />
              </h4>
            </div>
            <p className="text-xs text-slate-500 font-sans leading-relaxed">
              Consolidated active canopy plantings across dryland ecosystems.
            </p>
          </div>

          {/* Dashboard Metric 2: Active Schemes */}
          <div className="bg-white border border-brand-cream/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 text-left space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
              <Leaf className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="block text-slate-400 text-xs uppercase font-sans font-semibold tracking-wider">Active Schemes</span>
              <h4 className="text-2xl sm:text-3xl font-serif font-bold text-brand-dark">
                <AnimatedCounter target={PROJECTS.length} />
              </h4>
            </div>
            <p className="text-xs text-slate-500 font-sans leading-relaxed">
              Localized, community-led programs currently managed on the ground.
            </p>
          </div>

          {/* Dashboard Metric 3: Carbon Offset Calculator */}
          <div className="bg-white border border-brand-cream/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 text-left col-span-1 md:col-span-1 lg:col-span-2 flex flex-col justify-between gap-4">
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green">
                  <Award className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="block text-slate-400 text-xs uppercase font-sans font-semibold tracking-wider">Annual CO2 Offset</span>
                  <h4 className="text-xl sm:text-2xl font-serif font-bold text-brand-dark">
                    <AnimatedCounter target={co2OffsetKg} suffix=" kg" />
                  </h4>
                </div>
              </div>
              <div className="bg-brand-cream/30 border border-brand-cream px-3 py-2.5 rounded-xl font-sans text-center">
                <span className="block text-[20px] font-bold text-brand-green">-{carEquivalence}</span>
                <span className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold">Cars off road</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 font-sans leading-relaxed border-t border-brand-cream/60 pt-3">
              Equivalent to removing emissions of <strong>{carEquivalence} passenger cars</strong> yearly (assuming 4.6T CO2 emissions per vehicle/year).
            </p>
          </div>

          {/* Dashboard Metric 4: Species Diversity Grid */}
          <div className="bg-white border border-brand-cream/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 text-left lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between border-b border-brand-cream/60 pb-3">
              <h4 className="text-sm font-serif font-bold text-brand-dark uppercase tracking-wider">
                Tree Species Diversity & Distribution
              </h4>
              <span className="text-xs text-slate-400 font-sans font-semibold">Survival Goal: 90%+</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Species 1 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold font-sans">
                  <span className="text-brand-dark">Acacia (Dryland Protection)</span>
                  <span className="text-brand-green">40%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-green rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
              {/* Species 2 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold font-sans">
                  <span className="text-brand-dark">Neem (Medicinal & Soil)</span>
                  <span className="text-brand-green">30%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-gold rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              {/* Species 3 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold font-sans">
                  <span className="text-brand-dark">Bamboo (Water Catchment)</span>
                  <span className="text-brand-green">20%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-green/75 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
              {/* Species 4 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold font-sans">
                  <span className="text-brand-dark">Indigenous Canopy (Canopy Rec)</span>
                  <span className="text-brand-green">10%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-gold/75 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* County Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          {counties.map((county) => (
            <button
              key={county}
              onClick={() => setSelectedCounty(county)}
              className={`px-5 py-2 rounded-full font-sans text-xs sm:text-sm font-semibold border transition-all-300 ${
                selectedCounty === county
                  ? 'bg-brand-green text-white border-brand-green shadow-md shadow-brand-green/10'
                  : 'bg-brand-cream/30 text-brand-dark/75 border-brand-cream hover:bg-brand-cream/60 hover:text-brand-dark'
              }`}
            >
              {county === 'all' ? 'All Initiatives' : `${county} County`}
            </button>
          ))}
        </div>

        {/* Grid of Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              hoveredCard={hoveredCard}
              onMouseEnter={() => setHoveredCard(project.id)}
              onMouseLeave={() => setHoveredCard(null)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
