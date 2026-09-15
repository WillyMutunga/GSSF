import { useState, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutVision } from './components/AboutVision';
import { ImpactHub } from './components/ImpactHub';
import { GetInvolved } from './components/GetInvolved';
import { Gallery } from './components/Gallery';
import { Blog } from './components/Blog';
import { Footer } from './components/Footer';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'gallery' | 'blog'>('home');

  const handleBackToHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dynamic SEO title & meta description updates on view changes
  useEffect(() => {
    const metaDescription = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');

    if (currentView === 'home') {
      document.title = 'Green Settlement Schemes Foundation (GSSF) Kenya | Environmental Sustainability';
      const desc = 'Green Settlement Schemes Foundation (GSSF) is a Kenyan organization established in 2024. Fostering environmental sustainability, community agroforestry, indigenous reforestation, and climate-resilient settlements across Kenya.';
      if (metaDescription) metaDescription.setAttribute('content', desc);
      if (ogTitle) ogTitle.setAttribute('content', document.title);
      if (ogDescription) ogDescription.setAttribute('content', desc);
    } else if (currentView === 'gallery') {
      document.title = 'Photo Gallery & Slideshow | Green Settlement Schemes Foundation (GSSF) Kenya';
      const desc = 'Explore high-resolution field photos and interactive slideshows of GSSF community tree planting, agroforestry, and climate-resilient settlement projects across Kenya.';
      if (metaDescription) metaDescription.setAttribute('content', desc);
      if (ogTitle) ogTitle.setAttribute('content', document.title);
      if (ogDescription) ogDescription.setAttribute('content', desc);
    } else if (currentView === 'blog') {
      document.title = 'Success Stories & Field Updates | Green Settlement Schemes Foundation (GSSF) Kenya';
      const desc = 'Read the latest news, success stories, field reports, and environmental guides from Green Settlement Schemes Foundation (GSSF) across Kenya.';
      if (metaDescription) metaDescription.setAttribute('content', desc);
      if (ogTitle) ogTitle.setAttribute('content', document.title);
      if (ogDescription) ogDescription.setAttribute('content', desc);
    }
  }, [currentView]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#3B5A2B', // Forest Green
          colorWarning: '#997D2F', // Muted Gold
          borderRadius: 12,
          fontFamily: 'Inter, "Plus Jakarta Sans", sans-serif',
          colorBgContainer: '#F9F8F6', // Off-white/Alabaster container background
        },
        components: {
          Button: {
            fontFamily: 'Inter, "Plus Jakarta Sans", sans-serif',
            fontWeight: 600,
          },
          Card: {
            fontFamily: 'Inter, "Plus Jakarta Sans", sans-serif',
          }
        }
      }}
    >
      <div className="min-h-screen flex flex-col bg-brand-alabaster">
        {/* Sticky Header Navigation */}
        <Navbar currentView={currentView} onViewChange={setCurrentView} />
        
        {/* Main Content Sections */}
        <main className="flex-grow">
          {currentView === 'home' ? (
            <>
              {/* Hero Landing */}
              <Hero />
              
              {/* About Us & Vision Pillars */}
              <AboutVision />
              
              {/* Impact Hub & Regional Projects */}
              <ImpactHub />
              
              {/* Get Involved Campaign Form */}
              <GetInvolved />
            </>
          ) : currentView === 'gallery' ? (
            <Gallery onBackToHome={handleBackToHome} />
          ) : (
            <Blog onBackToHome={handleBackToHome} />
          )}
        </main>
        
        {/* Footer Connections */}
        <Footer currentView={currentView} onViewChange={setCurrentView} />
      </div>
    </ConfigProvider>
  );
}

export default App;
