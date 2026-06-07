import React from 'react';

export interface LogoProps {
  className?: string;
  variant?: 'horizontal' | 'vertical' | 'emblem';
  height?: number | string;
  width?: number | string;
  light?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'horizontal',
  height = 'auto',
  width = 'auto',
  light = false,
}) => {
  // Brand color variables
  const green = '#3B5A2B';
  const gold = '#997D2F';

  if (variant === 'emblem') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <img
          src={`${import.meta.env.BASE_URL}logo_emblem.png`}
          alt="GSSF Emblem"
          style={{
            height: height !== 'auto' ? height : '64px',
            width: width !== 'auto' ? width : 'auto',
            objectFit: 'contain'
          }}
          className="flex-shrink-0"
        />
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <img
          src={`${import.meta.env.BASE_URL}logo_gssf.png`}
          alt="Green Settlement Schemes Foundation Logo"
          style={{
            height: height !== 'auto' ? height : 'auto',
            width: width !== 'auto' ? width : '190px',
            objectFit: 'contain'
          }}
          className="flex-shrink-0"
        />
      </div>
    );
  }

  // Default: Horizontal Navbar orientation (Compact emblem beside text)
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src={`${import.meta.env.BASE_URL}logo_emblem.png`}
        alt="GSSF Emblem"
        style={{
          height: height !== 'auto' ? height : '44px',
          width: 'auto',
          objectFit: 'contain'
        }}
        className="flex-shrink-0"
      />
      <div className={`flex flex-col justify-center border-l pl-3 ${light ? 'border-white/20' : 'border-brand-green/20'}`}>
        <div className="flex items-center gap-1.5 leading-none">
          <span 
            className="text-lg font-extrabold tracking-tight font-serif"
            style={{ color: light ? '#FFFFFF' : green }}
          >
            GSSF
          </span>
          <span 
            className="text-[10px] font-bold tracking-widest px-1 py-0.5 rounded bg-brand-gold/10 font-sans"
            style={{ color: gold }}
          >
            2024
          </span>
        </div>
        <span 
          className={`text-[9px] font-bold tracking-wider uppercase font-sans mt-0.5 ${light ? 'text-white/70' : 'text-slate-500'}`}
        >
          Kenya Foundation
        </span>
      </div>
    </div>
  );
};
