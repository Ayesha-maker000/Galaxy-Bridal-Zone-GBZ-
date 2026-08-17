import React from 'react';
import { 
  Clock, 
  Sparkles, 
  Calendar, 
  Tag, 
  Flame, 
  Scissors, 
  Heart, 
  Sparkle,
  Award
} from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceCardProps {
  service: ServiceItem;
  onBook: (service: ServiceItem) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onBook }) => {
  // Category specific icon
  const getCategoryIcon = () => {
    switch (service.category) {
      case 'hair':
        return <Scissors className="w-4 h-4 text-[#8E2C34]" />;
      case 'makeup':
        return <Sparkles className="w-4 h-4 text-[#C29F6E]" />;
      case 'facials-nails':
        return <Heart className="w-4 h-4 text-[#8E2C34]" />;
      case 'waxing':
        return <Award className="w-4 h-4 text-[#C29F6E]" />;
      default:
        return <Sparkle className="w-4 h-4 text-[#8E2C34]" />;
    }
  };

  return (
    <div
      id={`service-card-${service.id}`}
      className="bg-[#FAF8F5] rounded-2xl border border-[#E2DAD0] hover:border-[#D4BC96] overflow-hidden soft-card-shadow soft-card-hover flex flex-col justify-between group relative transition-all duration-300"
    >
      {/* Top Header */}
      <div className="bg-[#F8F3EE] p-5 sm:p-6 text-[#2C2523] relative overflow-hidden border-b border-[#E8DFD5]">
        
        {/* Top Badges Row */}
        <div className="flex items-center justify-between gap-2 mb-3 relative z-10">
          <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#E0D5C7] flex items-center justify-center shadow-2xs">
            {getCategoryIcon()}
          </div>

          {/* Most Popular Badge */}
          {service.isPopular && (
            <div className="bg-[#8E2C34] text-[#FAF8F5] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full flex items-center space-x-1 shadow-2xs border border-[#77242B]">
              <Sparkle className="w-3 h-3 text-[#E8D4B8]" />
              <span>Most Popular</span>
            </div>
          )}
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1 relative z-10">
          <h3 className="font-playfair text-xl sm:text-2xl font-normal text-[#2C2523] group-hover:text-[#8E2C34] transition-colors leading-snug">
            {service.title}
          </h3>
          <p className="text-xs text-[#7A6E6A] font-normal leading-tight">
            {service.subtitle}
          </p>
        </div>

        {/* Price & Duration Strip */}
        <div className="mt-4 pt-3 border-t border-[#E8DFD5] flex items-center justify-between relative z-10">
          <div className="font-playfair text-2xl font-semibold text-[#8E2C34]">
            {service.price}
          </div>
          <div className="flex items-center space-x-1.5 bg-[#FAF8F5] px-2.5 py-1 rounded-full text-xs text-[#6E625F] border border-[#E0D5C7]">
            <Clock className="w-3 h-3 text-[#C29F6E]" />
            <span>{service.duration}</span>
          </div>
        </div>
      </div>

      {/* Card Body with Detailed Description */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4 bg-[#FAF8F5]">
        
        <div className="space-y-3">
          <p className="text-xs sm:text-sm text-[#5C514E] font-normal leading-relaxed">
            {service.description}
          </p>

          {/* Tags */}
          <div className="pt-2 flex flex-wrap gap-1.5">
            {service.tags.map((tag) => {
              const isPop = tag.toLowerCase().includes('popular') || tag.toLowerCase().includes('11 services');
              return (
                <span
                  key={tag}
                  className={`inline-flex items-center text-[10px] uppercase font-medium tracking-wider px-2 py-0.5 rounded-md border ${
                    isPop
                      ? 'bg-[#FAF0F1] text-[#8E2C34] border-[#E8CFD2]'
                      : 'bg-[#F9F5EF] text-[#6E625F] border-[#E8DFD5]'
                  }`}
                >
                  <Tag className={`w-2.5 h-2.5 mr-1 ${isPop ? 'text-[#8E2C34]' : 'text-[#C29F6E]'}`} />
                  {tag}
                </span>
              );
            })}
          </div>
        </div>

        {/* Action Button: Soft Red Hover */}
        <div className="pt-3 border-t border-[#EAE3DA]">
          <button
            id={`book-service-btn-${service.id}`}
            onClick={() => onBook(service)}
            className="w-full py-2.5 px-4 bg-[#FFFFFF] hover:bg-[#8E2C34] text-[#4E4441] hover:text-[#FAF8F5] border border-[#D9CFC3] hover:border-[#8E2C34] rounded-xl text-xs font-medium tracking-wider uppercase transition-all duration-200 flex items-center justify-center space-x-2 shadow-2xs hover:shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5 text-[#C29F6E] group-hover:text-[#FAF8F5]" />
            <span>Book This Service</span>
          </button>
        </div>

      </div>
    </div>
  );
};
