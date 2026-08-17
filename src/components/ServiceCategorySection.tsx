import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { ServiceCategory, ServiceItem } from '../types';
import { ServiceCard } from './ServiceCard';

interface ServiceCategorySectionProps {
  sectionId: string;
  category: ServiceCategory;
  categoryNumber: string;
  title: string;
  subtitle: string;
  description: string;
  services: ServiceItem[];
  onBookService: (service: ServiceItem) => void;
  onOpenBookingCategory: (category: ServiceCategory) => void;
  isEven?: boolean;
}

export const ServiceCategorySection: React.FC<ServiceCategorySectionProps> = ({
  sectionId,
  category,
  categoryNumber,
  title,
  subtitle,
  description,
  services,
  onBookService,
  onOpenBookingCategory,
  isEven = false,
}) => {
  return (
    <section
      id={sectionId}
      className={`py-16 md:py-20 relative scroll-mt-20 ${
        isEven ? 'bg-[#F5F2EC]' : 'bg-[#FAF8F5]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#E2DAD0]">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#FAF0F1] text-[#8E2C34] border border-[#E8CFD2] text-xs font-semibold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C29F6E]"></span>
              <span>Section {categoryNumber}</span>
            </div>

            <h2 className="font-playfair text-3xl sm:text-4xl font-normal text-[#2C2523] tracking-tight">
              {title}
            </h2>

            <p className="text-sm sm:text-base text-[#6E625F] leading-relaxed">
              {subtitle} — <span className="text-[#4E4441]">{description}</span>
            </p>
          </div>

          <div className="mt-5 md:mt-0">
            <button
              id={`book-category-header-btn-${category}`}
              onClick={() => onOpenBookingCategory(category)}
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-semibold text-[#8E2C34] hover:text-[#77242B] py-2.5 px-4 rounded-full bg-[#FFFFFF] hover:bg-[#FAF0F1] border border-[#E8CFD2] hover:border-[#D4BC96] transition-all shadow-2xs"
            >
              <span>Explore {title.split(' ')[0]} Rates</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C29F6E]" />
            </button>
          </div>
        </div>

        {/* Grid of Services for this Category */}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${services.length >= 5 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-6`}>
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onBook={onBookService}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
