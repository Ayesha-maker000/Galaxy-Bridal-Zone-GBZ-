import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Sparkles, 
  Calendar, 
  Star, 
  Scissors, 
  Heart, 
  Clock, 
  MapPin, 
  Phone, 
  ChevronRight,
  MessageCircle,
  Award,
  Camera
} from 'lucide-react';
import { ServiceCategory } from '../types';

interface SlideOutMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSection: (sectionId: string) => void;
  onOpenBooking: (category?: ServiceCategory) => void;
}

export const SlideOutMenu: React.FC<SlideOutMenuProps> = ({
  isOpen,
  onClose,
  onSelectSection,
  onOpenBooking,
}) => {
  const handleNavClick = (sectionId: string) => {
    onClose();
    setTimeout(() => {
      onSelectSection(sectionId);
    }, 150);
  };

  const handleWhatsAppDirect = () => {
    window.open('https://wa.me/923345587744?text=Hi,%20I%20would%20like%20to%20inquire%20about%20an%20appointment%20at%20Galaxy%20Bridal%20Zone.', '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="slideout-menu-container" className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#2C2523]/40 backdrop-blur-xs transition-opacity"
            id="slideout-backdrop"
          />

          {/* Slide-out Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#E2DAD0] shadow-2xl flex flex-col justify-between overflow-y-auto no-scrollbar"
              id="slideout-panel"
            >
              {/* Header */}
              <div>
                <div className="p-5 border-b border-[#E2DAD0] flex items-center justify-between bg-[#381317] text-[#FAF8F5]">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-[#4A191E] text-[#D4BC96] border border-[#6B242B] flex items-center justify-center shadow-2xs">
                      <Sparkles className="w-4 h-4 text-[#D4BC96]" />
                    </div>
                    <div>
                      <h3 className="font-playfair text-lg font-normal tracking-wide text-[#FAF8F5]">
                        Galaxy Bridal Zone
                      </h3>
                      <p className="text-xs text-[#D4BC96] font-medium">By Kahkishan Ali</p>
                    </div>
                  </div>

                  <button
                    id="close-slideout-btn"
                    onClick={onClose}
                    className="p-1.5 rounded-full text-[#E8D4B8] hover:bg-[#4A191E] transition-colors focus:outline-none"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Menu Content */}
                <div className="p-5 space-y-5">
                  
                  {/* WhatsApp Quick Action Banner */}
                  <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E2DAD0] hover:border-[#D4BC96] transition-all soft-card-shadow space-y-2">
                    <div className="flex items-center space-x-2 text-[#8E2C34]">
                      <MessageCircle className="w-4 h-4 text-[#8E2C34]" />
                      <span className="text-xs uppercase font-semibold tracking-wider">Direct WhatsApp Desk</span>
                    </div>
                    <div className="font-playfair text-lg font-normal text-[#2C2523]">
                      0334-5587744
                    </div>
                    <p className="text-xs text-[#6E625F] leading-relaxed">
                      Instant appointment booking and custom bridal consultations.
                    </p>
                    <button
                      id="menu-whatsapp-direct-btn"
                      onClick={handleWhatsAppDirect}
                      className="w-full mt-1 py-2 px-3 bg-[#8E2C34] hover:bg-[#77242B] text-[#FAF8F5] text-xs font-semibold tracking-wider uppercase rounded-xl transition-all flex items-center justify-center space-x-2 border border-[#A63A44]"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#D4BC96]" />
                      <span>Chat on WhatsApp</span>
                    </button>
                  </div>

                  {/* 4 Core Sections */}
                  <div className="space-y-2">
                    <div className="text-xs uppercase tracking-wider font-semibold text-[#6E5956] px-1">
                      Salon Navigation
                    </div>

                    <div className="bg-[#FFFFFF] rounded-2xl border border-[#E2DAD0] divide-y divide-[#EAE3DA] overflow-hidden soft-card-shadow">
                      <button
                        id="nav-to-hair-btn"
                        onClick={() => handleNavClick('hair-section')}
                        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-[#FAF0F1] transition-colors group"
                      >
                        <div className="flex items-center space-x-3">
                          <Scissors className="w-4 h-4 text-[#8E2C34]" />
                          <div>
                            <div className="text-sm font-medium text-[#2C2523]">1. Hair Sanctuary</div>
                            <div className="text-xs text-[#7A6E6A]">Simple cuts (Rs. 2,000), Butterfly (Rs. 3,000), Treatments</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#A89D98] group-hover:translate-x-1 transition-transform" />
                      </button>

                      <button
                        id="nav-to-makeup-btn"
                        onClick={() => handleNavClick('makeup-section')}
                        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-[#FAF0F1] transition-colors group"
                      >
                        <div className="flex items-center space-x-3">
                          <Sparkles className="w-4 h-4 text-[#C29F6E]" />
                          <div>
                            <div className="text-sm font-medium text-[#2C2523]">2. Makeup Studio</div>
                            <div className="text-xs text-[#7A6E6A]">Bridal 11-service pkg (Rs. 45,000), Reception, Nikah, Mehndi</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#A89D98] group-hover:translate-x-1 transition-transform" />
                      </button>

                      <button
                        id="nav-to-facials-btn"
                        onClick={() => handleNavClick('facials-nails-section')}
                        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-[#FAF0F1] transition-colors group"
                      >
                        <div className="flex items-center space-x-3">
                          <Heart className="w-4 h-4 text-[#8E2C34]" />
                          <div>
                            <div className="text-sm font-medium text-[#2C2523]">3. Facials + Mani Pedi</div>
                            <div className="text-xs text-[#7A6E6A]">Mani Pedi (Rs. 3,500), Hydra glass skin (Rs. 5,000)</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#A89D98] group-hover:translate-x-1 transition-transform" />
                      </button>

                      <button
                        id="nav-to-waxing-btn"
                        onClick={() => handleNavClick('waxing-section')}
                        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-[#FAF0F1] transition-colors group"
                      >
                        <div className="flex items-center space-x-3">
                          <Award className="w-4 h-4 text-[#C29F6E]" />
                          <div>
                            <div className="text-sm font-medium text-[#2C2523]">4. Waxing Services</div>
                            <div className="text-xs text-[#7A6E6A]">Full arms (Rs. 1,500), Full legs (Rs. 3,000), Face wax (Rs. 1,000)</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#A89D98] group-hover:translate-x-1 transition-transform" />
                      </button>

                      <button
                        id="nav-to-gallery-btn"
                        onClick={() => handleNavClick('studio-gallery-section')}
                        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-[#FAF0F1] transition-colors group"
                      >
                        <div className="flex items-center space-x-3">
                          <Camera className="w-4 h-4 text-[#8E2C34]" />
                          <div>
                            <div className="text-sm font-medium text-[#2C2523]">Studio Photos</div>
                            <div className="text-xs text-[#7A6E6A]">Inside the salon, vanity, and reception</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#A89D98] group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>

                    {/* Bookings & Ratings Action Buttons */}
                    <div className="pt-2 grid grid-cols-2 gap-3">
                      <button
                        id="menu-open-bookings-card"
                        onClick={() => handleNavClick('whatsapp-booking-section')}
                        className="p-3.5 bg-[#FFFFFF] hover:bg-[#FAF0F1] rounded-xl border border-[#E2DAD0] hover:border-[#8E2C34]/40 text-left transition-all group soft-card-shadow"
                      >
                        <Calendar className="w-4 h-4 text-[#8E2C34] mb-1.5" />
                        <div className="text-xs font-semibold text-[#2C2523]">Bookings</div>
                        <div className="text-[11px] text-[#7A6E6A]">WhatsApp form</div>
                      </button>

                      <button
                        id="menu-open-ratings-card"
                        onClick={() => handleNavClick('ratings-section')}
                        className="p-3.5 bg-[#FFFFFF] hover:bg-[#FAF0F1] rounded-xl border border-[#E2DAD0] hover:border-[#C29F6E]/50 text-left transition-all group soft-card-shadow"
                      >
                        <Star className="w-4 h-4 text-[#C29F6E] fill-[#C29F6E] mb-1.5" />
                        <div className="text-xs font-semibold text-[#2C2523]">Ratings</div>
                        <div className="text-[11px] text-[#7A6E6A]">Client reviews</div>
                      </button>
                    </div>
                  </div>

                  {/* Salon Information & Hours */}
                  <div className="p-3.5 rounded-xl bg-[#FAF0F1] border border-[#E8CFD2] text-xs text-[#5C514E] space-y-2">
                    <div className="flex items-center space-x-1.5 text-[#2C2523] font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#8E2C34]" />
                      <span>Daily: 11:00 AM – 07:00 PM</span>
                    </div>

                    <div className="pt-1.5 border-t border-[#E8CFD2] space-y-1">
                      <div className="flex items-start space-x-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#8E2C34] shrink-0 mt-0.5" />
                        <span>Near Roots Millennium School, Gudwal road, Wah cantt, Pakistan</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#8E2C34] shrink-0" />
                        <span className="font-mono font-medium">0334-5587744</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Bottom footer in slideout */}
              <div className="p-3 border-t border-[#E2DAD0] bg-[#FAF8F5] text-center text-[#7A6E6A] text-[11px]">
                © Galaxy Bridal Zone By Kahkishan Ali • Wah Cantt
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
