export type ServiceCategory = 'hair' | 'makeup' | 'facials-nails' | 'waxing';

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  price: string;
  numericPrice: number;
  tags: string[];
  isPopular?: boolean;
  image: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  serviceCategory: ServiceCategory | 'general';
  serviceName: string;
  comment: string;
  verifiedClient?: boolean;
  helpfulCount?: number;
}

export interface BookingAppointment {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceId: string;
  serviceName: string;
  category: ServiceCategory;
  price: string;
  date: string;
  timeSlot: string;
  stylistPreference?: string;
  specialRequests?: string;
  createdAt: string;
  status: 'confirmed' | 'pending';
}
