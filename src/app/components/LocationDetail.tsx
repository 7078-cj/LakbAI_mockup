import { ArrowLeft, MapPin, Leaf, Users, Play, Compass } from 'lucide-react';
import type { Screen, Location } from '../App';
import { HiddenScoreBadge } from './HiddenScoreBadge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LocationDetailProps {
  location: Location | null;
  onNavigate: (screen: Screen) => void;
  onBack: () => void;
}

export function LocationDetail({ location, onNavigate, onBack }: LocationDetailProps) {
  if (!location) return null;

  return (
    <div className="size-full bg-background overflow-y-auto pb-20">
      <div className="relative h-64">
        <ImageWithFallback src={location.image} alt={location.name} className="size-full object-cover" />
        <button
          onClick={onBack}
          className="absolute top-4 left-4 size-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
        >
          <ArrowLeft className="size-5 text-primary" />
        </button>
        <div className="absolute bottom-4 right-4">
          <HiddenScoreBadge score={location.hiddenScore} size="lg" />
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl text-primary mb-1">{location.name}</h1>
          <p className="text-muted-foreground flex items-center gap-1.5">
            <MapPin className="size-4" />
            {location.province}
          </p>
        </div>

        <div className="flex gap-3">
          {location.tags.map((tag) => (
            <span key={tag} className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          <div className="flex-1 bg-green-50 rounded-2xl p-4 text-center">
            <Leaf className="size-6 text-green-600 mx-auto mb-2" />
            <div className="text-2xl text-green-600 mb-1">{location.ecoHealth}%</div>
            <div className="text-xs text-green-700">Eco Health</div>
          </div>
          <div className="flex-1 bg-blue-50 rounded-2xl p-4 text-center">
            <Users className="size-6 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl text-blue-600 mb-1">{location.crowdDensity}%</div>
            <div className="text-xs text-blue-700">Crowd Density</div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg text-primary">Journey Options</h2>

          <div className="bg-white rounded-2xl p-5 shadow-md space-y-4 border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="size-12 bg-[#3A7CA5]/10 rounded-full flex items-center justify-center shrink-0">
                <Play className="size-5 text-[#3A7CA5]" />
              </div>
              <div className="flex-1">
                <h3 className="text-primary mb-1">Digital Guide</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Geofenced narration, safety alerts, and folklore stories
                </p>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs mb-3">
                  Free
                </span>
                <button className="w-full py-3 bg-[#3A7CA5] text-white rounded-xl hover:bg-[#3A7CA5]/90 transition-colors">
                  Start Guide
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-md space-y-4 border-2 border-[#5FAD56]">
            <div className="flex items-start gap-4">
              <div className="size-12 bg-[#5FAD56]/10 rounded-full flex items-center justify-center shrink-0">
                <Users className="size-5 text-[#5FAD56]" />
              </div>
              <div className="flex-1">
                <h3 className="text-primary mb-1">Verified Local Guide</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Real guide navigation, oral history, and gear assistance
                </p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block px-3 py-1 bg-[#5FAD56]/20 text-[#5FAD56] rounded-full text-xs">
                    Premium
                  </span>
                  <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs">
                    Direct Community Support
                  </span>
                </div>
                <button
                  onClick={() => onNavigate('stores')}
                  className="w-full py-3 bg-[#5FAD56] text-white rounded-xl hover:bg-[#5FAD56]/90 transition-colors"
                >
                  Book Local Guide
                </button>
              </div>
            </div>
          </div>
        </div>

        {location.hiddenScore >= 8 && (
          <div className="bg-amber-50 border-2 border-amber-400 rounded-2xl p-5">
            <div className="flex items-start gap-4">
              <div className="size-12 bg-amber-500/20 rounded-full flex items-center justify-center shrink-0">
                <span className="text-2xl">🔒</span>
              </div>
              <div className="flex-1">
                <h3 className="text-amber-900 mb-1">Protected Location</h3>
                <p className="text-sm text-amber-800 mb-4">
                  This undiscovered gem requires a digital permit to visit. Secure your time slot to help preserve this location.
                </p>
                <button
                  onClick={() => onNavigate('permit')}
                  className="w-full py-3 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-colors"
                >
                  Secure Digital Permit
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-blue-50 border-2 border-[#3A7CA5] rounded-2xl p-5">
          <div className="flex items-start gap-4">
            <Compass className="size-6 text-[#3A7CA5] shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-[#1E3A34] mb-1">Discover Nearby Routes</h3>
              <p className="text-sm text-[#1E3A34]/80 mb-4">
                Explore AI-recommended routes and hidden gems near this location.
              </p>
              <button
                onClick={() => onNavigate('routes')}
                className="w-full py-3 bg-[#3A7CA5] text-white rounded-xl hover:bg-[#3A7CA5]/90 transition-colors"
              >
                View Recommended Routes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
