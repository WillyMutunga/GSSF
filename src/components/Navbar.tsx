import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X } from 'lucide-react';
import { Button } from 'antd';

interface NavbarProps {
  currentView: 'home' | 'gallery';
  onViewChange: (view: 'home' | 'gallery') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onViewChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll height to apply glassmorphic effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Our Initiatives', href: '#initiatives' },
    { label: 'Impact Hub', href: '#impact' },
    { label: 'Get Involved', href: '#get-involved' },
    { label: 'Gallery', href: 'gallery' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    if (href === 'gallery') {
      onViewChange('gallery');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (currentView === 'gallery') {
        onViewChange('home');
        // Let state change propagate and elements mount
        setTimeout(() => {
          const targetElement = document.querySelector(href);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      } else {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled || currentView === 'gallery'
            ? 'bg-brand-alabaster/80 backdrop-blur-md border-b border-brand-cream/80 shadow-sm py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="w-full px-6 md:px-12 lg:px-16 flex items-center justify-between">
          {/* Left: Brand Logo */}
          <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="focus:outline-none">
            <Logo variant="horizontal" light={!isScrolled && currentView !== 'gallery'} />
          </a>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = (currentView === 'gallery' && link.href === 'gallery') || 
                               (currentView === 'home' && link.href === '#home' && !isScrolled);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`text-sm font-semibold transition-all-300 font-sans tracking-wide relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-brand-green hover:after:w-full after:transition-all after:duration-300 ${
                    isActive ? 'after:w-full' : 'after:w-0'
                  } ${
                    isScrolled || currentView === 'gallery'
                      ? isActive
                        ? 'text-brand-green'
                        : 'text-brand-dark/80 hover:text-brand-green'
                      : 'text-white/90 hover:text-brand-gold'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Right: CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#get-involved"
              onClick={(e) => handleLinkClick(e, '#get-involved')}
              className="hidden sm:inline-block"
            >
              <Button
                type="primary"
                size="large"
                className="bg-brand-gold hover:bg-brand-gold/90 border-none font-semibold text-white px-6 rounded-xl shadow-md shadow-brand-gold/20 hover:scale-[1.03] transition-all-300"
                style={{ backgroundColor: '#997D2F', borderRadius: '12px' }}
              >
                Donate / Join
              </Button>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl transition-all-300 md:hidden focus:outline-none ${
                isScrolled || currentView === 'gallery' 
                  ? 'text-brand-dark hover:bg-brand-cream/50' 
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer/Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-brand-dark/20 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`absolute top-0 right-0 w-3/4 max-w-sm h-full bg-brand-alabaster shadow-2xl p-8 flex flex-col justify-between transition-transform duration-300 ease-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between border-b border-brand-cream pb-4">
              <span className="text-md font-bold font-serif text-brand-green">Navigation</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-brand-cream transition-all-300 focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-lg font-semibold text-brand-dark hover:text-brand-green transition-all-300 font-sans"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-brand-cream pt-6">
            <Logo variant="vertical" className="mb-4 scale-95" />
            <a href="#get-involved" onClick={(e) => handleLinkClick(e, '#get-involved')}>
              <Button
                type="primary"
                size="large"
                block
                className="bg-brand-gold hover:bg-brand-gold/90 border-none font-semibold text-white rounded-xl shadow-md py-6 flex items-center justify-center"
                style={{ backgroundColor: '#997D2F', borderRadius: '12px' }}
              >
                Donate / Join
              </Button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
