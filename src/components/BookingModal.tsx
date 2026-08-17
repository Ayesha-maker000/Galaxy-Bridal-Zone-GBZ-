import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  User, 
  Phone, 
  ShieldCheck, 
  MessageCircle, 
  Clock, 
  Crown 
} from 'lucide-react';
import { ServiceCategory, ServiceItem, BookingAppointment } from '../types';
import { SERVICES_DATA } from '../data/servicesData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: ServiceCategory;
  initialService?: ServiceItem | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialCategory = 'makeup',
  initialService = null,
}) => {
  const [category, setCategory] = useState<ServiceCategory>(initialCategory);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialService ? initialService.id : SERVICES_DATA.find((s) => s.category === initialCategory)?.id || ''
  );
  
  // Date & Time
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];

  const [date, setDate] = useState<string>(defaultDateStr);
  const [timeSlot, setTimeSlot] = useState<string>('12:00 PM');
  
  // Guest details
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  
  // Status
  const [confirmedBooking, setConfirmedBooking] = useState<BookingAppointment | null>(null);
  const [error, setError] = useState<string>('');

  const handleCategoryChange = (cat: ServiceCategory) => {
    setCategory(cat);
    const firstOfCat = SERVICES_DATA.find((s) => s.category === cat);
    if (firstOfCat) {
      setSelectedServiceId(firstOfCat.id);
    }
  };

  const selectedService = SERVICES_DATA.find((s) => s.id === selectedServiceId) || SERVICES_DATA[0];

  const availableTimeSlots = [
    '11:00 AM',
    '11:30 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM',
    '06:30 PM',
  ];

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!clientPhone.trim()) {
      setError('Please provide your phone number.');
      return;
    }

    setError('');

    const newAppointment: BookingAppointment = {
      id: `GBZ-${Math.floor(100000 + Math.random() * 900000)}`,
      clientName: clientName.trim(),
      clientEmail: 'info@galaxybridal.pk',
      clientPhone: clientPhone.trim(),
      serviceId: selectedService.id,
      serviceName: selectedService.title,
      category: selectedService.category,
      price: selectedService.price,
      date,
      timeSlot,
      stylistPreference: 'Kahkishan Ali / Master Specialist',
      specialRequests: specialRequests.trim(),
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };

    // Save into localStorage
    try {
      const stored = localStorage.getItem('galaxy_bridal_zone_bookings') || '[]';
      const parsed = JSON.parse(stored);
      parsed.unshift(newAppointment);
      localStorage.setItem('galaxy_bridal_zone_bookings', JSON.stringify(parsed));
    } catch {
      // ignore
    }

    // Clean, natural, polite human message format
    const messageText = 
