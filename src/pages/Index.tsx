import { Link } from 'react-router-dom';
import heroBg from '@/assets/hero-bg.jpg';
import weddingImg from '@/assets/wedding-event.jpg';
import birthdayImg from '@/assets/birthday-event.jpg';
import conferenceImg from '@/assets/conference-event.jpg';
import concertImg from '@/assets/concert-event.jpg';
import traditionalImg from '@/assets/traditional-event.jpg';
import corporateImg from '@/assets/corporate-event.jpg';

const events = [
  { title: 'Weddings', img: weddingImg },
  { title: 'Birthday Parties', img: birthdayImg },
  { title: 'Conferences', img: conferenceImg },
  { title: 'Concerts', img: concertImg },
  { title: 'Traditional Events', img: traditionalImg },
  { title: 'Corporate Events', img: corporateImg },
];

const Index = () => (
  <div className="min-h-screen">
    {/* Hero */}
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      <img src={heroBg} alt="Luxury event venue" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
      <div className="hero-overlay absolute inset-0" />
      <div className="relative z-10 text-center px-4 max-w-3xl animate-fade-in">
        <h1 className="font-display text-4xl md:text-6xl font-bold text-cream mb-4">
          LeahPro <span className="text-gold">Events</span>
        </h1>
        <p className="text-lg md:text-xl text-cream/90 mb-8 font-body">
          Your premier destination for booking stunning venues for any occasion. From weddings to corporate galas, we make your events unforgettable.
        </p>
        <Link
          to="/book"
          className="inline-flex items-center justify-center gold-gradient px-8 py-4 rounded-md text-charcoal font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg"
        >
          Book Event
        </Link>
      </div>
    </section>

    {/* Event Types */}
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-3">Our Events</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">We specialize in creating magical experiences for every occasion</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(e => (
            <div key={e.title} className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <img src={e.img} alt={e.title} loading="lazy" width={1280} height={720} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-charcoal/40 group-hover:bg-charcoal/60 transition-colors flex items-end p-5">
                <h3 className="font-display text-xl font-semibold text-cream">{e.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 bg-charcoal">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-display text-3xl font-bold text-cream mb-4">Ready to Create Memories?</h2>
        <p className="text-cream/70 mb-8 max-w-lg mx-auto">Book your dream venue today and let us handle the rest. Professional planning, stunning venues, unforgettable moments.</p>
        <Link to="/book" className="inline-flex items-center justify-center gold-gradient px-8 py-3 rounded-md text-charcoal font-semibold hover:opacity-90 transition-opacity">
          Book Now
        </Link>
      </div>
    </section>
  </div>
);

export default Index;
