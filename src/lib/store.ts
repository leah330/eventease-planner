import { Booking, User } from './types';

const BOOKINGS_KEY = 'leahpro_bookings';
const USERS_KEY = 'leahpro_users';
const CURRENT_USER_KEY = 'leahpro_current_user';

export function getBookings(): Booking[] {
  const data = localStorage.getItem(BOOKINGS_KEY);
  const bookings: Booking[] = data ? JSON.parse(data) : [];
  // Auto-cancel overdue bookings
  const now = new Date();
  return bookings.map(b => {
    if (b.paymentStatus === 'pending' && new Date(b.paymentDeadline) < now) {
      return { ...b, paymentStatus: 'cancelled' as const };
    }
    return b;
  });
}

export function saveBookings(bookings: Booking[]) {
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}

export function addBooking(booking: Booking) {
  const bookings = getBookings();
  bookings.push(booking);
  saveBookings(bookings);
}

export function updateBooking(id: string, updates: Partial<Booking>) {
  const bookings = getBookings();
  const idx = bookings.findIndex(b => b.id === id);
  if (idx !== -1) {
    bookings[idx] = { ...bookings[idx], ...updates };
    saveBookings(bookings);
  }
}

export function getUsers(): User[] {
  const data = localStorage.getItem(USERS_KEY);
  if (!data) {
    // Seed admin user
    const admin: User = { id: 'admin-1', email: 'admin@leahpro.com', name: 'Admin', isAdmin: true };
    localStorage.setItem(USERS_KEY, JSON.stringify([admin]));
    return [admin];
  }
  return JSON.parse(data);
}

export function registerUser(email: string, name: string, password: string): User | null {
  const users = getUsers();
  if (users.find(u => u.email === email)) return null;
  const user: User = { id: crypto.randomUUID(), email, name };
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  // Store password (demo only)
  localStorage.setItem(`pwd_${email}`, password);
  return user;
}

export function loginUser(email: string, password: string): User | null {
  const users = getUsers();
  const user = users.find(u => u.email === email);
  if (!user) return null;
  if (user.isAdmin && email === 'admin@leahpro.com' && password === 'admin123') return user;
  const stored = localStorage.getItem(`pwd_${email}`);
  if (stored === password) return user;
  return null;
}

export function getCurrentUser(): User | null {
  const data = localStorage.getItem(CURRENT_USER_KEY);
  return data ? JSON.parse(data) : null;
}

export function setCurrentUser(user: User | null) {
  if (user) localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  else localStorage.removeItem(CURRENT_USER_KEY);
}

export function calculatePaymentDeadline(eventDate: string): string {
  const d = new Date(eventDate);
  d.setDate(d.getDate() - 2);
  return d.toISOString().split('T')[0];
}
