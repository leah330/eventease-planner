import weddingImg from '@/assets/wedding-event.jpg';
import birthdayImg from '@/assets/birthday-event.jpg';
import conferenceImg from '@/assets/conference-event.jpg';
import concertImg from '@/assets/concert-event.jpg';
import traditionalImg from '@/assets/traditional-event.jpg';
import corporateImg from '@/assets/corporate-event.jpg';
import heroImg from '@/assets/hero-bg.jpg';

const images = [
  { src: weddingImg, title: 'Elegant Wedding Reception' },
  { src: birthdayImg, title: 'Birthday Celebration' },
  { src: conferenceImg, title: 'Business Conference' },
  { src: concertImg, title: 'Live Concert' },
  { src: traditionalImg, title: 'Traditional Ceremony' },
  { src: corporateImg, title: 'Corporate Dinner' },
  { src: heroImg, title: 'Grand Ballroom Setup' },
  { src: weddingImg, title: 'Wedding Decorations' },
  { src: birthdayImg, title: 'Party Setup' },
];

const Gallery = () => (
  <div className="min-h-screen pt-24 pb-16 bg-background">
    <div className="container mx-auto px-4">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-3">Gallery</h1>
      <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto">Browse through our stunning events and beautifully decorated venues</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <div key={i} className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
            <img src={img.src} alt={img.title} loading="lazy" width={1280} height={720}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/50 transition-colors flex items-end">
              <p className="p-4 text-cream font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">{img.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Gallery;
