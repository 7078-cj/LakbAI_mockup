import { ArrowLeft, MapPin, Star, Award } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LocalStoresProps {
  onBack: () => void;
}

const stores = [
  {
    id: '1',
    name: "Aling Rosa's Eatery",
    type: 'Restaurant',
    barangay: 'San Isidro',
    distance: '0.3 km',
    rewards: 50,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80',
  },
  {
    id: '2',
    name: 'Bayani Handicrafts',
    type: 'Crafts',
    barangay: 'Poblacion',
    distance: '0.5 km',
    rewards: 75,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=400&q=80',
  },
  {
    id: '3',
    name: 'Mountain View Eco Lodge',
    type: 'Accommodation',
    barangay: 'Tagaytay',
    distance: '1.2 km',
    rewards: 150,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&q=80',
  },
  {
    id: '4',
    name: 'Talipapa Local Market',
    type: 'Market',
    barangay: 'Central',
    distance: '0.8 km',
    rewards: 40,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&q=80',
  },
];

export function LocalStores({ onBack }: LocalStoresProps) {
  return (
    <div className="size-full bg-background overflow-y-auto pb-20">
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 z-10">
        <button onClick={onBack} className="size-10 flex items-center justify-center">
          <ArrowLeft className="size-5 text-primary" />
        </button>
        <div>
          <h1 className="text-lg text-primary">Local Businesses</h1>
          <p className="text-xs text-muted-foreground">Support the community</p>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="bg-gradient-to-r from-[#1E3A34] to-[#3A7CA5] text-white rounded-2xl p-5">
          <h2 className="text-lg mb-2">Circular Economy</h2>
          <p className="text-sm text-white/90">
            Every purchase supports local families and helps preserve rural micro-businesses. Earn rewards
            for community-centered travel.
          </p>
        </div>

        <div className="space-y-3">
          {stores.map((store) => (
            <div key={store.id} className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200">
              <div className="flex gap-4 p-4">
                <ImageWithFallback src={store.image} alt={store.name} className="size-20 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-primary truncate">{store.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{store.type}</p>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="size-3" />
                      {store.barangay}
                    </span>
                    <span className="text-muted-foreground">{store.distance}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="flex items-center gap-1 text-amber-600 text-xs">
                      <Star className="size-3 fill-amber-600" />
                      {store.rating}
                    </span>
                    <span className="flex items-center gap-1 bg-[#3A7CA5]/10 text-[#3A7CA5] px-2 py-1 rounded-full text-xs">
                      <Award className="size-3" />
                      +{store.rewards} pts
                    </span>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-100 px-4 py-3 flex gap-2">
                <button 
                  onClick={() => {
                    // In a real app, this would open store details or navigate
                    alert(`Visiting ${store.name}. Earn ${store.rewards} points when you scan QR code!`);
                  }}
                  className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors"
                >
                  Visit Store
                </button>
                <button 
                  onClick={() => {
                    // In a real app, this would open maps
                    alert(`Getting directions to ${store.name}...`);
                  }}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-primary hover:bg-gray-50 transition-colors"
                >
                  Directions
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
