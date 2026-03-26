import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We will get back to you soon.');
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-3">Contact Us</h1>
        <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto">Have questions? We'd love to hear from you.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="space-y-6">
            {[
              { icon: MapPin, label: 'Address', value: 'Nairobi, Kenya' },
              { icon: Phone, label: 'Phone', value: '+254 700 000 000' },
              { icon: Mail, label: 'Email', value: 'info@leahproevents.com' },
              { icon: Clock, label: 'Hours', value: 'Mon-Sat: 8am - 6pm' },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3"><item.icon className="h-5 w-5 text-primary" /></div>
                <div>
                  <p className="font-medium text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="bg-card rounded-lg border border-border p-8 space-y-4 shadow-sm">
            <input type="text" required placeholder="Your Name"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            <input type="email" required placeholder="Your Email"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            <textarea required rows={5} placeholder="Your Message"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
            <button type="submit" className="w-full gold-gradient rounded-md py-2.5 text-charcoal font-semibold hover:opacity-90 transition-opacity">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
