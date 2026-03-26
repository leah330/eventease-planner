import { useState } from 'react';
import { getCurrentUser, getBookings, updateBooking } from '@/lib/store';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const statusColors: Record<string, string> = {
  paid: 'bg-success/10 text-success',
  pending: 'bg-warning/10 text-warning',
  cancelled: 'bg-destructive/10 text-destructive',
  approved: 'bg-success/10 text-success',
  rejected: 'bg-destructive/10 text-destructive',
};

const Admin = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const [, setRefresh] = useState(0);

  if (!user?.isAdmin) { navigate('/'); return null; }

  const bookings = getBookings().sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());

  const setStatus = (id: string, status: 'approved' | 'rejected') => {
    updateBooking(id, { bookingStatus: status });
    setRefresh(r => r + 1);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground mb-8">All bookings sorted by upcoming event date</p>
        <div className="overflow-x-auto rounded-lg border border-border shadow-sm">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                {['Full Name', 'Phone', 'Event Type', 'Event Date', 'Days', 'People', 'Package', 'Payment', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-secondary-foreground uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {bookings.length === 0 ? (
                <tr><td colSpan={10} className="px-4 py-8 text-center text-muted-foreground">No bookings yet</td></tr>
              ) : bookings.map(b => (
                <tr key={b.id} className="hover:bg-accent/50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-foreground">{b.fullName}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{b.phone}</td>
                  <td className="px-4 py-3 text-sm text-foreground">{b.eventType}</td>
                  <td className="px-4 py-3 text-sm text-foreground">{format(new Date(b.eventDate), 'PP')}</td>
                  <td className="px-4 py-3 text-sm text-foreground">{b.numDays}</td>
                  <td className="px-4 py-3 text-sm text-foreground">{b.numPeople}</td>
                  <td className="px-4 py-3 text-sm capitalize text-foreground">{b.packageCategory}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${statusColors[b.paymentStatus]}`}>{b.paymentStatus}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${statusColors[b.bookingStatus]}`}>{b.bookingStatus}</span>
                  </td>
                  <td className="px-4 py-3">
                    {b.bookingStatus === 'pending' && (
                      <div className="flex gap-2">
                        <button onClick={() => setStatus(b.id, 'approved')} className="px-2 py-1 text-xs bg-success/10 text-success rounded hover:bg-success/20">Approve</button>
                        <button onClick={() => setStatus(b.id, 'rejected')} className="px-2 py-1 text-xs bg-destructive/10 text-destructive rounded hover:bg-destructive/20">Reject</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