`Hi, I would like to book an appointment at Galaxy Bridal Zone.

Name: ${clientName.trim()}
Service: ${selectedService.title} (${selectedService.price})
Date: ${date}
Time: ${timeSlot}
Phone: ${clientPhone.trim()}
${specialRequests.trim() ? `Notes: ${specialRequests.trim()}\n` : ''}
Please let me know if this time works. Thank you!`;

    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/923345587744?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setConfirmedBooking(newAppointment);
  };

  const handleResetAndClose = () => {
    setConfirmedBooking(null);
    setClientName('');
    setClientPhone('');
    setSpecialRequests('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="booking-modal-overlay" className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleResetAndClose}
            className="fixed inset-0 bg-[#2C2523]/50 backdrop-blur-xs"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl bg-[#FAF8F5] rounded-3xl border border-[#E2DAD0] shadow-xl overflow-hidden z-10 my-8"
            id="booking-modal"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 bg-[#381317] border-b border-[#521C22] flex items-center justify-between text-[#FAF8F5]">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-[#4A191E] text-[#D4BC96] border border-[#6B242B] flex items-center justify-center shadow-2xs">
                  <Sparkles className="w-4 h-4 text-[#D4BC96]" />
                </div>
                <div>
                  <h3 className="font-playfair text-lg sm:text-xl font-normal text-[#FAF8F5]">
                    Galaxy Bridal Zone
                  </h3>
                  <p className="text-xs text-[#D4BC96] font-medium tracking-wide">
                    By Kahkishan Ali • Wah Cantt
                  </p>
                </div>
              </div>

              <button
                id="close-booking-modal-btn"
                onClick={handleResetAndClose}
                className="p-2 rounded-full text-[#E8D4B8] hover:bg-[#4A191E] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-7 max-h-[75vh] overflow-y-auto">
              {confirmedBooking ? (
                /* Confirmation Screen */
                <div className="text-center py-4 space-y-5 animate-fade-in" id="booking-confirmation-view">
                  <div className="w-12 h-12 bg-[#F4F9F4] border border-[#C5E1C5] rounded-full flex items-center justify-center mx-auto text-[#2D5A27]">
                    <CheckCircle2 className="w-6 h-6 text-[#2D5A27]" />
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#8A5855]">
                      Appointment Sent to WhatsApp
                    </span>
                    <h4 className="font-playfair text-2xl font-normal text-[#2C2523]">
                      Thank You, {confirmedBooking.clientName}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#6E625F] max-w-sm mx-auto">
                      Our desk at <span className="font-semibold text-[#2C2523]">0334-5587744</span> will confirm your requested appointment.
                    </p>
                  </div>

                  {/* Summary Card */}
                  <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E2DAD0] text-left max-w-sm mx-auto space-y-2.5 text-xs text-[#5C514E]">
                    <div className="flex justify-between items-center pb-2 border-b border-[#EAE3DA]">
                      <span className="font-medium text-[#7A6E6A]">Booking Reference</span>
                      <span className="font-mono font-medium text-[#2C2523] bg-[#F4EFEB] px-2 py-0.5 rounded">
                        {confirmedBooking.id}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-[#7A6E6A]">Service:</span>
                        <span className="font-medium text-[#2C2523]">{confirmedBooking.serviceName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#7A6E6A]">Date & Time:</span>
                        <span className="font-medium text-[#2C2523]">{confirmedBooking.date} at {confirmedBooking.timeSlot}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#7A6E6A]">Price:</span>
                        <span className="font-semibold text-[#8A5855] font-playfair text-sm">{confirmedBooking.price}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      id="done-booking-btn"
                      onClick={handleResetAndClose}
                      className="px-6 py-2.5 bg-[#8A5855] text-[#FAF8F5] text-xs uppercase tracking-wider font-semibold rounded-full shadow-2xs hover:bg-[#744442] transition-all"
                    >
                      Return to Salon
                    </button>
                  </div>
                </div>
              ) : (
                /* Booking Form */
                <form onSubmit={handleBookSubmit} className="space-y-4" id="booking-modal-form">
                  {error && (
                    <div className="p-3 rounded-xl bg-[#FDF2F2] border border-[#F5C6CB] text-[#721C24] text-xs font-medium">
                      {error}
                    </div>
                  )}

                  {/* 1. Category Switcher */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#6E5956] mb-1.5">
                      1. Select Section
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'makeup', label: '2. Makeup' },
                        { id: 'facials-nails', label: '3. Facials + Mani' },
                        { id: 'hair', label: '1. Hair' },
                        { id: 'waxing', label: '4. Waxing' },
                      ].map((item) => (
                        <button
                          type="button"
                          key={item.id}
                          id={`booking-cat-btn-${item.id}`}
                          onClick={() => handleCategoryChange(item.id as ServiceCategory)}
                          className={`py-2 px-2 rounded-xl text-xs font-medium transition-all text-center border ${
                            category === item.id
                              ? 'bg-[#8E2C34] text-[#FAF8F5] border-[#8E2C34]'
                              : 'bg-[#FFFFFF] hover:bg-[#FAF0F1] text-[#5C514E] border-[#DDD3C7]'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2. Specific Service */}
                  <div>
                    <label htmlFor="booking-service-select" className="block text-xs uppercase tracking-wider font-semibold text-[#6E5956] mb-1">
                      2. Select Treatment / Service
                    </label>
                    <select
                      id="booking-service-select"
                      value={selectedServiceId}
                      onChange={(e) => setSelectedServiceId(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#FFFFFF] border border-[#DDD3C7] focus:border-[#8E2C34] text-[#2C2523] text-xs font-medium focus:ring-1 focus:ring-[#8E2C34] outline-none"
                    >
                      {SERVICES_DATA.filter((s) => s.category === category).map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.title} — {service.price} ({service.duration})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 3. Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="booking-date" className="block text-xs uppercase tracking-wider font-semibold text-[#6E5956] mb-1 flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-[#8E2C34]" />
                        <span>Date</span>
                      </label>
                      <input
                        type="date"
                        id="booking-date"
                        value={date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#FFFFFF] border border-[#DDD3C7] focus:border-[#8E2C34] text-[#2C2523] text-xs focus:ring-1 focus:ring-[#8E2C34] outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="booking-time" className="block text-xs uppercase tracking-wider font-semibold text-[#6E5956] mb-1 flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-[#8E2C34]" />
                        <span>Time Slot (11 AM - 7 PM)</span>
                      </label>
                      <select
                        id="booking-time"
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#FFFFFF] border border-[#DDD3C7] focus:border-[#8E2C34] text-[#2C2523] text-xs focus:ring-1 focus:ring-[#8E2C34] outline-none"
                      >
                        {availableTimeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* 4. Guest Details */}
                  <div className="pt-2 border-t border-[#EAE3DA] space-y-3">
                    <span className="block text-xs uppercase tracking-wider font-semibold text-[#6E5956]">
                      Your Information
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <div className="relative">
                          <User className="w-3.5 h-3.5 text-[#8E2C34] absolute left-3 top-2.5" />
                          <input
                            type="text"
                            id="booking-client-name"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            placeholder="Your Name"
                            className="w-full pl-8 pr-3 py-2 rounded-xl bg-[#FFFFFF] border border-[#DDD3C7] focus:border-[#8E2C34] text-[#2C2523] text-xs outline-none"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <div className="relative">
                          <Phone className="w-3.5 h-3.5 text-[#8E2C34] absolute left-3 top-2.5" />
                          <input
                            type="tel"
                            id="booking-client-phone"
                            value={clientPhone}
                            onChange={(e) => setClientPhone(e.target.value)}
                            placeholder="Phone (03xx-xxxxxxx)"
                            className="w-full pl-8 pr-3 py-2 rounded-xl bg-[#FFFFFF] border border-[#DDD3C7] focus:border-[#8E2C34] text-[#2C2523] text-xs outline-none"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <textarea
                        id="booking-client-notes"
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        placeholder="Notes or preferences (optional)..."
                        rows={2}
                        className="w-full px-3 py-2 rounded-xl bg-[#FFFFFF] border border-[#DDD3C7] focus:border-[#8E2C34] text-[#2C2523] text-xs outline-none"
                      />
                    </div>
                  </div>

                  {/* Submit / WhatsApp Trigger Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      id="confirm-booking-btn"
                      className="w-full py-3.5 px-6 bg-[#25D366] hover:bg-[#1EBE5D] text-[#FFFFFF] text-xs font-semibold tracking-wider uppercase rounded-xl transition-all shadow-2xs flex items-center justify-center space-x-2"
                    >
                      <MessageCircle className="w-4 h-4 fill-[#FFFFFF] text-[#25D366]" />
                      <span>Send to WhatsApp ({selectedService.price})</span>
                    </button>
                    
                    <div className="flex items-center justify-center space-x-1.5 text-[11px] text-[#7A6E6A] font-medium mt-2">
                      <span>Direct WhatsApp booking to Galaxy Bridal Zone (0334-5587744)</span>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
