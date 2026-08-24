import React, { useState } from 'react';
import { Calendar, Clock, ArrowLeft, ArrowRight, User } from 'lucide-react';
import { Badge, Card } from 'antd';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  imageUrl: string;
  category: 'Events' | 'Agroforestry' | 'Green Energy' | 'Milestones';
  date: string;
  readTime: string;
  author: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post1',
    title: 'Green Living Day 2026: Reforestation Drives in Makueni',
    excerpt: 'GSSF joined hands with local residents and students at Ngwata VTC to plant 1,500 native trees and launch our dry-season drip loop.',
    content: [
      'On August 16, 2026, the Green Settlement Schemes Foundation (GSSF) celebrated Green Living Day by spearheading a major canopy recovery drive in Kibwezi East, Makueni County. The initiative, centered at the Ngwata Vocational Training Centre, brought together over 120 community members, local farmers, and students.',
      'During the day-long event, participants successfully planted 1,500 native saplings, including dryland-adapted Acacia and Neem. These trees were carefully selected for their ability to thrive in Makueni’s arid micro-climate while offering long-term soil protection and micro-climate stabilization.',
      'A key highlight of the event was the official launch of GSSF’s new solar-powered drip irrigation system. This loop distributes recycled water directly to the root zones of the newly planted saplings, ensuring an estimated survival rate of over 92% during the harsh dry-season months. Engagement workshops were also held to train Ngwata VTC students in hands-on nursery management.',
      'Speaking at the launch, the GSSF field coordinator emphasized: "Reforestation is not just about putting trees in the ground—it is about securing the survival of these saplings and empowering the local youth to be their guardians. Today represents a vital step toward restoring Makueni’s natural canopy and securing groundwater resources for generations to come."'
    ],
    imageUrl: 'https://ik.imagekit.io/36h5sgvlw/Screenshot%202026-06-07%20135517.png',
    category: 'Events',
    date: 'August 16, 2026',
    readTime: '4 min read',
    author: 'GSSF Field Team'
  },
  {
    id: 'post2',
    title: 'Securing Water Tables: River Basin Recovery in Kitui',
    excerpt: 'Rehabilitating dryland river catchments through seasonal sand-dams and deep-rooted forest growth to secure clean groundwater tables.',
    content: [
      'In Kitui County’s Athiriver Catchment, seasonal riverbeds often run completely dry, leaving communities facing severe water shortages during the hot season. To combat this ecological challenge, GSSF launched the Kitui River Basin Conservation Drive in mid-2024.',
      'The project combines active reforestation with localized water-management infrastructure. By constructing two sand-dams, the scheme traps seasonal rainwater in sandy riverbeds, raising the surrounding groundwater table and keeping the sand hydrated.',
      'Alongside the dams, the team and local self-help groups planted 5,000 deep-rooted seedlings along the riverbanks. These trees act as natural anchors, preventing soil erosion during heavy rains and filtering surface runoff to ensure clean water filters down into the local wells.',
      'To date, the rising groundwater tables have enabled several community agricultural groups to sustain dry-season vegetable farming, contributing to local food security and household income.'
    ],
    imageUrl: `${import.meta.env.BASE_URL}kilifi_mangrove.png`,
    category: 'Agroforestry',
    date: 'July 24, 2026',
    readTime: '5 min read',
    author: 'David Mwangi, Forestry Expert'
  },
  {
    id: 'post3',
    title: 'Agroforestry Corridors: Supporting Yatta Plateau Farmers',
    excerpt: 'How GSSF is distributing dryland-adapted neem and acacia trees to smallholder farmers in Machakos to improve crop shade.',
    content: [
      'Agroforestry is the practice of combining trees with agriculture to create sustainable land-use systems. On the Yatta Plateau in Machakos County, GSSF has partnered with 45 smallholder families to establish agroforestry corridors.',
      'The plateau is highly vulnerable to wind erosion, intense solar radiation, and desertification. By planting rows of Neem and Acacia surrounding active crops and grazing land, farmers create natural windbreaks and canopy shades.',
      'These trees provide multiple ecological benefits: Acacia fixes nitrogen in the soil to improve crop fertility naturally, while Neem leaves offer organic pest control. Furthermore, the canopy reduces direct soil evaporation, preserving precious soil moisture for surrounding maize and bean crops.',
      'GSSF distributed 4,300 saplings and provided field training on pruning and organic composting, ensuring the community has the skills to sustain these dryland corridors independently.'
    ],
    imageUrl: `${import.meta.env.BASE_URL}laikipia_grassland.png`,
    category: 'Agroforestry',
    date: 'June 12, 2026',
    readTime: '4 min read',
    author: 'GSSF Field Team'
  },
  {
    id: 'post4',
    title: 'Biogas & Solar Microgrids: Powering Resilient Eco-Villages',
    excerpt: 'A review of sustainable energy solutions in our Kajiado housing pilot, reducing dependency on forest charcoal.',
    content: [
      'Restoration is only half the battle; reducing the human pressure on native forests is equally critical. In our Kajiado Eco-Village pilot scheme, GSSF is addressing the root causes of deforestation by offering clean energy alternatives to forest charcoal.',
      'The pilot homes are built utilizing local clay and mud-bricks, offering natural insulation. Each home is connected to a shared 10 kW solar microgrid, powering lighting and high-efficiency appliances.',
      'Additionally, a community-scale biogas digester collects organic waste to generate clean cooking gas, replacing firewood. This micro-infrastructure has successfully reduced local charcoal dependency by over 80%, directly protecting the surrounding dry forest ecosystems from cutting.',
      'GSSF hopes to scale this climate-resilient settlement model to other dryland areas in Makueni and Kitui in the coming year.'
    ],
    imageUrl: `${import.meta.env.BASE_URL}kajiado_eco_village.png`,
    category: 'Green Energy',
    date: 'May 08, 2026',
    readTime: '6 min read',
    author: 'Willy Mutunga, Founder'
  }
];

