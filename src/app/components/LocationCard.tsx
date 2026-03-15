import { MapPin, Users, Leaf } from 'lucide-react';
import type { Location } from '../App';
import { HiddenScoreBadge } from './HiddenScoreBadge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LocationCardProps {
  location: Location;
  onClick: () => void;
}

export function LocationCard({ location, onClick }: LocationCardProps) {
  const getScoreLabel = (score: number) => {
    if (score >= 8) return 'Undiscovered';
    if (score >= 4) return 'Uncharted';
    return 'Famous';
  };

  const getEcoHealthColor = (health: number) => {
    if (health >= 80) return 'text-green-600 bg-green-50';
    if (health >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getCrowdColor = (density: number) => {
    if (density <= 30) return 'text-green-600 bg-green-50';
    if (density <= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer border-2 ${
        location.hiddenScore >= 8
          ? 'border-amber-400 ring-2 ring-amber-400/20'
          : location.hiddenScore <= 3
          ? 'grayscale-[30%] opacity-80'
          : 'border-transparent'
      }`}
    >
      <div className="relative h-32">
        <ImageWithFallback src={location.image} alt={location.name} className="size-full object-cover" />
        <div className="absolute top-2 right-2">
          <HiddenScoreBadge score={location.hiddenScore} size="sm" />
        </div>
        {location.hiddenScore >= 8 && (
          <div className="absolute top-2 left-2 bg-amber-500 text-white px-3 py-1 rounded-full text-xs">
            Protected Gem
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-primary">{location.name}</h3>
          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
            <MapPin className="size-3" />
            {location.province}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1 bg-[#1E3A34]/10 text-[#1E3A34] rounded-full">
            {getScoreLabel(location.hiddenScore)}
          </span>
          {location.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-xs px-3 py-1 bg-[#3A7CA5]/10 text-[#3A7CA5] rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg ${getEcoHealthColor(location.ecoHealth)}`}>
            <Leaf className="size-3.5" />
            <span>Eco {location.ecoHealth}%</span>
          </div>
          <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg ${getCrowdColor(location.crowdDensity)}`}>
            <Users className="size-3.5" />
            <span>Crowd {location.crowdDensity}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
