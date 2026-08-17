import React, { useState } from 'react';
import { Header } from './components/Header';
import { SlideOutMenu } from './components/SlideOutMenu';
import { Hero } from './components/Hero';
import { ServiceCategorySection } from './components/ServiceCategorySection';
import { StudioGallery } from './components/StudioGallery';
import { WhatsAppBookingSection } from './components/WhatsAppBookingSection';
import { RatingsSection } from './components/RatingsSection';
import { GoogleMapSection } from './components/GoogleMapSection';
import { BookingModal } from './components/BookingModal';
import { Footer } from './components/Footer';
import { SERVICES_DATA, CATEGORY_DETAILS } from './data/servicesData';
import { getStoredReviews } from './data/initialReviews';
import { ReviewItem, ServiceCategory, ServiceItem } from './types';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingCategory, setBookingCategory] = useState<ServiceCategory>('makeup');
  const [bookingService, setBookingService] = useState<ServiceItem | null>(null);

  // Reviews state persisted in localStorage
  const [reviews, setReviews] = useState<ReviewItem[]>(() => getStoredReviews());

  // Scroll helper
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBooking = (category: ServiceCategory = 'makeup', service: ServiceItem | null = null) => {
    setBookingCategory(category);
    setBookingService(service);
    setIsBookingOpen(true);
  };

  const handleBookSpecificService = (service: ServiceItem) => {
    handleOpenBooking(service.category, service);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#2C2523] font-sans selection:bg-[#EAE3DA] selection:text-[#2C2523] overflow-x-hidden w-full max-w-full">
      {/* 1. Header with branding & top-right 3-line settings button */}
      <Header
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenBooking={(cat) => handleOpenBooking(cat || 'makeup')}
        onSelectSection={scrollToSection}
      />

      {/* 2. Slide-out Menu from right with Services, Bookings, Ratings, Contact */}
      <SlideOutMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSelectSection={scrollToSection}
        onOpenBooking={(cat) => handleOpenBooking(cat || 'makeup')}
      />

      {/* 3. Main Content Container */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {/* Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking('makeup')}
          onExploreServices={() => scrollToSection('hair-section')}
          onGoToWhatsAppBooking={() => scrollToSection('whatsapp-booking-section')}
        />

        {/* ============================================================ */}
        {/* 4 ORDERED CORE SECTIONS:                                     */}
        {/* 1. Hair                                                      */}
        {/* 2. Makeup                                                    */}
        {/* 3. Facials + Mani Pedi                                       */}
        {/* 4. Waxing services                                           */}
        {/* ============================================================ */}

        {/* Section 1: Hair */}
        <ServiceCategorySection
          sectionId="hair-section"
          category="hair"
          categoryNumber="01"
          title={CATEGORY_DETAILS.hair.title}
          subtitle={CATEGORY_DETAILS.hair.subtitle}
          description={CATEGORY_DETAILS.hair.description}
          services={SERVICES_DATA.filter((s) => s.category === 'hair')}
          onBookService={handleBookSpecificService}
          onOpenBookingCategory={(cat) => handleOpenBooking(cat)}
          isEven={false}
        />

        {/* Section 2: Makeup */}
        <ServiceCategorySection
          sectionId="makeup-section"
          category="makeup"
          categoryNumber="02"
          title={CATEGORY_DETAILS.makeup.title}
          subtitle={CATEGORY_DETAILS.makeup.subtitle}
          description={CATEGORY_DETAILS.makeup.description}
          services={SERVICES_DATA.filter((s) => s.category === 'makeup')}
          onBookService={handleBookSpecificService}
          onOpenBookingCategory={(cat) => handleOpenBooking(cat)}
          isEven={true}
        />

        {/* Section 3: Facials + Mani Pedi (includes Mani Pedi Rs. 3,500) */}
        <ServiceCategorySection
          sectionId="facials-nails-section"
          category="facials-nails"
          categoryNumber="03"
          title={CATEGORY_DETAILS['facials-nails'].title}
          subtitle={CATEGORY_DETAILS['facials-nails'].subtitle}
          description={CATEGORY_DETAILS['facials-nails'].description}
          services={SERVICES_DATA.filter((s) => s.category === 'facials-nails')}
          onBookService={handleBookSpecificService}
          onOpenBookingCategory={(cat) => handleOpenBooking(cat)}
          isEven={false}
        />

        {/* Section 4: Waxing services */}
        <ServiceCategorySection
          sectionId="waxing-section"
          category="waxing"
          categoryNumber="04"
          title={CATEGORY_DETAILS.waxing.title}
          subtitle={CATEGORY_DETAILS.waxing.subtitle}
          description={CATEGORY_DETAILS.waxing.description}
          services={SERVICES_DATA.filter((s) => s.category === 'waxing')}
          onBookService={handleBookSpecificService}
          onOpenBookingCategory={(cat) => handleOpenBooking(cat)}
          isEven={true}
        />

        {/* Studio Gallery Section (Showing Studio Interior, Vanity & Reception) */}
        <StudioGallery />

        {/* ============================================================ */}
        {/* INSTANT WHATSAPP APPOINTMENT BOOKING SECTION                 */}
        {/* Name, Date, Service, Time Slot, Notes -> 0334-5587744        */}
        {/* ============================================================ */}
        <WhatsAppBookingSection />

        {/* ============================================================ */}
        {/* RATINGS SECTION (Below Waxing Section)                       */}
        {/* Leave reviews and automatically saves them                   */}
        {/* ============================================================ */}
        <RatingsSection
          reviews={reviews}
          onReviewAdded={(updatedReviews) => setReviews(updatedReviews)}
        />

        {/* ============================================================ */}
        {/* GOOGLE MAPS LOCATION SECTION                                 */}
        {/* Near Roots Millennium School, Gudwal road, Wah cantt         */}
        {/* ============================================================ */}
        <GoogleMapSection />
      </main>

      {/* 5. Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialCategory={bookingCategory}
        initialService={bookingService}
      />

      {/* 6. Footer */}
      <Footer
        onSelectSection={scrollToSection}
        onOpenBooking={(cat) => handleOpenBooking(cat || 'makeup')}
      />
    </div>
  );
}
