import React from 'react';
import { MapPin, Phone, Clock, ExternalLink, Navigation, Sparkles, Building2 } from 'lucide-react';

export const GoogleMapSection: React.FC = () => {
  const addressText = "Near Roots Millennium School, Gudwal road, Wah cantt, Pakistan";
  const mapSearchQuery = encodeURIComponent("Roots Millennium School Gudwal Road Wah Cantt Pakistan");
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapSearchQuery}`;

  return (
    <section id="location-map-section" className="py-16 md:py-20 bg-[#FAF8F5] border-t border-[#E2DAD0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-2 mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#FAF0F1] text-[#8E2C34] text-xs font-semibold uppercase tracking-wider border border-[#E8CFD2]">
            <MapPin className="w-3.5 h-3.5 text-[#C29F6E]" />
            <span>Salon Location</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl font-normal text-[#2C2523] tracking-tight">
            Visit Galaxy Bridal Zone
          </h2>

          <p className="text-sm sm:text-base text-[#6E625F] max-w-lg mx-auto leading-relaxed">
            Conveniently located on Gudwal Road, Wah Cantt. Open daily from 11:00 AM to 07:00 PM for consultations and appointments.
          </p>
        </div>

        {/* Location & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Info Cards with Soft Muted Styling */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            
            {/* Main Address Card */}
            <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E2DAD0] hover:border-[#D4BC96] transition-all soft-card-shadow space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#FAF0F1] text-[#8E2C34] flex items-center justify-center border border-[#E8CFD2]">
                <MapPin className="w-5 h-5 text-[#8E2C34]" />
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8E2C34] block mb-1">
                  Salon Address
                </span>
                <h3 className="font-playfair text-xl font-normal text-[#2C2523] leading-snug">
                  Galaxy Bridal Zone By Kahkishan Ali
                </h3>
                <p className="text-sm text-[#4E4441] mt-1.5 leading-relaxed">
                  {addressText}
                </p>
              </div>

              <div className="pt-3 border-t border-[#EAE3DA]">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="open-google-maps-btn"
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#8E2C34] hover:bg-[#77242B] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider transition-all shadow-2xs"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#E8D4B8]" />
                  <span>Directions on Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Timings & Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Working Hours */}
              <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E2DAD0] hover:border-[#D4BC96] transition-all soft-card-shadow space-y-1.5">
                <div className="flex items-center space-x-2 text-[#8E2C34] font-semibold text-xs uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5 text-[#8E2C34]" />
                  <span>Working Hours</span>
                </div>
                <div className="text-sm font-semibold text-[#2C2523]">
                  11:00 AM – 07:00 PM
                </div>
                <div className="text-xs text-[#7A6E6A]">
                  Open All Week (7 Days)
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E2DAD0] hover:border-[#D4BC96] transition-all soft-card-shadow space-y-1.5">
                <div className="flex items-center space-x-2 text-[#8E2C34] font-semibold text-xs uppercase tracking-wider">
                  <Phone className="w-3.5 h-3.5 text-[#8E2C34]" />
                  <span>Appointments</span>
                </div>
                <a
                  href="tel:03345587744"
                  className="text-sm font-semibold text-[#2C2523] hover:text-[#8E2C34] font-mono block"
                >
                  0334-5587744
                </a>
                <div className="text-xs text-[#7A6E6A]">
                  Call & WhatsApp Desk
                </div>
              </div>
            </div>

            {/* Landmark info banner */}
            <div className="p-3.5 rounded-xl bg-[#FAF0F1] border border-[#E8CFD2] flex items-center space-x-3 text-xs text-[#5C514E]">
              <Building2 className="w-4 h-4 text-[#8E2C34] shrink-0" />
              <span>Near Roots Millennium School on Gudwal Road, Wah Cantt.</span>
            </div>

          </div>

          {/* Right: Embedded Google Map */}
          <div className="lg:col-span-7 h-[340px] sm:h-[400px] lg:h-auto min-h-[340px] rounded-2xl overflow-hidden border border-[#E2DAD0] hover:border-[#D4BC96] transition-all soft-card-shadow relative bg-[#FAF8F5]">
            <iframe
              title="Galaxy Beauty Saloon Location - Gudwal Road Wah Cantt"
              src="https://maps.google.com/maps?q=Roots%20Millennium%20School%20Gudwal%20road%20Wah%20cantt%20Pakistan&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full min-h-[340px]"
            />

            {/* Map Overlay Badge */}
            <div className="absolute top-4 left-4 bg-[#FAF8F5]/90 backdrop-blur-xs text-[#2C2523] px-3 py-1.5 rounded-xl border border-[#E2DAD0] shadow-xs flex items-center space-x-2 text-xs font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#8E2C34]" />
              <span>Gudwal Road, Wah Cantt</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
