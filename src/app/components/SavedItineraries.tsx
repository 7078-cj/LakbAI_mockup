import { ArrowLeft, MapPin, Calendar, TrendingUp, Trash2 } from 'lucide-react';
import type { Screen, SavedTrip } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SavedItinerariesProps {
  savedTrips: SavedTrip[];
  onNavigate: (screen: Screen) => void;
  onBack: () => void;
}

export function SavedItineraries({ savedTrips, onNavigate, onBack }: SavedItinerariesProps) {
  return (
    <div className="size-full bg-background overflow-y-auto pb-20">
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 z-10">
        <button onClick={onBack} className="size-10 flex items-center justify-center">
          <ArrowLeft className="size-5 text-primary" />
        </button>
        <div>
          <h1 className="text-lg text-primary">Saved Itineraries</h1>
          <p className="text-xs text-muted-foreground">{savedTrips.length} saved trips</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-gradient-to-r from-[#1E3A34] to-[#3A7CA5] text-white rounded-2xl p-5">
          <h2 className="text-lg mb-2">Your Travel Plans</h2>
          <p className="text-sm text-white/90">
            Access your saved itineraries anytime. Tap to view details or make edits.
          </p>
        </div>

        {savedTrips.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <div className="size-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <MapPin className="size-10 text-gray-400" />
            </div>
            <div>
              <h3 className="text-lg text-primary mb-2">No saved itineraries yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Start planning your journey and save your itineraries here
              </p>
              <button
                onClick={() => onNavigate('optimizer')}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
              >
                Create Itinerary
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {savedTrips.map((trip) => (
              <div
                key={trip.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => onNavigate('itinerary')}
              >
                <div className="relative h-40">
                  <ImageWithFallback src={trip.image} alt={trip.name} className="size-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-white text-lg mb-1">{trip.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-white/90">
                      <span className="flex items-center gap-1">
                        <MapPin className="size-3" />
                        {trip.destinations} destinations
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3" />
                        {trip.days} days
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Start Date</div>
                      <div className="text-sm text-primary">
                        {new Date(trip.startDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Budget</div>
                      <div className="text-sm text-primary">{trip.budget}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Hidden Score</div>
                      <div className="flex items-center gap-1">
                        <div className="size-8 bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-full flex items-center justify-center text-sm">
                          {trip.avgHiddenScore}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-gray-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('itinerary');
                      }}
                      className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Delete "${trip.name}" itinerary?`)) {
                          // In a real app, this would delete from state/storage
                          alert('Itinerary deleted');
                        }
                      }}
                      className="px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm hover:bg-red-50 transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => onNavigate('optimizer')}
          className="w-full py-4 border-2 border-dashed border-gray-300 text-gray-600 rounded-2xl hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
        >
          <TrendingUp className="size-5" />
          <span>Create New Itinerary</span>
        </button>
      </div>
    </div>
  );
}
