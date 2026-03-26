export interface Booking {
  id: string;
  fullName: string;
  phone: string;
  eventType: string;
  eventDate: string;
  numDays: number;
  numPeople: number;
  packageCategory: 'high' | 'middle' | 'low';
  paymentStatus: 'paid' | 'pending' | 'cancelled';
  bookingStatus: 'approved' | 'rejected' | 'pending';
  paymentDeadline: string;
  createdAt: string;
  userId: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin?: boolean;
}
