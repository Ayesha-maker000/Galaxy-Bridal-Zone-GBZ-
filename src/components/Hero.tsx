import React from 'react';
import { 
  Sparkles, 
  Calendar, 
  ArrowDown, 
  Award, 
  MapPin, 
  Phone, 
  Clock, 
  CheckCircle,
  Crown,
  Heart,
  MessageCircle
} from 'lucide-react';
import { ServiceCategory } from '../types';
import { FallingPetals } from './FallingPetals';

interface HeroProps {
  onOpenBooking: (category?: ServiceCategory) => void;
  onExploreServices: () => void;
  onGoToWhatsAppBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onOpenBooking, 
  onExploreServices,
  onGoToWhatsAppBooking
}) => {
  return (
    <section 
      id="hero-section" 
      className="relative pt-32 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-gradient-to-b from-[#3D1418] via-[#48181E] to-[#2E0C10] text-[#FAF6F0] border-b border-[#6E2A32]"
    >
      {/* Background Falling Rose Petals & Golden Shimmer */}
      <FallingPetals petalCount={40} showGoldShimmer={true} />

      {/* Atmospheric Soft Red & Gold Radial Glows */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-[#80222C] rounded-full blur-[120px] opacity-35 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#C5A880] rounded-full blur-[140px] opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Refined Typography & Studio Identity */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Salon Badge with Muted Gold & Soft Red */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#571B22]/80 backdrop-blur-xs text-[#E8D4B8] border border-[#A67C48]/40 text-xs uppercase tracking-widest font-semibold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D4BC96]" />
              <span>Galaxy Bridal Zone By Kahkishan Ali</span>
            </div>

            <div className="space-y-4">
              <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#FAF6F0] leading-[1.15]">
                Timeless Bridal Artistry. <br className="hidden sm:inline" />
                <span className="italic text-[#E3C7A3]">Glass Skin</span> Rejuvenation.
              </h1>
              <p className="text-base sm:text-lg text-[#E3D1C8] max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Welcome to Wah Cantt's tranquil beauty studio by <strong className="text-[#FAF6F0] font-medium">Kahkishan Ali</strong>. Specializing in complete 11-service Bridal Packages, Glass Skin Hydra Facials, Butterfly haircuts, specialized hair treatments, and gentle waxing care.
              </p>
            </div>

            {/* Quick Contact & Address Highlight on Soft Velvet Red Card */}
            <div className="p-4 rounded-2xl bg-[#521C23]/70 backdrop-blur-md border border-[#8C3A44]/50 shadow-lg text-xs sm:text-sm text-[#F0E4DC] space-y-2.5 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center space-x-2 text-[#FAF6F0] font-medium">
                <MapPin className="w-4 h-4 text-[#D4BC96] shrink-0" />
                <span>Near Roots Millennium School, Gudwal road, Wah cantt, Pakistan</span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs pt-2 border-t border-[#6E2831] text-[#E0CECE]">
                <span className="flex items-center space-x-1.5 text-[#E6CDAF] font-semibold">
                  <Phone className="w-3.5 h-3.5 text-[#D4BC96]" />
                  <span>0334-5587744</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#D4BC96]" />
                  <span>Open Daily: 11:00 AM – 07:00 PM</span>
                </span>
              </div>
            </div>

            {/* Action Buttons: Muted Gold & Soft Red Styling */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5 sm:gap-4 pt-1 w-full">
              <button
                id="hero-whatsapp-book-btn"
                onClick={onGoToWhatsAppBooking}
                className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-[#C29F6E] to-[#D8BFA0] hover:from-[#B5915F] hover:to-[#CDB08E] text-[#2C1014] text-xs uppercase tracking-widest font-semibold rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 border border-[#E8D4B8]"
              >
                <Calendar className="w-4 h-4 text-[#2C1014]" />
                <span>Book Appointment</span>
              </button>

              <button
                id="hero-explore-services-btn"
                onClick={onExploreServices}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#5A1D24]/60 hover:bg-[#68232B] border border-[#A67C48]/60 text-[#FAF6F0] hover:text-[#E8D4B8] text-xs uppercase tracking-widest font-medium rounded-full transition-all flex items-center justify-center space-x-2 shadow-sm"
              >
                <span>View 4 Core Sections</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#D4BC96]" />
              </button>
            </div>

            {/* Feature Highlights Grid */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 border-t border-[#6E2831] text-left">
              <div className="bg-[#4E1920]/60 backdrop-blur-xs p-3 rounded-xl border border-[#7D2E37] min-w-0">
                <div className="text-xs font-semibold text-[#E8D4B8] truncate">By Kahkishan Ali</div>
                <div className="text-[11px] text-[#D8C2B8]">Master Bridal Artistry</div>
              </div>

              <div className="bg-[#4E1920]/60 backdrop-blur-xs p-3 rounded-xl border border-[#7D2E37] min-w-0">
                <div className="text-xs font-semibold text-[#E8D4B8] truncate">Hydra Facial Bar</div>
                <div className="text-[11px] text-[#D8C2B8]">Glass skin & whitening</div>
              </div>

              <div className="bg-[#4E1920]/60 backdrop-blur-xs p-3 rounded-xl border border-[#7D2E37] min-w-0">
                <div className="text-xs font-semibold text-[#E8D4B8] truncate">Bridal Packages</div>
                <div className="text-[11px] text-[#D8C2B8]">11-Service Complete Care</div>
              </div>
            </div>

          </div>

          {/* Right Column: Studio Photo Showcase Card with Muted Gold & Soft Red Framing */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Studio Showcase Card */}
              <div className="relative rounded-3xl overflow-hidden border border-[#A67C48]/50 bg-[#FAF8F5] text-[#2C2523] soft-card-shadow p-4 sm:p-5 space-y-4">
                
                {/* Main Studio Image */}
                <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-[#ECE5DC] border border-[#E2DAD0]">
                  <img
                    src="/src/assets/images/studio_reception_1786879357528.jpg"
                    alt="Galaxy Bridal Zone Studio Interior"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C1014]/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-[#FFFFFF]">
                    <div className="text-[11px] uppercase tracking-widest text-[#E8D4B8] font-semibold">
                      Gudwal Road • Wah Cantt
                    </div>
                    <div className="font-playfair text-xl font-normal text-[#FAF8F5]">
                      Galaxy Bridal Zone
                    </div>
                    <div className="text-xs text-[#E3D1C8] font-light">
                      By Kahkishan Ali
                    </div>
                  </div>
                </div>

                {/* Signature Highlights List with Soft Red & Muted Gold Prices */}
                <div className="space-y-2.5">
                  <div className="text-xs uppercase font-semibold tracking-wider text-[#9E3640] flex items-center space-x-1.5 px-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#C29F6E]" />
                    <span>Popular Services</span>
                  </div>

                  <div className="space-y-2 text-xs text-[#2C2523]">
                    <div className="p-2.5 rounded-xl bg-[#FAF6F6] border border-[#EEDFDF] flex items-center justify-between">
                      <span className="font-medium text-[#4E4441]">Bridal Package (11 Services)</span>
                      <span className="font-semibold text-[#8E2C34] font-playfair text-sm">Rs. 45,000</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#FAF6F6] border border-[#EEDFDF] flex items-center justify-between">
                      <span className="font-medium text-[#4E4441]">Hydra Facial Glass Skin</span>
                      <span className="font-semibold text-[#8E2C34] font-playfair text-sm">Rs. 5,000</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#FAF6F6] border border-[#EEDFDF] flex items-center justify-between">
                      <span className="font-medium text-[#4E4441]">Mani Pedi (Hands & Feet)</span>
                      <span className="font-semibold text-[#8E2C34] font-playfair text-sm">Rs. 3,500</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#FAF6F6] border border-[#EEDFDF] flex items-center justify-between">
                      <span className="font-medium text-[#4E4441]">Butterfly Haircut</span>
                      <span className="font-semibold text-[#8E2C34] font-playfair text-sm">Rs. 3,000</span>
                    </div>
                  </div>
                </div>

                {/* Instant WhatsApp Hotline Action */}
                <div className="pt-1">
                  <button
                    onClick={onGoToWhatsAppBooking}
                    className="w-full py-3 px-4 bg-[#F7EFF0] hover:bg-[#EEDDDF] text-[#8E2C34] text-xs font-semibold tracking-wider uppercase rounded-xl transition-all flex items-center justify-center space-x-2 border border-[#DFCDCF]"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#8E2C34]" />
                    <span>Direct Desk: 0334-5587744</span>
                  </button>
                </div>

              </div>

              {/* Floating Verified Badge */}
              <div className="hidden sm:flex items-center space-x-2 absolute -top-3 -right-2 bg-[#5A1D24] border border-[#C29F6E]/60 text-[#FAF6F0] py-1.5 px-3.5 rounded-full shadow-md text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-[#D4BC96]"></span>
                <span>Wah Cantt Luxury Studio</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
