import React, { useState } from 'react';
import { ShieldCheck, Home, Users, ArrowRight } from 'lucide-react';
import { Card } from 'antd';

interface Pillar {
  id: string;
  title: string;
  icon: React.ReactNode;
  shortDesc: string;
  detailedDesc: string;
  keyInitiatives: string[];
}

export const AboutVision: React.FC = () => {
  const [activePillar, setActivePillar] = useState<string>('ecology');

  const pillars: Pillar[] = [
    {
      id: 'ecology',
      title: 'Ecological Preservation',
      icon: <ShieldCheck className="w-8 h-8 text-brand-green" />,
      shortDesc: 'Restoring native flora and protecting crucial watersheds across Kenya.',
      detailedDesc: 'Our ecological programs prioritize restoring depleted landscapes, establishing community forests, and safeguarding biological diversity. We collaborate with national parks and local landowners to create wildlife buffer corridors.',
      keyInitiatives: ['Indigenous Tree Nursery Networks', 'River Basin Conservation Projects', 'Community-Led Seed Collecting'],
    },
    {
      id: 'settlement',
      title: 'Sustainable Settlements',
      icon: <Home className="w-8 h-8 text-brand-green" />,
      shortDesc: 'Constructing eco-friendly, energy-efficient housing developments.',
      detailedDesc: 'We design and construct carbon-neutral housing schemes that blend naturally into local terrains. Our settlements utilize solar microgrids, greywater recycling, and locally sourced sustainable building materials.',
      keyInitiatives: ['Low-Carbon Mud-Brick Housing', 'Rainwater Harvesting Infrastructures', 'Solar Microgrid Communities'],
    },
    {
      id: 'community',
      title: 'Community Empowerment',
      icon: <Users className="w-8 h-8 text-brand-green" />,
      shortDesc: 'Enabling local leadership and establishing green vocational livelihoods.',
      detailedDesc: 'Sustainable change begins with people. We conduct vocational training workshops on agroforestry, ecotourism management, and solar maintenance, creating high-value green jobs that lift families out of poverty.',
      keyInitiatives: ['Agroforestry Training Centers', 'Youth Eco-Entrepreneurship Grants', 'Women-Led Green Cooperatives'],
    },
  ];

  const activeData = pillars.find((p) => p.id === activePillar) || pillars[0];

  return (
    <section id="about" className="py-24 bg-brand-cream/30 border-y border-brand-cream/50 relative">
      <div className="w-full px-6 md:px-12 lg:px-16">
        
        {/* Layout Grid: Left Side Description, Right Side Pillar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Organization Roots */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-block px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold font-bold text-xs uppercase tracking-widest font-sans">
              Our Vision & Roots
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-dark leading-tight">
              Rooted in Kenya, Growing Since 2024
            </h2>
            
            <p className="text-slate-600 font-sans leading-relaxed">
              Established in 2024, the Green Settlement Schemes Foundation (GSSF) arose from a critical realization: environmental conservation and human housing cannot exist in isolation.
            </p>
            
            <p className="text-slate-600 font-sans leading-relaxed">
              To build a resilient future, we must design community settlements that act as extensions of the ecosystem rather than disruptions. By combining sustainable architecture with ecological restoration, we create models of universal responsibility.
            </p>
            
            {/* Mission Card */}
            <div className="bg-brand-green/5 border-l-4 border-brand-green p-6 rounded-r-xl space-y-2 mt-8">
              <h3 className="font-serif font-bold text-brand-green text-lg">Universal Responsibility</h3>
              <p className="text-sm font-sans text-brand-dark italic opacity-90">
                "We do not inherit the earth from our ancestors, we borrow it from our children. Our duty is to return it in better health."
              </p>
            </div>
          </div>

          {/* Right Column: Pillars Interactive Grid */}
          <div id="initiatives" className="lg:col-span-7 space-y-8">
            <div className="text-left">
              <h3 className="text-xl font-serif font-bold text-brand-dark mb-2">Our Core Pillars</h3>
              <p className="text-sm text-slate-500 font-sans">Select a pillar below to explore our core focus and active initiatives.</p>
            </div>

            {/* Grid selector */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pillars.map((pillar) => {
                const isActive = pillar.id === activePillar;
                return (
                  <Card
                    key={pillar.id}
                    onClick={() => setActivePillar(pillar.id)}
                    className={`cursor-pointer border transition-all duration-300 rounded-xl hover:-translate-y-1 ${
                      isActive
                        ? 'border-brand-green bg-brand-alabaster shadow-md shadow-brand-green/5 ring-1 ring-brand-green'
                        : 'border-brand-cream/80 bg-brand-alabaster/60 hover:bg-brand-alabaster hover:shadow'
                    }`}
                    bodyStyle={{ padding: '24px' }}
                  >
                    <div className="flex flex-col items-start text-left space-y-4">
                      <div className={`p-3 rounded-xl transition-colors ${isActive ? 'bg-brand-green/10' : 'bg-brand-cream/40'}`}>
                        {pillar.icon}
                      </div>
                      <h4 className="font-serif font-bold text-md text-brand-dark">{pillar.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans">{pillar.shortDesc}</p>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Active Pillar Details Card */}
            <div className="bg-brand-alabaster border border-brand-cream rounded-xl p-8 text-left shadow-sm transition-all duration-500 ease-in-out">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-cream pb-4 mb-6">
                <h4 className="text-lg font-serif font-bold text-brand-green">{activeData.title} Overview</h4>
                <span className="text-xs font-bold font-sans uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-2.5 py-1 rounded">
                  Core Mandate
                </span>
              </div>
              
              <p className="text-sm text-slate-600 font-sans leading-relaxed mb-6">
                {activeData.detailedDesc}
              </p>

              <div>
                <h5 className="text-xs font-bold text-brand-dark uppercase tracking-wider font-sans mb-3">Key Initiatives:</h5>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeData.keyInitiatives.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-xs font-sans text-slate-600">
                      <ArrowRight className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
