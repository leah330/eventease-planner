import { useState } from 'react';
import { getCurrentUser, getBookings, updateBooking } from '@/lib/store';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Pencil, Check, X } from 'lucide-react';

const statusColors: Record<string, string> = {
  paid: 'bg-success/10 text-success',
  pending: 'bg-warning/10 text-warning',
  cancelled: 'bg-destructive/10 text-destructive',
};

const MyBookings = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ eventDate: '', numPeople: 0 });
  const [, setRefresh] = useState(0);

  if (!user) { navigate('/login'); return null; }

  const bookings = getBookings().filter(b => b.userId === user.id).sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());

  const startEdit = (b: any) => {
    setEditingId(b.id);
    setEditForm({ eventDate: b.eventDate, numPeople: b.numPeople });
  };

  const saveEdit = (id: string) => {
    updateBooking(id, { eventDate: editForm.eventDate, numPeople: editForm.numPeople });
    setEditingId(null);
    setRefresh(r => r + 1);
    toast.success('Booking updated');
  };

  const payNow = (id: string) => {
    updateBooking(id, { paymentStatus: 'paid' });
    setRefresh(r => r + 1);
    toast.success('Payment successful!');
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4">
        <h1 className="font-display text-3xl font-bold text-foreground mb-8">My Bookings</h1>
        {bookings.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">No bookings yet.</p>
            <button onClick={() => navigate('/book')} className="gold-gradient px-6 py-2.5 rounded-md text-charcoal font-semibold hover:opacity-90 transition-opacity">Book an Event</button>
          </div>
        ) : (
          <div className="grid gap-4">
            {bookings.map(b => (
              <div key={b.id} className="bg-card rounded-lg border border-border p-6 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="font-display text-lg font-semibold text-foreground">{b.eventType}</h3>
                    {editingId === b.id ? (
                      <div className="flex items-center gap-3 mt-2">
                        <input type="date" value={editForm.eventDate} onChange={e => setEditForm({...editForm, eventDate: e.target.value})}
                          className="rounded-md border border-input bg-background px-2 py-1 text-sm text-foreground" />
                        <input type="number" min={1} value={editForm.numPeople} onChange={e => setEditForm({...editForm, numPeople: parseInt(e.target.value)})}
                          className="w-20 rounded-md border border-input bg-background px-2 py-1 text-sm text-foreground" />
                        <button onClick={() => saveEdit(b.id)} className="text-success"><Check className="h-5 w-5" /></button>
                        <button onClick={() => setEditingId(null)} className="text-destructive"><X className="h-5 w-5" /></button>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm text-muted-foreground">Date: {format(new Date(b.eventDate), 'PPP')} · {b.numPeople} people · {b.numDays} day(s)</p>
                        <p className="text-sm text-muted-foreground">Package: <span className="capitalize">{b.packageCategory}</span></p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusColors[b.paymentStatus]}`}>{b.paymentStatus}</span>
                    {b.paymentStatus === 'pending' && (
                      <button onClick={() => payNow(b.id)} className="gold-gradient px-4 py-1.5 rounded-md text-charcoal text-sm font-medium hover:opacity-90 transition-opacity">Pay Now</button>
                    )}
                    {b.paymentStatus !== 'cancelled' && editingId !== b.id && (
                      <button onClick={() => startEdit(b)} className="text-muted-foreground hover:text-primary"><Pencil className="h-4 w-4" /></button>
                    )}
                  </div>
                </div>
                {b.paymentStatus === 'pending' && (
                  <p className="text-xs text-destructive mt-3">⚠ Pay before {format(new Date(b.paymentDeadline), 'PPP')} to avoid cancellation</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
