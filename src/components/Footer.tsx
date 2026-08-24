import React, { useState } from 'react';
import { Logo } from './Logo';
import { Mail, Phone, MapPin, Send, Heart, Leaf } from 'lucide-react';
import { Input, Button, message } from 'antd';

interface FooterProps {
  currentView: 'home' | 'gallery' | 'blog';
  onViewChange: (view: 'home' | 'gallery' | 'blog') => void;
}

export const Footer: React.FC<FooterProps> = ({ currentView, onViewChange }) => {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      message.error('Please enter a valid email address.');
      return;
    }

    setSubscribeStatus('loading');
    
    // Simulate network latency for premium feel
    setTimeout(() => {
      setSubscribeStatus('success');
      message.success('Thank you for subscribing to the GSSF Newsletter!');
      setEmail('');
      
      // Return to idle state after showing confirmation
      setTimeout(() => {
        setSubscribeStatus('idle');
      }, 4000);
    }, 1200);
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === 'gallery') {
      onViewChange('gallery');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (href === 'blog') {
      onViewChange('blog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (currentView === 'gallery' || currentView === 'blog') {
        onViewChange('home');
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Our Initiatives', href: '#initiatives' },
    { label: 'Impact Hub', href: '#impact' },
    { label: 'Blog', href: 'blog' },
    { label: 'Get Involved', href: '#get-involved' },
    { label: 'Gallery', href: 'gallery' },
  ];

  return (
    <footer className="bg-brand-dark text-white pt-20 pb-8 relative overflow-hidden border-t border-brand-green/20">
      
      {/* Decorative vector background lines */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10%" cy="10%" r="200" fill="none" stroke="#FFFFFF" strokeWidth="1" />
          <circle cx="90%" cy="90%" r="300" fill="none" stroke="#FFFFFF" strokeWidth="1" />
        </svg>
      </div>

      <div className="w-full px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          
          {/* Column 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <Logo variant="vertical" className="bg-white p-4 rounded-xl max-w-[200px] hover:scale-[1.02] transition-all-300" />
            <p className="text-sm text-slate-300 font-sans leading-relaxed">
              Green Settlement Schemes Foundation (GSSF) is a Kenyan-founded non-profit established in 2024. We design climate-resilient community settlements that preserve local environments.
            </p>
            <p className="text-xs text-brand-gold font-bold uppercase tracking-wider font-sans">
              Universal Responsibility, Ecological Balance
            </p>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-6 text-left">
            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-gold font-sans">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="text-sm text-slate-300 hover:text-white transition-all-300 font-sans hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info (3 cols) */}
          <div className="lg:col-span-3 space-y-6 text-left">
            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-gold font-sans">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-300 font-sans leading-relaxed">
                  Green Settlement Headquarters,<br />
                  Ngong Road, Nairobi, Kenya
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-gold flex-shrink-0" />
                <span className="text-sm text-slate-300 font-sans">+254 (0) 726 481 583</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-gold flex-shrink-0" />
                <span className="text-sm text-slate-300 font-sans hover:text-white transition-all-300">
                  <a href="mailto:wsharks003@gmail.com">wsharks003@gmail.com</a>
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-6 text-left">
            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-gold font-sans">Newsletter</h4>
            <p className="text-sm text-slate-300 font-sans leading-relaxed">
              Subscribe to receive updates on tree-planting events, settlement designs, and climate action.
            </p>
            
            {subscribeStatus === 'success' ? (
              <div className="p-3.5 rounded-xl border border-brand-green/30 bg-brand-green/10 text-brand-gold font-semibold text-xs text-center flex items-center justify-center gap-2 animate-pulse">
                <Leaf className="w-4 h-4 text-brand-gold" />
                <span>Subscribed! Thank you.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    disabled={subscribeStatus === 'loading'}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 hover:bg-white/15 focus:bg-white/20 border-white/20 text-white placeholder-slate-400 rounded-xl py-2 font-sans focus:outline-none"
                    style={{ borderRadius: '12px' }}
                  />
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={subscribeStatus === 'loading'}
                    icon={subscribeStatus === 'loading' ? null : <Send className="w-4 h-4" />}
                    className="bg-brand-gold hover:bg-brand-gold/90 border-none rounded-xl flex items-center justify-center p-3"
                    style={{ backgroundColor: '#997D2F', borderRadius: '12px' }}
                  />
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-slate-400 font-sans">
          <p>© {new Date().getFullYear()} Green Settlement Schemes Foundation (GSSF). All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-brand-gold fill-brand-gold" /> for sustainable ecosystems in Kenya.
          </p>
        </div>

      </div>
    </footer>
  );
};
