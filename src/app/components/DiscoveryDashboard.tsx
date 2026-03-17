import { useState } from 'react';
import { Search, Filter, MapPin, Users, Leaf, Plus } from 'lucide-react';
import type { Screen, Location } from '../App';
import { LocationCard } from './LocationCard';
import { HiddenScoreBadge } from './HiddenScoreBadge';

interface DiscoveryDashboardProps {
  onNavigate: (screen: Screen, location?: Location) => void;
}

const mockLocations: Location[] = [
  {
    id: '1',
    name: 'Batad Rice Terraces',
    province: 'Ifugao',
    hiddenScore: 9,
    ecoHealth: 85,
    crowdDensity: 15,
    image: 'https://images.unsplash.com/photo-1580652682477-d31f8f31c5b9?w=800&q=80',
    tags: ['Heritage', 'Indigenous', 'Farm Tourism'],
    lat: 16.8,
    lng: 121.1,
  },
  {
    id: '2',
    name: 'Calaguas Islands',
    province: 'Camarines Norte',
    hiddenScore: 8,
    ecoHealth: 90,
    crowdDensity: 20,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
    tags: ['Coastal', 'Undiscovered'],
    lat: 14.2,
    lng: 122.6,
  },
  {
    id: '3',
    name: 'Boracay',
    province: 'Aklan',
    hiddenScore: 2,
    ecoHealth: 60,
    crowdDensity: 85,
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80',
    tags: ['Coastal', 'Famous'],
    lat: 11.97,
    lng: 121.93,
  },
  {
    id: '4',
    name: 'Danjugan Island',
    province: 'Negros Occidental',
    hiddenScore: 10,
    ecoHealth: 95,
    crowdDensity: 5,
    image: 'https://images.unsplash.com/photo-1540202404-a2f29016b523?w=800&q=80',
    tags: ['Coastal', 'Undiscovered', 'Eco-Reserve'],
    lat: 10.15,
    lng: 122.5,
  },
];

export function DiscoveryDashboard({ onNavigate }: DiscoveryDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [antigravityMode, setAntigravityMode] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  const filteredLocations = mockLocations.filter((loc) =>
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.province.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="size-full flex flex-col bg-background">
      <div className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#5FAD56]/20 to-[#3A7CA5]/20">
          <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-px opacity-10">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className="bg-primary/20"></div>
            ))}
          </div>

          <svg className="size-full">
            {mockLocations.map((loc) => (
              <circle
                key={loc.id}
                cx={`${(loc.lng - 117) * 15}%`}
                cy={`${(20 - loc.lat) * 8}%`}
                r={loc.hiddenScore > 7 ? '20' : loc.hiddenScore > 4 ? '15' : '10'}
                fill={loc.hiddenScore > 7 ? '#5FAD56' : loc.hiddenScore > 4 ? '#3A7CA5' : '#8B7355'}
                opacity="0.6"
                className="cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => onNavigate('location', loc)}
              />
            ))}
          </svg>
        </div>

        <div className="absolute top-4 left-4 right-4 flex gap-3 z-10">
          <div className="flex-1 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3">
            <Search className="size-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-sm"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`size-12 rounded-2xl shadow-lg flex items-center justify-center transition-colors ${
              showFilters ? 'bg-primary text-white' : 'bg-white hover:bg-gray-50'
            }`}
          >
            <Filter className="size-5" />
          </button>
        </div>

        <div className="absolute top-20 right-4 z-10 space-y-3">
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <HiddenScoreBadge score={8} size="sm" showLabel />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-t-3xl shadow-2xl p-4 space-y-4 max-h-[45%] overflow-y-auto pb-20">
        <div className="flex items-center justify-between mb-2 gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <img src="/logo.png" alt="" className="size-8 shrink-0 object-contain" aria-hidden />
            <h2 className="text-lg text-primary truncate">Discover Hidden Gems</h2>
          </div>
          <button
            onClick={() => setAntigravityMode(!antigravityMode)}
            className={`px-4 py-2 rounded-full text-xs transition-colors ${
              antigravityMode
                ? 'bg-[#3A7CA5] text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {antigravityMode ? '3D View' : '2D View'}
          </button>
        </div>

        {showFilters && (
          <div className="bg-gray-50 rounded-2xl p-4 mb-4 space-y-2">
            <div className="text-sm text-primary font-medium mb-2">Filter by Hidden Score</div>
            <div className="flex gap-2 flex-wrap">
              <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs hover:bg-gray-100">
                All
              </button>
              <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs hover:bg-gray-100">
                Undiscovered (8-10)
              </button>
              <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs hover:bg-gray-100">
                Uncharted (4-7)
              </button>
              <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs hover:bg-gray-100">
                Famous (1-3)
              </button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {filteredLocations.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No locations found matching "{searchQuery}"</p>
            </div>
          ) : (
            filteredLocations.map((location) => (
              <LocationCard
                key={location.id}
                location={location}
                onClick={() => onNavigate('location', location)}
              />
            ))
          )}
        </div>
      </div>

      <button
        onClick={() => onNavigate('scout')}
        className="absolute bottom-24 right-4 size-14 bg-[#3A7CA5] text-white rounded-full shadow-xl flex items-center justify-center hover:bg-[#3A7CA5]/90 transition-colors z-20"
      >
        <Plus className="size-6" />
      </button>
    </div>
  );
}
