import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Leaf, Users, Plus, Share2, Save, X, Sparkles } from 'lucide-react';
import type { Screen, Location, SavedTrip } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SmartItineraryProps {
  onNavigate: (screen: Screen, location?: Location) => void;
  onSave: (trip: SavedTrip) => void;
  onBack: () => void;
}

const aiRecommendedLocations = [
  {
    id: 'r1',
    name: 'Tappiya Falls',
    hiddenScore: 8,
    ecoHealth: 88,
    crowdDensity: 18,
    distance: '2.5 km',
    image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=400&q=80',
  },
  {
    id: 'r2',
    name: 'Bangaan Village',
    hiddenScore: 9,
    ecoHealth: 90,
    crowdDensity: 12,
    distance: '4.0 km',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
  },
  {
    id: 'r3',
    name: 'Mount Amuyao Trail',
    hiddenScore: 10,
    ecoHealth: 95,
    crowdDensity: 8,
    distance: '8.0 km',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80',
  },
];

const initialItinerary = [
  {
    id: '1',
    name: 'Calaguas Islands',
    hiddenScore: 8,
    ecoHealth: 90,
    crowdDensity: 20,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
    startDate: '',
    endDate: '',
    activities: ['Beach camping', 'Snorkeling'],
    province: 'Camarines Norte',
    tags: ['Coastal', 'Undiscovered'],
    lat: 14.2,
    lng: 122.6,
  },
  {
    id: '2',
    name: 'Danjugan Island',
    hiddenScore: 10,
    ecoHealth: 95,
    crowdDensity: 5,
    image: 'https://images.unsplash.com/photo-1540202404-a2f29016b523?w=800&q=80',
    startDate: '',
    endDate: '',
    activities: ['Wildlife watching', 'Eco-tour'],
    province: 'Negros Occidental',
    tags: ['Coastal', 'Eco-Reserve'],
    lat: 10.15,
    lng: 122.5,
  },
  {
    id: '3',
    name: 'Batad Rice Terraces',
    hiddenScore: 9,
    ecoHealth: 85,
    crowdDensity: 15,
    image: 'https://images.unsplash.com/photo-1580652682477-d31f8f31c5b9?w=800&q=80',
    startDate: '',
    endDate: '',
    activities: ['Trekking', 'Cultural immersion'],
    province: 'Ifugao',
    tags: ['Heritage', 'Indigenous', 'Farm Tourism'],
    lat: 16.8,
    lng: 121.1,
  },
];

