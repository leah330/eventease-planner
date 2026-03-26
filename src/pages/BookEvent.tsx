import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, addBooking, calculatePaymentDeadline } from '@/lib/store';
import { Booking } from '@/lib/types';
import { toast } from 'sonner';
import { format } from 'date-fns';

const eventTypes = ['Wedding', 'Birthday Party', 'Conference', 'Concert', 'Corporate Event', 'Traditional Event (Ruracio)', 'Other'];
const packages = [
  { value: 'high' as const, label: 'High Package', desc: 'Premium venue, full catering, decorations, photography' },
  { value: 'middle' as const, label: 'Middle Package', desc: 'Standard venue, catering, basic decorations' },
  { value: 'low' as const, label: 'Low Package', desc: 'Venue only, self-service setup' },
];

const BookEvent = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const [step, setStep] = useState<'form' | 'payment'>('form');
  const [form, setForm] = useState({
    fullName: user?.name || '',
    phone: '',
    eventType: '',
    eventDate: '',
    numDays: 1,
    numPeople: 10,
    packageCategory: '' as 'high' | 'middle' | 'low' | '',
  });
  const [booking, setBooking] = useState<Booking | null>(null);

  if (!user) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Please Login First</h2>
          <p className="text-muted-foreground mb-6">You need to be logged in to book an event.</p>
          <button onClick={() => navigate('/login')} className="gold-gradient px-6 py-2.5 rounded-md text-charcoal font-semibold hover:opacity-90 transition-opacity">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.packageCategory) { toast.error('Please select a package'); return; }
    const deadline = calculatePaymentDeadline(form.eventDate);
    const newBooking: Booking = {
      id: crypto.randomUUID(),
      fullName: form.fullName,
      phone: form.phone,
      eventType: form.eventType,
      eventDate: form.eventDate,
      numDays: form.numDays,
      numPeople: form.numPeople,
      packageCategory: form.packageCategory,
      paymentStatus: 'pending',
      bookingStatus: 'pending',
      paymentDeadline: deadline,
      createdAt: new Date().toISOString(),
      userId: user.id,
    };
    setBooking(newBooking);
    setStep('payment');
  };

  const handlePayment = (payNow: boolean) => {
    if (!booking) return;
    const final = { ...booking, paymentStatus: payNow ? 'paid' as const : 'pending' as const };
    addBooking(final);
    toast.success(payNow ? 'Payment successful! Booking confirmed.' : 'Booking submitted. Remember to pay before the deadline.');
    navigate('/my-bookings');
  };

  if (step === 'payment' && booking) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-background">
        <div className="container mx-auto px-4 max-w-lg">
          <div className="bg-card rounded-lg shadow-lg border border-border p-8">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">Payment</h2>
            <div className="space-y-3 mb-6 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Event:</span><span className="font-medium text-foreground">{booking.eventType}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Date:</span><span className="font-medium text-foreground">{format(new Date(booking.eventDate), 'PPP')}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Package:</span><span className="font-medium text-foreground capitalize">{booking.packageCategory}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">People:</span><span className="font-medium text-foreground">{booking.numPeople}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Days:</span><span className="font-medium text-foreground">{booking.numDays}</span></div>
              <hr className="border-border" />
              <div className="flex justify-between text-destructive font-medium">
                <span>Payment Deadline:</span>
                <span>{format(new Date(booking.paymentDeadline), 'PPP')}</span>
              </div>
              <p className="text-xs text-muted-foreground">You must pay at least 2 days before the event date to avoid cancellation.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => handlePayment(true)} className="gold-gradient rounded-md py-3 text-charcoal font-semibold hover:opacity-90 transition-opacity">
                Pay Now
              </button>
              <button onClick={() => handlePayment(false)} className="rounded-md py-3 border border-border text-foreground font-medium hover:bg-accent transition-colors">
                Pay Later
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-foreground text-center mb-2">Book Your Event</h1>
        <p className="text-center text-muted-foreground mb-8">Fill in the details below to reserve your venue</p>
        <form onSubmit={handleSubmit} className="bg-card rounded-lg shadow-lg border border-border p-8 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
              <input type="text" required value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Phone Number</label>
              <input type="tel" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="+254 700 000 000" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Type of Event</label>
            <select required value={form.eventType} onChange={e => setForm({...form, eventType: e.target.value})}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="">Select event type</option>
              {eventTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Event Date</label>
              <input type="date" required value={form.eventDate} onChange={e => setForm({...form, eventDate: e.target.value})}
                min={new Date().toISOString().split('T')[0]}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Number of Days</label>
              <input type="number" required min={1} value={form.numDays} onChange={e => setForm({...form, numDays: parseInt(e.target.value)})}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Number of People</label>
              <input type="number" required min={1} value={form.numPeople} onChange={e => setForm({...form, numPeople: parseInt(e.target.value)})}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Package Category</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {packages.map(p => (
                <button type="button" key={p.value} onClick={() => setForm({...form, packageCategory: p.value})}
                  className={`rounded-lg border-2 p-4 text-left transition-all ${form.packageCategory === p.value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                  <div className="font-medium text-foreground text-sm">{p.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{p.desc}</div>
                </button>
              ))}
            </div>
          </div>
          <button type="submit" className="w-full gold-gradient rounded-md py-3 text-charcoal font-semibold text-lg hover:opacity-90 transition-opacity">
            Submit Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookEvent;
