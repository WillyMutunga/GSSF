import React, { useState } from 'react';
import { MapPin, Trees, Calendar } from 'lucide-react';
import { Card, Badge } from 'antd';

export interface Project {
  id: string;
  title: string;
  location: string;
  county: string;
  treesPlanted: number;
  description: string;
  imageUrl: string;
  year: number;
  status: 'active' | 'completed';
}

const PROJECTS: Project[] = [
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
  },
];

export const ImpactHub: React.FC = () => {
  const [selectedCounty, setSelectedCounty] = useState<string>('all');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const counties = ['all', 'Makueni', 'Kitui', 'Machakos', 'Kajiado'];

  const filteredProjects = selectedCounty === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.county === selectedCounty);

  const totalTrees = PROJECTS.reduce((acc, curr) => acc + curr.treesPlanted, 0);

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

        {/* Global Impact Metrics Banner */}
        <div className="bg-brand-green text-white rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 mb-16 shadow-lg shadow-brand-green/20">
          <div className="text-left space-y-2">
            <h3 className="text-xl sm:text-2xl font-serif font-bold">Total Collective Restoration Impact</h3>
            <p className="text-xs sm:text-sm font-sans text-brand-cream opacity-85">Consolidating active projects across the East African ecosystem.</p>
          </div>
          <div className="flex gap-8 divide-x divide-white/20">
            <div className="pl-0 flex flex-col items-center md:items-start">
              <span className="text-3xl sm:text-4xl font-serif font-bold text-brand-gold">{totalTrees.toLocaleString()}</span>
              <span className="text-xs uppercase tracking-wider font-semibold opacity-75 mt-1">Trees Planted</span>
            </div>
            <div className="pl-8 flex flex-col items-center md:items-start">
              <span className="text-3xl sm:text-4xl font-serif font-bold text-brand-gold">{PROJECTS.length}</span>
              <span className="text-xs uppercase tracking-wider font-semibold opacity-75 mt-1">Active Schemes</span>
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
            <Card
              key={project.id}
              className="overflow-hidden border border-brand-cream/60 rounded-2xl bg-brand-alabaster shadow-sm hover:shadow-xl transition-all duration-300 transform"
              style={{ padding: 0 }}
              onMouseEnter={() => setHoveredCard(project.id)}
              onMouseLeave={() => setHoveredCard(null)}
              bodyStyle={{ padding: 0 }}
            >
              <div className="flex flex-col sm:flex-row h-full">
                
                {/* Card Image Column */}
                <div className="sm:w-2/5 relative aspect-square sm:aspect-auto min-h-[200px] overflow-hidden bg-brand-cream">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className={`w-full h-full object-cover transform transition-transform duration-700 ${
                      hoveredCard === project.id ? 'scale-105' : 'scale-100'
                    }`}
                  />
                  {/* Status Tag overlay */}
                  <div className="absolute top-4 left-4">
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
                      <span>{project.location}, {project.county}</span>
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
          ))}
        </div>

      </div>
    </section>
  );
};
