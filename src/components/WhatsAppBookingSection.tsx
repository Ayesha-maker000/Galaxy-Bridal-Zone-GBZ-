import React, { useState } from 'react';
import { 
  MessageCircle, 
  Calendar, 
  Clock, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Phone, 
  User, 
  FileText
} from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';

export const WhatsAppBookingSection: React.FC = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = tomorrow.toISOString().split('T')[0];

  const [name, setName] = useState('');
  const [selectedService, setSelectedService] = useState('Bridal package (Rs. 45,000)');
  const [date, setDate] = useState(defaultDate);
  const [timeSlot, setTimeSlot] = useState('12:00 PM');
  const [notes, setNotes] = useState('');
  const [isSent, setIsSent] = useState(false);

  const timeSlots = [
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

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Clean, natural, polite human message format (not AI-generated style)
    const messageText = 
`Hi, I would like to book an appointment at Galaxy Bridal Zone.

Name: ${name.trim()}
Service: ${selectedService}
Date: ${date}
Time: ${timeSlot}
${notes.trim() ? `Notes: ${notes.trim()}\n` : ''}
Please let me know if this time works. Thank you!`;

    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/923345587744?text=${encodedMessage}`;

    // Open WhatsApp link
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsSent(true);
    setTimeout(() => setIsSent(false), 8000);
  };

  return (
    <section id="whatsapp-booking-section" className="py-16 md:py-20 relative scroll-mt-20 bg-[#FAF8F5] border-y border-[#E2DAD0]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#FAF0F1] text-[#8E2C34] text-xs font-semibold uppercase tracking-wider border border-[#E8CFD2]">
            <MessageCircle className="w-3.5 h-3.5 text-[#C29F6E]" />
            <span>Appointment Request</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl font-normal text-[#2C2523] tracking-tight">
            Book An Appointment
          </h2>

          <p className="text-sm sm:text-base text-[#6E625F] max-w-lg mx-auto leading-relaxed">
            Fill your details below to send an appointment booking directly to our WhatsApp at <span className="text-[#8E2C34] font-semibold">0334-5587744</span>.
          </p>
        </div>

        {/* Form Container Card */}
        <div className="bg-[#FFFFFF] p-6 sm:p-9 rounded-2xl border border-[#E2DAD0] hover:border-[#D4BC96] soft-card-shadow relative overflow-hidden transition-all">
          
          {isSent && (
            <div className="mb-6 p-4 rounded-xl bg-[#F4F9F4] border border-[#C5E1C5] text-[#2D5A27] text-xs sm:text-sm font-medium flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-[#3E8E34] shrink-0" />
              <div>
                <span className="block font-semibold">Opening WhatsApp with your appointment details</span>
                <span>Our desk will reply promptly to confirm your requested time slot.</span>
              </div>
            </div>
          )}

          <form onSubmit={handleWhatsAppSubmit} className="space-y-4" id="direct-whatsapp-booking-form">
            
            {/* 1. Full Name */}
            <div>
              <label htmlFor="wa-guest-name" className="block text-xs uppercase font-semibold tracking-wider text-[#6E5956] mb-1 flex items-center space-x-1.5">
                <User className="w-3.5 h-3.5 text-[#8E2C34]" />
                <span>Your Name <span className="text-[#8E2C34]">*</span></span>
              </label>
              <input
                type="text"
                id="wa-guest-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Fatima Tariq"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#DDD3C7] focus:border-[#8E2C34] text-[#2C2523] text-sm focus:ring-1 focus:ring-[#8E2C34] outline-none transition-all placeholder:text-[#A89D98]"
              />
            </div>

            {/* 2. Service Selection */}
            <div>
              <label htmlFor="wa-service-select" className="block text-xs uppercase font-semibold tracking-wider text-[#6E5956] mb-1 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C29F6E]" />
                <span>Select Service <span className="text-[#8E2C34]">*</span></span>
              </label>
              <select
                id="wa-service-select"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#DDD3C7] focus:border-[#8E2C34] text-[#2C2523] text-sm font-medium focus:ring-1 focus:ring-[#8E2C34] outline-none transition-all"
              >
                <optgroup label="💄 2. Makeup Studio (Bridal & Events)">
                  <option value="Bridal package - 11 services (Rs. 45,000)">Bridal package [11 Services] — Rs. 45,000</option>
                  <option value="reception bride - 2 services + free 1 party (Rs. 25,000)">reception bride [2 Services + Free Party] — Rs. 25,000</option>
                  <option value="Mehndi makeup - 2 services (Rs. 15,000)">Mehndi makeup [2 Services] — Rs. 15,000</option>
                  <option value="Nikah makeup - 4 services (Rs. 20,000)">Nikah makeup [4 Services] — Rs. 20,000</option>
                  <option value="Party makeup with hairdo (Rs. 10,000)">Party makeup with hairdo — Rs. 10,000</option>
                </optgroup>

                <optgroup label="✨ 3. Facials + Mani Pedi">
                  <option value="Mani Pedi (Rs. 3,500)">Mani Pedi — Rs. 3,500</option>
                  <option value="Hydra facial- Glass skin treatment (Rs. 5,000)">Hydra facial- Glass skin treatment — Rs. 5,000</option>
                  <option value="Hydra facial for acne (Rs. 6,500)">Hydra facial for acne — Rs. 6,500</option>
                  <option value="Hydra facial whitening for pigmentation (Rs. 5,000)">Hydra facial whitening for pigmentation — Rs. 5,000</option>
                  <option value="The deluxe hydra facial (Rs. 8,000)">The deluxe hydra facial — Rs. 8,000</option>
                  <option value="The platinum hydra facial (Rs. 10,000)">The platinum hydra facial — Rs. 10,000</option>
                </optgroup>

                <optgroup label="💇‍♀️ 1. Hair Artistry & Treatments">
                  <option value="Hair cut simple (Rs. 2,000)">Hair cut simple — Rs. 2,000</option>
                  <option value="Butterfly haircut (Rs. 3,000)">Butterfly haircut [Most Popular] — Rs. 3,000</option>
                  <option value="Kids haircut (Rs. 1,500)">Kids haircut — Rs. 1,500</option>
                  <option value="Custom hair treatments Consultation (From Rs. 20,000)">Custom hair treatments Consultation (Keratin / Botox / Rebonding) — From Rs. 20,000</option>
                </optgroup>

                <optgroup label="🌸 4. Waxing Services">
                  <option value="Full arms wax (Rs. 1,500)">Full arms wax — Rs. 1,500</option>
                  <option value="Full legs wax (Rs. 3,000)">Full legs wax — Rs. 3,000</option>
                  <option value="Half arms wax (Rs. 750)">Half arms wax — Rs. 750</option>
                  <option value="Half legs wax (Rs. 1,500)">Half legs wax — Rs. 1,500</option>
                  <option value="Face wax (Rs. 1,000)">Face wax — Rs. 1,000</option>
                </optgroup>
              </select>
            </div>

            {/* 3. Preferred Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="wa-booking-date" className="block text-xs uppercase font-semibold tracking-wider text-[#6E5956] mb-1 flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#8E2C34]" />
                  <span>Preferred Date <span className="text-[#8E2C34]">*</span></span>
                </label>
                <input
                  type="date"
                  id="wa-booking-date"
                  value={date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#DDD3C7] focus:border-[#8E2C34] text-[#2C2523] text-sm focus:ring-1 focus:ring-[#8E2C34] outline-none"
                />
              </div>

              <div>
                <label htmlFor="wa-time-slot" className="block text-xs uppercase font-semibold tracking-wider text-[#6E5956] mb-1 flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#C29F6E]" />
                  <span>Time Slot (11 AM - 7 PM)</span>
                </label>
                <select
                  id="wa-time-slot"
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#DDD3C7] focus:border-[#8E2C34] text-[#2C2523] text-sm focus:ring-1 focus:ring-[#8E2C34] outline-none"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 4. Message / Special Notes */}
            <div>
              <label htmlFor="wa-booking-notes" className="block text-xs uppercase font-semibold tracking-wider text-[#6E5956] mb-1 flex items-center space-x-1.5">
                <FileText className="w-3.5 h-3.5 text-[#C29F6E]" />
                <span>Notes (Optional)</span>
              </label>
              <textarea
                id="wa-booking-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Mention any preferences, event dates, or specific requirements..."
                rows={2}
                className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#DDD3C7] focus:border-[#8E2C34] text-[#2C2523] text-sm focus:ring-1 focus:ring-[#8E2C34] outline-none placeholder:text-[#A89D98]"
              />
            </div>

            {/* Submit / Send to WhatsApp Button */}
            <div className="pt-2">
              <button
                type="submit"
                id="send-whatsapp-booking-btn"
                className="w-full py-3.5 px-6 bg-[#25D366] hover:bg-[#1EBE5D] text-[#FFFFFF] text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center space-x-2.5"
              >
                <MessageCircle className="w-5 h-5 fill-[#FFFFFF] text-[#25D366]" />
                <span>Send to WhatsApp (0334-5587744)</span>
                <Send className="w-4 h-4" />
              </button>

              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#7A6E6A] mt-3">
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-[#C29F6E]" />
                  <span>Working Hours: 11:00 AM – 07:00 PM</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Phone className="w-3.5 h-3.5 text-[#8E2C34]" />
                  <span>Hotline: 0334-5587744</span>
                </span>
              </div>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
};
