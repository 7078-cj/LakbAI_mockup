
import { useState } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import type { Screen } from '../App';

interface ItineraryOptimizerProps {
  onNavigate: (screen: Screen) => void;
  onBack: () => void;
}

const experienceChips = [
  'Indigenous',
  'Coastal',
  'Heritage',
  'Farm Tourism',
  'Mountain',
  'Urban'
];

export function ItineraryOptimizer({ onNavigate, onBack }: ItineraryOptimizerProps) {

  const [budget, setBudget] = useState(15000);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([
    'Coastal',
    'Heritage'
  ]);

  const [avoidCrowded, setAvoidCrowded] = useState(true);

  const toggleExperience = (experience: string) => {
    setSelectedExperiences((prev) =>
      prev.includes(experience)
        ? prev.filter((e) => e !== experience)
        : [...prev, experience]
    );
  };

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleGenerate = () => {
    onNavigate('itinerary');
  };

  return (
    <div className="size-full bg-background overflow-y-auto pb-20">

      {/* HEADER */}

      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 z-10">
        <button
          onClick={onBack}
          className="size-10 flex items-center justify-center"
        >
          <ArrowLeft className="size-5 text-primary" />
        </button>

        <div>
          <h1 className="text-lg text-primary">
            AI Itinerary Optimizer
          </h1>

          <p className="text-xs text-muted-foreground">
            Plan your perfect journey
          </p>
        </div>
      </div>

      <div className="p-6 space-y-6">

        {/* AI CARD */}

        <div className="bg-gradient-to-r from-[#3A7CA5] to-[#5FAD56] text-white rounded-2xl p-5">

          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="size-6" />
            <h2 className="text-lg">
              Smart Planning
            </h2>
          </div>

          <p className="text-sm text-white/90">
            Our AI optimizes your journey to discover hidden gems while
            respecting local communities and the environment.
          </p>

        </div>

        {/* SETTINGS CARD */}

        <div className="bg-white rounded-2xl p-6 shadow-md space-y-6">

          {/* BUDGET */}

          <div className="space-y-3">

            <label className="text-primary">
              Budget (PHP)
            </label>

            <div className="relative">

              <input
                type="range"
                min="5000"
                max="50000"
                step="1000"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />

              <div className="flex justify-between text-sm text-muted-foreground mt-2">

                <span>₱5,000</span>

                <span className="text-primary">
                  ₱{budget.toLocaleString()}
                </span>

                <span>₱50,000</span>

              </div>

            </div>

          </div>

          {/* TRAVEL DATES */}

          <div className="space-y-3">

            <label className="text-primary">
              Travel Dates
            </label>

            <div className="grid grid-cols-2 gap-4">

              <div>

                <div className="text-xs text-muted-foreground mb-1">
                  Start Date
                </div>

                <input
                  type="date"
                  value={startDate}
                  onChange={(e) =>
                    setStartDate(e.target.value)
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                />

              </div>

              <div>

                <div className="text-xs text-muted-foreground mb-1">
                  End Date
                </div>

                <input
                  type="date"
                  value={endDate}
                  onChange={(e) =>
                    setEndDate(e.target.value)
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                />

              </div>

            </div>

            {startDate && endDate && (
              <div className="text-sm text-green-600 mt-2">
                Trip Duration: {calculateDays()} days
              </div>
            )}

          </div>

          {/* EXPERIENCES */}

          <div className="space-y-3">

            <label className="text-primary">
              Experience Preferences
            </label>

            <div className="flex flex-wrap gap-2">

              {experienceChips.map((chip) => (

                <button
                  key={chip}
                  onClick={() => toggleExperience(chip)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    selectedExperiences.includes(chip)
                      ? 'bg-[#3A7CA5] text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {chip}
                </button>

              ))}

            </div>

          </div>

          {/* CROWD TOGGLE */}

          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-primary">
                  Avoid Crowded Areas
                </div>
                <div className="text-xs text-muted-foreground">
                  Prioritize undiscovered destinations
                </div>
              </div>

              <button
                type="button"
                onClick={() => setAvoidCrowded(!avoidCrowded)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 ${
                  avoidCrowded ? 'bg-[#5FAD56]' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform ${
                    avoidCrowded ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

        </div>

        {/* GENERATE BUTTON */}

        <button
          onClick={handleGenerate}
          className="w-full py-4 bg-gradient-to-r from-[#3A7CA5] to-[#5FAD56] text-white rounded-2xl hover:shadow-lg transition-all flex items-center justify-center gap-3"
        >

          <Sparkles className="size-5" />

          <span>
            Generate Smart Itinerary
          </span>

        </button>

      </div>
    </div>
  );
}
