import React from 'react';
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Clock, 
  Star, 
  Heart, 
  Calendar, 
  ChevronRight, 
  MessageCircle, 
  ExternalLink 
} from 'lucide-react';
import { ServiceCategory } from '../types';

interface FooterProps {
  onSelectSection: (sectionId: string) => void;
  onOpenBooking: (category?: ServiceCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectSection,
  onOpenBooking,
}) => {
  const mapSearchQuery = encodeURIComponent("Roots Millennium School Gudwal Road Wah Cantt Pakistan");
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapSearchQuery}`;

  return (
    <footer id="main-footer" className="bg-[#2C2523] text-[#FAF8F5] pt-14 pb-10 border-t border-[#443B38]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-[#443B38]">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-[#3E1B20] text-[#EFE7DF] flex items-center justify-center border border-[#6A2B33]">
                <Sparkles className="w-4 h-4 text-[#D4BC96]" />
              </div>
              <div>
                <span className="font-playfair text-lg sm:text-xl font-normal text-[#FAF8F5] block leading-snug">
                  Galaxy Bridal Zone
                </span>
                <span className="text-[11px] uppercase tracking-wider text-[#D4BC96] font-normal">
                  By Kahkishan Ali
                </span>
              </div>
            </div>

            <p className="text-xs text-[#B5ABA6] leading-relaxed">
              Wah Cantt’s bridal studio offering comprehensive 11-service bridal packages, glass skin hydra facials, haircut precision, and gentle waxing care.
            </p>

            <div className="pt-1">
              <a
                href="https://wa.me/923345587744?text=Hi,%20I%20would%20like%20to%20inquire%20about%20an%20appointment."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#8E2C34] hover:bg-[#77242B] text-[#FFFFFF] text-xs font-semibold uppercase tracking-wider transition-all border border-[#A63A44]"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#D4BC96]" />
                <span>WhatsApp: 0334-5587744</span>
              </a>
            </div>
          </div>

          {/* Quick Links: 4 Ordered Sections */}
          <div className="lg:col-span-3 space-y-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#D5C9BE] block">
              The 4 Salon Sections
            </span>
            <ul className="space-y-1.5 text-xs text-[#B5ABA6]">
              <li>
                <button
                  onClick={() => onSelectSection('hair-section')}
                  className="hover:text-[#FAF8F5] transition-colors flex items-center space-x-1.5 text-left"
                >
                  <ChevronRight className="w-3 h-3 text-[#A89D98]" />
                  <span>1. Hair (Cuts & Treatments)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectSection('makeup-section')}
                  className="hover:text-[#FAF8F5] transition-colors flex items-center space-x-1.5 text-left"
                >
                  <ChevronRight className="w-3 h-3 text-[#A89D98]" />
                  <span>2. Makeup (Bridal & Event Artistry)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectSection('facials-nails-section')}
                  className="hover:text-[#FAF8F5] transition-colors flex items-center space-x-1.5 text-left"
                >
                  <ChevronRight className="w-3 h-3 text-[#A89D98]" />
                  <span>3. Facials + Mani Pedi (Glass Skin)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectSection('waxing-section')}
                  className="hover:text-[#FAF8F5] transition-colors flex items-center space-x-1.5 text-left"
                >
                  <ChevronRight className="w-3 h-3 text-[#A89D98]" />
                  <span>4. Waxing Services</span>
                </button>
              </li>
              <li className="pt-1">
                <button
                  onClick={() => onSelectSection('ratings-section')}
                  className="hover:text-[#FAF8F5] transition-colors flex items-center space-x-1.5 text-[#C2A684]"
                >
                  <Star className="w-3 h-3 text-[#C2A684] fill-[#C2A684]" />
                  <span>Client Ratings & Reviews</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details & Address */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#D5C9BE] block">
              Salon Location & Hours
            </span>

            <div className="space-y-2 text-xs text-[#B5ABA6]">
              <div className="flex items-start space-x-2.5 p-3 rounded-xl bg-[#352D2B] border border-[#443B38]">
                <MapPin className="w-4 h-4 text-[#C2A684] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#FAF8F5] font-medium block">Near Roots Millennium School, Gudwal road, Wah cantt, Pakistan</span>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center space-x-1 text-[#C2A684] hover:underline text-[11px]"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="p-2.5 rounded-xl bg-[#352D2B] border border-[#443B38]">
                  <span className="text-[11px] text-[#A89D98] block">Phone & WhatsApp</span>
                  <a href="tel:03345587744" className="font-semibold text-[#FAF8F5] hover:text-[#C2A684] font-mono">
                    0334-5587744
                  </a>
                </div>

                <div className="p-2.5 rounded-xl bg-[#352D2B] border border-[#443B38]">
                  <span className="text-[11px] text-[#A89D98] block">Working Hours</span>
                  <span className="font-medium text-[#FAF8F5]">
                    11:00 AM – 07:00 PM (Daily)
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C7E7A] gap-2">
          <div>
            © {new Date().getFullYear()} Galaxy Bridal Zone By Kahkishan Ali.
          </div>

          <div className="flex items-center space-x-2 text-[11px]">
            <span>Gudwal Road, Wah Cantt</span>
            <span>•</span>
            <span>0334-5587744</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
