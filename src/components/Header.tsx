import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, Star, Crown, Phone, MapPin, MessageCircle } from 'lucide-react';
import { ServiceCategory } from '../types';

interface HeaderProps {
  onOpenMenu: () => void;
  onOpenBooking: (category?: ServiceCategory) => void;
  onSelectSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMenu,
  onOpenBooking,
  onSelectSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 w-full max-w-full overflow-x-hidden ${
        isScrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-xs py-3 border-b border-[#E2DAD0]'
          : 'bg-[#FAF8F5]/90 backdrop-blur-xs py-4 border-b border-[#EAE3DA]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer flex items-center space-x-3 group"
          id="brand-logo-container"
        >
          <div className="w-10 h-10 rounded-xl bg-[#F7EFF0] border border-[#E2CBD0] flex items-center justify-center text-[#8E2C34] shadow-2xs group-hover:bg-[#EEDDDF] transition-all">
            <Sparkles className="w-5 h-5 text-[#C29F6E]" />
          </div>
          <div>
            <span className="font-playfair text-lg sm:text-xl font-medium tracking-normal text-[#2C2523] block leading-tight">
              Galaxy Bridal Zone
            </span>
            <span className="text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-[#8C7E7A] font-medium flex items-center gap-1.5">
              <span className="text-[#8E2C34] font-semibold">By Kahkishan Ali</span>
              <span className="w-1 h-1 rounded-full bg-[#C29F6E] inline-block"></span>
              <span>Wah Cantt</span>
            </span>
          </div>
        </div>

        {/* Center Quick Navigation (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-7 text-xs uppercase tracking-wider font-medium text-[#6E625F]">
          <button
            id="nav-link-hair"
            onClick={() => onSelectSection('hair-section')}
            className="hover:text-[#8E2C34] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-[1.5px] after:bg-[#8E2C34] after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            1. Hair
          </button>
          <button
            id="nav-link-makeup"
            onClick={() => onSelectSection('makeup-section')}
            className="hover:text-[#8E2C34] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-[1.5px] after:bg-[#8E2C34] after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            2. Makeup
          </button>
          <button
            id="nav-link-facials"
            onClick={() => onSelectSection('facials-nails-section')}
            className="hover:text-[#8E2C34] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-[1.5px] after:bg-[#8E2C34] after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            3. Facials + Mani Pedi
          </button>
          <button
            id="nav-link-waxing"
            onClick={() => onSelectSection('waxing-section')}
            className="hover:text-[#8E2C34] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-[1.5px] after:bg-[#8E2C34] after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            4. Waxing
          </button>
          <button
            id="nav-link-gallery"
            onClick={() => onSelectSection('studio-gallery-section')}
            className="hover:text-[#8E2C34] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-[1.5px] after:bg-[#8E2C34] after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            Studio
          </button>
          <button
            id="nav-link-ratings"
            onClick={() => onSelectSection('ratings-section')}
            className="hover:text-[#8E2C34] transition-colors py-1 flex items-center space-x-1"
          >
            <Star className="w-3.5 h-3.5 text-[#C29F6E] fill-[#C29F6E]" />
            <span>Ratings</span>
          </button>
          <button
            id="nav-link-location"
            onClick={() => onSelectSection('location-map-section')}
            className="hover:text-[#8E2C34] transition-colors py-1 flex items-center space-x-1"
          >
            <MapPin className="w-3.5 h-3.5 text-[#8E2C34]" />
            <span>Location</span>
          </button>
        </nav>

        {/* Right Actions: WhatsApp CTA + Settings Button */}
        <div className="flex items-center space-x-3">
          
          {/* Quick WhatsApp / Booking CTA */}
          <button
            id="header-whatsapp-booking-btn"
            onClick={() => {
              const el = document.getElementById('whatsapp-booking-section');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                onOpenBooking();
              }
            }}
            className="hidden sm:inline-flex items-center space-x-2 px-4 py-2 bg-[#8E2C34] hover:bg-[#77242B] text-[#FAF8F5] text-xs font-medium tracking-wider uppercase rounded-full shadow-2xs transition-all hover:shadow-xs border border-[#8E2C34]"
          >
            <Calendar className="w-3.5 h-3.5 text-[#E8D4B8]" />
            <span>Book Appointment</span>
          </button>

          {/* Top Right Settings Button: 3 small horizontal lines */}
          <button
            id="top-right-settings-btn"
            onClick={onOpenMenu}
            aria-label="Open settings and navigation menu"
            className="group relative flex flex-col items-center justify-center w-10 h-10 rounded-xl bg-[#FFFFFF] hover:bg-[#F5F0E8] border border-[#D9CFC3] transition-all shadow-2xs focus:outline-none"
            title="Menu & Settings"
          >
            {/* 3 small horizontal lines */}
            <span className="w-4 h-[2px] bg-[#4E4441] group-hover:bg-[#8A5855] rounded-full transition-all group-hover:w-5 mb-1"></span>
            <span className="w-4 h-[2px] bg-[#4E4441] group-hover:bg-[#8A5855] rounded-full transition-all group-hover:w-3.5 mb-1"></span>
            <span className="w-4 h-[2px] bg-[#4E4441] group-hover:bg-[#8A5855] rounded-full transition-all group-hover:w-4.5"></span>
          </button>
        </div>

      </div>
    </header>
  );
};
