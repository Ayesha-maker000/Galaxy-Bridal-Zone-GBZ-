import React, { useState } from 'react';
import { Camera, Sparkles, MapPin, CheckCircle, ChevronRight, Eye } from 'lucide-react';

export const StudioGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const studioPhotos = [
    {
      title: 'Reception & Consultation Lounge',
      category: 'Welcome Area',
      description: 'Warm, serene ambiance with tufted leather seating, soothing wood accents, and dedicated consultation desk.',
      image: '/src/assets/images/studio_reception_1786879357528.jpg',
      tag: 'Lounge & Desk'
    },
    {
      title: 'Hair Artistry & Styling Studio',
      category: 'Hair Sanctuary',
      description: 'Backlit oval illumination mirrors, wood slatted interior, ergonomic salon chairs, and professional equipment.',
      image: '/src/assets/images/studio_hair_salon_1786879380086.jpg',
      tag: 'Hair Sanctuary'
    },
    {
      title: 'Bridal & Makeup Vanity Suite',
      category: 'Makeup Studio',
      description: 'Hollywood bulb daylight vanity, floral elegance, luxury cosmetics station, and private bridal dressing area.',
      image: '/src/assets/images/studio_makeup_vanity_1786879396079.jpg',
      tag: 'Bridal Vanity'
    },
  ];

  return (
    <section id="studio-gallery-section" className="py-16 md:py-20 bg-[#F5F2EC] border-y border-[#E2DAD0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#FAF0F1] text-[#8E2C34] text-xs font-semibold uppercase tracking-wider border border-[#E8CFD2]">
            <Camera className="w-3.5 h-3.5 text-[#C29F6E]" />
            <span>Inside Our Studio</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl font-normal text-[#2C2523] tracking-tight">
            The Studio Experience
          </h2>

          <p className="text-sm sm:text-base text-[#6E625F] leading-relaxed">
            Step into our calm, comfortable salon space situated on Gudwal Road, Wah Cantt. Designed for relaxed consultations and luxury bridal treatments.
          </p>
        </div>

        {/* Studio Photos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {studioPhotos.map((photo, index) => (
            <div
              key={photo.title}
              id={`studio-photo-card-${index}`}
              onClick={() => setSelectedPhoto(index)}
              className="bg-[#FAF8F5] rounded-2xl overflow-hidden border border-[#E2DAD0] soft-card-shadow soft-card-hover group cursor-pointer flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative h-64 sm:h-72 overflow-hidden bg-[#ECE5DC]">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C2523]/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                {/* Top Badge */}
                <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-xs text-[#2C2523] px-3 py-1 rounded-full text-xs font-medium border border-[#E2DAD0] shadow-xs">
                  {photo.tag}
                </div>

                {/* Hover Quick View Icon */}
                <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-[#FAF8F5]/90 text-[#2C2523] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0 shadow-sm">
                  <Eye className="w-4 h-4 text-[#8A5855]" />
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-2 bg-[#FAF8F5]">
                <div>
                  <span className="text-[11px] font-semibold text-[#9E6B68] uppercase tracking-wider block">
                    {photo.category}
                  </span>
                  <h3 className="font-playfair text-lg font-semibold text-[#2C2523] group-hover:text-[#8A5855] transition-colors mt-0.5">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-[#6E625F] mt-1.5 leading-relaxed">
                    {photo.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EAE3DA] flex items-center justify-between text-xs text-[#8A5855] font-medium">
                  <span>View photo details</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox */}
        {selectedPhoto !== null && (
          <div
            id="studio-photo-lightbox"
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-[#2C2523]/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 cursor-pointer"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FAF8F5] rounded-3xl overflow-hidden max-w-3xl w-full border border-[#E2DAD0] shadow-2xl relative"
            >
              <div className="relative max-h-[60vh] overflow-hidden bg-[#ECE5DC]">
                <img
                  src={studioPhotos[selectedPhoto].image}
                  alt={studioPhotos[selectedPhoto].title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 bg-[#FAF8F5] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#9E6B68] uppercase tracking-wider">
                    {studioPhotos[selectedPhoto].category}
                  </span>
                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="text-xs font-medium text-[#6E625F] hover:text-[#2C2523] px-3 py-1 rounded-full bg-[#EAE3DA]"
                  >
                    Close
                  </button>
                </div>
                <h3 className="font-playfair text-2xl font-normal text-[#2C2523]">
                  {studioPhotos[selectedPhoto].title}
                </h3>
                <p className="text-sm text-[#6E625F] leading-relaxed">
                  {studioPhotos[selectedPhoto].description}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
