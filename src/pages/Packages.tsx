import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const pkgs = [
  {
    name: 'Low Package',
    price: 'KES 50,000',
    features: ['Venue access', 'Basic setup & cleanup', 'Parking space', 'Security'],
    color: 'border-border',
  },
  {
    name: 'Middle Package',
    price: 'KES 150,000',
    features: ['Everything in Low', 'Full catering service', 'Basic decorations', 'Sound system', 'Event coordinator'],
    color: 'border-primary',
    popular: true,
  },
  {
    name: 'High Package',
    price: 'KES 350,000',
    features: ['Everything in Middle', 'Premium decorations', 'Photography & Videography', 'Live entertainment', 'VIP lounge', 'Custom menu'],
    color: 'border-gold',
  },
];

const Packages = () => (
  <div className="min-h-screen pt-24 pb-16 bg-background">
    <div className="container mx-auto px-4">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-3">Our Packages</h1>
      <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto">Choose the perfect package for your event</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {pkgs.map(p => (
          <div key={p.name} className={`relative bg-card rounded-lg border-2 ${p.color} p-8 shadow-sm hover:shadow-lg transition-shadow`}>
            {p.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 gold-gradient px-4 py-1 rounded-full text-xs font-semibold text-charcoal">Most Popular</span>
            )}
            <h3 className="font-display text-xl font-bold text-foreground mb-2">{p.name}</h3>
            <p className="text-2xl font-bold text-primary mb-6">{p.price}</p>
            <ul className="space-y-3 mb-8">
              {p.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="h-4 w-4 text-success flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link to="/book" className={`block text-center rounded-md py-2.5 font-semibold transition-opacity hover:opacity-90 ${p.popular ? 'gold-gradient text-charcoal' : 'bg-secondary text-secondary-foreground'}`}>
              Book Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Packages;
