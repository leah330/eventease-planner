import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-charcoal text-cream py-12">
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="font-display text-xl font-semibold text-gold mb-3">LeahPro Events</h3>
        <p className="text-sm text-cream/70">Your trusted partner for unforgettable events. From intimate gatherings to grand celebrations.</p>
      </div>
      <div>
        <h4 className="font-display text-lg font-medium text-gold-light mb-3">Quick Links</h4>
        <div className="space-y-2">
          {['/', '/book', '/packages', '/gallery', '/contact'].map((to, i) => (
            <Link key={to} to={to} className="block text-sm text-cream/70 hover:text-gold transition-colors">
              {['Home', 'Book Event', 'Packages', 'Gallery', 'Contact'][i]}
            </Link>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-display text-lg font-medium text-gold-light mb-3">Contact Us</h4>
        <p className="text-sm text-cream/70">Email: info@leahproevents.com</p>
        <p className="text-sm text-cream/70">Phone: +254 700 000 000</p>
        <p className="text-sm text-cream/70">Nairobi, Kenya</p>
      </div>
    </div>
    <div className="container mx-auto px-4 mt-8 pt-6 border-t border-cream/10 text-center text-sm text-cream/50">
      © {new Date().getFullYear()} LeahPro Events. All rights reserved.
    </div>
  </footer>
);

export default Footer;