interface BlogProps {
  onBackToHome: () => void;
}

export const Blog: React.FC<BlogProps> = ({ onBackToHome }) => {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', 'Events', 'Agroforestry', 'Green Energy', 'Milestones'];

  const filteredPosts = activeCategory === 'all'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(post => post.category === activeCategory);

  const selectedPost = BLOG_POSTS.find(post => post.id === selectedPostId);

  const handlePostClick = (postId: string) => {
    setSelectedPostId(postId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedPostId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="py-24 bg-brand-alabaster relative min-h-screen">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12">
        
        {selectedPost ? (
          /* SINGLE BLOG ARTICLE VIEW */
          <div className="space-y-8 text-left">
            
            {/* Back Button */}
            <button
              onClick={handleBackToList}
              className="inline-flex items-center gap-2 text-brand-green font-sans font-bold text-sm hover:text-brand-dark transition-colors focus:outline-none"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Success Stories</span>
            </button>

            {/* Article Container */}
            <article className="bg-white border border-brand-cream/60 rounded-3xl overflow-hidden shadow-sm">
              
              {/* Header Image */}
              <div className="h-[280px] sm:h-[450px] relative bg-brand-cream">
                <img
                  src={selectedPost.imageUrl}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <Badge
                    status="success"
                    text={selectedPost.category}
                    className="px-2.5 py-0.5 rounded bg-brand-green text-white text-[10px] font-sans font-bold uppercase tracking-wider"
                  />
                </div>
              </div>

              {/* Content Panel */}
              <div className="p-6 sm:p-10 md:p-12 space-y-6">
                
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 font-sans border-b border-brand-cream/60 pb-6">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-brand-gold" />
                    <span>{selectedPost.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-brand-gold" />
                    <span>{selectedPost.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4 text-brand-gold" />
                    <span>By {selectedPost.author}</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-brand-dark leading-tight">
                  {selectedPost.title}
                </h1>

                {/* Paragraphs content */}
                <div className="space-y-5 text-slate-600 font-sans text-sm sm:text-md leading-relaxed">
                  {selectedPost.content.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {/* Callout box */}
                <div className="p-6 rounded-2xl border-l-4 border-brand-gold bg-brand-cream/15 italic text-brand-dark/90 font-serif text-sm sm:text-md leading-relaxed">
                  "Universal Responsibility is not just an idea—it is the foundation of practical sustainability on the ground. Together, we can restore Kenyas drylands and secure future settlements."
                </div>

              </div>

            </article>

          </div>
        ) : (
          /* BLOG LIST VIEW */
          <div className="space-y-12">
            
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <div className="inline-block px-3 py-1 rounded-full bg-brand-green/10 text-brand-green font-bold text-xs uppercase tracking-widest font-sans">
                Success Stories
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-dark">
                News & Field Updates
              </h2>
              <p className="text-slate-500 font-sans text-sm sm:text-md">
                Follow our restoration journeys, community milestones, and dryland ecological guides from the field.
              </p>
            </div>

            {/* Category selection */}
            <div className="flex flex-wrap justify-center gap-2.5">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2 rounded-full font-sans text-xs sm:text-sm font-semibold border transition-all-300 ${
                    activeCategory === category
                      ? 'bg-brand-green text-white border-brand-green shadow-md shadow-brand-green/10'
                      : 'bg-brand-cream/30 text-brand-dark/75 border-brand-cream hover:bg-brand-cream/60 hover:text-brand-dark'
                  }`}
                >
                  {category === 'all' ? 'All Stories' : category}
                </button>
              ))}
            </div>

            {/* Blog Post Grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                {filteredPosts.map((post) => (
                  <Card
                    key={post.id}
                    onClick={() => handlePostClick(post.id)}
                    className="overflow-hidden border border-brand-cream/60 rounded-3xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full"
                    bodyStyle={{ padding: 0 }}
                  >
                    {/* Cover image */}
                    <div className="h-[200px] relative bg-brand-cream overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                      <span className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded bg-brand-alabaster/95 text-[10px] font-sans font-bold uppercase tracking-wider text-brand-green border border-brand-cream/40">
                        {post.category}
                      </span>
                    </div>

                    {/* Text Details */}
                    <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        {/* Meta items */}
                        <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 font-sans uppercase tracking-wider">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-brand-gold" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-serif font-bold text-brand-dark line-clamp-2 leading-snug group-hover:text-brand-green">
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-xs sm:text-sm text-slate-500 font-sans leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* CTA button link */}
                      <div className="flex items-center gap-1 text-brand-green font-bold text-xs uppercase tracking-wider pt-2">
                        <span>Read Article</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                  </Card>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center rounded-2xl border border-brand-cream/60 bg-white space-y-2">
                <h4 className="font-serif font-bold text-brand-dark text-lg">No Stories Found</h4>
                <p className="text-slate-400 font-sans text-xs">We will be posting updates for this category soon. Stay tuned!</p>
              </div>
            )}

            {/* Back to Home shortcut button */}
            <div className="pt-6">
              <button
                onClick={onBackToHome}
                className="px-6 py-2.5 rounded-full border border-brand-green text-brand-green font-sans font-bold text-xs uppercase tracking-wider hover:bg-brand-green hover:text-white transition-all duration-300 focus:outline-none"
              >
                Back to Home Page
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
