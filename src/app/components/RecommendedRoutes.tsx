import { useState } from 'react';
import { ArrowLeft, MapPin, Compass, Clock, TrendingUp } from 'lucide-react';
import type { Location, Screen } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface RecommendedRoutesProps {
  location: Location | null;
  onBack: () => void;
  onNavigate?: (screen: Screen) => void;
}

const mockNearbyLocations = [
  {
    id: '1',
    name: 'Tappiya Falls',
    distance: '2.5 km',
    duration: '45 min walk',
    hiddenScore: 8,
    difficulty: 'Moderate',
    image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=400&q=80',
  },
  {
    id: '2',
    name: 'Bangaan Village',
    distance: '4.0 km',
    duration: '1.5 hours',
    hiddenScore: 9,
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
  },
  {
    id: '3',
    name: 'Mount Amuyao Trail',
    distance: '8.0 km',
    duration: '4 hours',
    hiddenScore: 10,
    difficulty: 'Challenging',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80',
  },
  {
    id: '4',
    name: 'Cambulo Village',
    distance: '3.2 km',
    duration: '1 hour',
    hiddenScore: 7,
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1580652682477-d31f8f31c5b9?w=400&q=80',
  },
];

export function RecommendedRoutes({ location, onBack, onNavigate }: RecommendedRoutesProps) {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [addedToItinerary, setAddedToItinerary] = useState(false);

  if (!location) return null;

  return (
    <div className="size-full bg-background overflow-y-auto pb-20">
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 z-10">
        <button onClick={onBack} className="size-10 flex items-center justify-center">
          <ArrowLeft className="size-5 text-primary" />
        </button>
        <div>
          <h1 className="text-lg text-primary">Recommended Routes</h1>
          <p className="text-xs text-muted-foreground">Based on your location</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-gradient-to-r from-[#3A7CA5] to-[#5FAD56] text-white rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <Compass className="size-6" />
            <h2 className="text-lg">AI-Curated Routes</h2>
          </div>
          <p className="text-sm text-white/90">
            Discover nearby hidden gems and scenic trails from {location.name}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-md">
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="size-5 text-primary" />
            <div>
              <div className="text-sm text-primary">Starting Point</div>
              <div className="text-xs text-muted-foreground">{location.name}</div>
            </div>
          </div>
          <div className="h-32 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <MapPin className="size-8 text-primary mx-auto mb-1" />
              <div className="text-xs text-muted-foreground">You are here</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-primary">Nearby Destinations</h3>
            <button className="text-xs text-[#3A7CA5] flex items-center gap-1">
              <TrendingUp className="size-3" />
              Sort by Hidden Score
            </button>
          </div>

          {mockNearbyLocations.map((route) => {
            const isSelected = selectedRoute === route.id;
            const getDifficultyColor = (difficulty: string) => {
              switch (difficulty) {
                case 'Easy':
                  return 'bg-green-100 text-green-700';
                case 'Moderate':
                  return 'bg-yellow-100 text-yellow-700';
                case 'Challenging':
                  return 'bg-red-100 text-red-700';
                default:
                  return 'bg-gray-100 text-gray-700';
              }
            };

            return (
              <div
                key={route.id}
                onClick={() => setSelectedRoute(route.id)}
                className={`bg-white rounded-2xl overflow-hidden shadow-md border-2 transition-all cursor-pointer ${
                  isSelected ? 'border-[#3A7CA5] ring-2 ring-[#3A7CA5]/20' : 'border-transparent'
                }`}
              >
                <div className="relative h-32">
                  <ImageWithFallback src={route.image} alt={route.name} className="size-full object-cover" />
                  <div className="absolute top-2 right-2 bg-gradient-to-br from-amber-400 to-orange-500 text-white size-12 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white/50">
                    <span className="text-lg">{route.hiddenScore}</span>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-primary mb-1">{route.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="size-3" />
                        {route.distance}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        {route.duration}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs ${getDifficultyColor(route.difficulty)}`}>
                      {route.difficulty}
                    </span>
                    <span className="px-3 py-1 bg-[#3A7CA5]/10 text-[#3A7CA5] rounded-full text-xs">
                      Hidden Gem
                    </span>
                  </div>

                  <button
                    className={`w-full py-2 rounded-lg text-sm transition-colors ${
                      isSelected
                        ? 'bg-[#3A7CA5] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {isSelected ? 'Selected' : 'View Details'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => {
            if (selectedRoute && onNavigate) {
              setAddedToItinerary(true);
              setTimeout(() => {
                onNavigate('optimizer');
              }, 1000);
            }
          }}
          disabled={!selectedRoute || addedToItinerary}
          className={`w-full py-4 rounded-2xl transition-colors ${
            addedToItinerary
              ? 'bg-green-600 text-white'
              : selectedRoute
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {addedToItinerary ? 'Added! Redirecting...' : 'Add to Itinerary'}
        </button>
      </div>
    </div>
  );
}