export function SmartItinerary({ onNavigate, onSave, onBack }: SmartItineraryProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingStopId, setEditingStopId] = useState<string | null>(null);
  const [itinerary, setItinerary] = useState(initialItinerary);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  /* Auto distribute itinerary after selecting start date */
  useEffect(() => {
    if (!startDate) return;

    setItinerary(prev =>
      prev.map((stop, index) => {
        const start = new Date(startDate);
        start.setDate(start.getDate() + index * 2);

        const end = new Date(start);
        end.setDate(end.getDate() + 1);

        return {
          ...stop,
          startDate: start.toISOString().split('T')[0],
          endDate: end.toISOString().split('T')[0],
        };
      })
    );
  }, [startDate]);

  const handleEditClick = (stopId: string) => {
    setEditingStopId(stopId);
    setShowEditModal(true);
  };

  const handleReplaceLocation = (newLocation: typeof aiRecommendedLocations[0]) => {
    if (!editingStopId) return;

    setItinerary(prev =>
      prev.map(stop =>
        stop.id === editingStopId
          ? {
              ...stop,
              name: newLocation.name,
              hiddenScore: newLocation.hiddenScore,
              ecoHealth: newLocation.ecoHealth,
              crowdDensity: newLocation.crowdDensity,
              image: newLocation.image,
            }
          : stop
      )
    );

    setShowEditModal(false);
    setEditingStopId(null);
  };

  const handleSave = () => {
    const avgHiddenScore =
      itinerary.reduce((sum, stop) => sum + stop.hiddenScore, 0) /
      (itinerary.length || 1);

    const cover = itinerary[0];

    const trip: SavedTrip = {
      id: '', // real id added in App
      name: `${cover?.name ?? 'LakbAI Trip'}`,
      destinations: itinerary.length,
      days: totalDays || itinerary.length * 2,
      avgHiddenScore: Number(avgHiddenScore.toFixed(1)),
      startDate: startDate || new Date().toISOString().split('T')[0],
      image: cover?.image || 'https://images.unsplash.com/photo-1580652682477-d31f8f31c5b9?w=800&q=80',
      budget: '—',
    };

    onSave(trip);

    setShowSaveConfirm(true);

    setTimeout(() => {
      setShowSaveConfirm(false);
      onNavigate('saved');
    }, 1200);
  };

  const formatDateRange = (start: string, end: string) => {
    if (!start || !end) return 'Select dates';

    const s = new Date(start);
    const e = new Date(end);

    const startMonth = s.toLocaleDateString('en-US', { month: 'short' });
    const endMonth = e.toLocaleDateString('en-US', { month: 'short' });

    const startDay = s.getDate();
    const endDay = e.getDate();

    if (startMonth === endMonth) {
      return `${startMonth} ${startDay}-${endDay}`;
    }

    return `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
  };

  const totalDays =
    startDate && endDate
      ? Math.ceil(
          (new Date(endDate).getTime() - new Date(startDate).getTime()) /
            (1000 * 60 * 60 * 24)
        ) + 1
      : 0;

  return (
    <div className="size-full bg-background overflow-y-auto pb-20">

      {/* HEADER */}

      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 z-10">
        <button onClick={onBack} className="size-10 flex items-center justify-center">
          <ArrowLeft className="size-5 text-primary" />
        </button>

        <div className="flex-1">
          <h1 className="text-lg text-primary">Your Smart Itinerary</h1>
          <p className="text-xs text-muted-foreground">
            {totalDays || '--'} days • {itinerary.length} destinations
          </p>
        </div>

        <button className="size-10 flex items-center justify-center hover:bg-gray-100 rounded-full">
          <Share2 className="size-5 text-primary" />
        </button>
      </div>

      <div className="p-6 space-y-6">

        {/* DATE PICKER */}

        <div className="bg-white rounded-2xl p-5 shadow-md">
          <h3 className="text-lg text-primary mb-3">Select Travel Dates</h3>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="text-sm text-muted-foreground">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

          </div>

          {startDate && endDate && (
            <p className="text-sm text-green-600 mt-3">
              Trip Duration: {totalDays} days
            </p>
          )}
        </div>

        {/* ITINERARY */}

        <div className="space-y-4">

          {itinerary.map(stop => (
            <div key={stop.id} className="bg-white rounded-2xl p-5 shadow-md space-y-3">

              {stop.image && (
                <div className="relative h-32 -mx-5 -mt-5 mb-3 overflow-hidden rounded-t-2xl">
                  <ImageWithFallback
                    src={stop.image}
                    alt={stop.name}
                    className="size-full object-cover"
                  />
                </div>
              )}

              <div>
                <h3 className="text-lg text-primary">{stop.name}</h3>

                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="size-4" />
                  {formatDateRange(stop.startDate, stop.endDate)}
                </p>
              </div>

              <div className="flex gap-3">
                <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-xs">
                  Hidden Score {stop.hiddenScore}
                </span>

                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs flex items-center gap-1">
                  <Leaf className="size-3" />
                  {stop.ecoHealth}%
                </span>

                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs flex items-center gap-1">
                  <Users className="size-3" />
                  {stop.crowdDensity}%
                </span>
              </div>

              <div className="flex gap-2">

                <button 
                  onClick={() => {
                    const location: Location = {
                      id: stop.id,
                      name: stop.name,
                      province: stop.province,
                      hiddenScore: stop.hiddenScore,
                      ecoHealth: stop.ecoHealth,
                      crowdDensity: stop.crowdDensity,
                      image: stop.image,
                      tags: stop.tags,
                      lat: stop.lat,
                      lng: stop.lng,
                    };
                    onNavigate('location', location);
                  }}
                  className="flex-1 py-2 bg-primary/10 text-primary rounded-lg text-sm hover:bg-primary/20 transition-colors"
                >
                  View Details
                </button>

                <button
                  onClick={() => handleEditClick(stop.id)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
                >
                  Edit
                </button>

              </div>

            </div>
          ))}

        </div>

        <button
          onClick={() => {
            // Navigate to discovery to add more locations
            onNavigate('discovery');
          }}
          className="w-full py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-2xl hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="size-5" />
          Add Location
        </button>

        {/* SAVE ITINERARY BUTTON */}
        <button
          onClick={handleSave}
          className="w-full py-4 bg-gradient-to-r from-[#1E3A34] to-[#3A7CA5] text-white rounded-2xl hover:shadow-lg transition-all flex items-center justify-center gap-3 font-medium shadow-md"
        >
          <Save className="size-5" />
          <span className="text-lg">Save Itinerary</span>
        </button>

      </div>

      {/* EDIT MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg text-primary">Replace Location</h3>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingStopId(null);
                }}
                className="size-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="size-5 text-gray-600" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Choose a new location to replace this stop in your itinerary.
            </p>
            <div className="space-y-3">
              {aiRecommendedLocations.map((loc) => (
                <div
                  key={loc.id}
                  onClick={() => handleReplaceLocation(loc)}
                  className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-[#3A7CA5] transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <ImageWithFallback src={loc.image} alt={loc.name} className="size-16 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h4 className="text-primary">{loc.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 bg-orange-500 text-white rounded-full text-xs">
                          Score {loc.hiddenScore}
                        </span>
                        <span className="text-xs text-muted-foreground">{loc.distance}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                setShowEditModal(false);
                setEditingStopId(null);
              }}
              className="w-full mt-4 py-2 border border-gray-200 text-primary rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* SAVE CONFIRMATION */}
      {showSaveConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 text-center">
            <div className="size-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Save className="size-8 text-green-600" />
            </div>
            <h3 className="text-xl text-primary">Itinerary Saved!</h3>
          </div>
        </div>
      )}
    </div>
  );
}