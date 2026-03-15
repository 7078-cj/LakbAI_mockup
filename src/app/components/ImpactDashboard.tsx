import { ArrowLeft, TrendingUp, MapPin, Award, DollarSign } from 'lucide-react';

interface ImpactDashboardProps {
  onBack: () => void;
}

const visitedBarangays = [
  { name: 'San Isidro', visits: 3, impact: '₱2,400' },
  { name: 'Poblacion', visits: 2, impact: '₱1,800' },
  { name: 'Tagaytay', visits: 1, impact: '₱3,200' },
  { name: 'Central', visits: 2, impact: '₱950' },
];

export function ImpactDashboard({ onBack }: ImpactDashboardProps) {
  return (
    <div className="size-full bg-background overflow-y-auto pb-20">
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 z-10">
        <button onClick={onBack} className="size-10 flex items-center justify-center">
          <ArrowLeft className="size-5 text-primary" />
        </button>
        <div>
          <h1 className="text-lg text-primary">Your Impact</h1>
          <p className="text-xs text-muted-foreground">Regenerative tourism footprint</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-[#3A7CA5] to-[#5FAD56] text-white rounded-2xl p-5 shadow-lg">
            <div className="size-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-3">
              <Award className="size-6" />
            </div>
            <div className="text-3xl mb-1">2,450</div>
            <div className="text-sm text-white/80">Total Points</div>
          </div>

          <div className="bg-gradient-to-br from-[#1E3A34] to-[#2C5648] text-white rounded-2xl p-5 shadow-lg">
            <div className="size-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-3">
              <MapPin className="size-6" />
            </div>
            <div className="text-3xl mb-1">12</div>
            <div className="text-sm text-white/80">Communities</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-primary">Economic Impact</h3>
            <TrendingUp className="size-5 text-green-600" />
          </div>
          <div className="mb-4">
            <div className="text-4xl text-primary mb-1">₱8,350</div>
            <div className="text-sm text-muted-foreground">Injected into local economy</div>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#5FAD56] to-[#3A7CA5] w-3/4"></div>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
            <span>Last month: ₱2,100</span>
            <span className="text-green-600">+297%</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-md">
          <h3 className="text-primary mb-4 flex items-center gap-2">
            <MapPin className="size-5" />
            Barangays Visited
          </h3>
          <div className="space-y-3">
            {visitedBarangays.map((barangay, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="text-sm text-primary mb-1">{barangay.name}</div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#3A7CA5] to-[#5FAD56]"
                      style={{ width: `${(barangay.visits / 3) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm text-primary">{barangay.impact}</div>
                  <div className="text-xs text-muted-foreground">{barangay.visits} visits</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-md">
          <h3 className="text-primary mb-4">Impact Heat Map</h3>
          <div className="aspect-video bg-gradient-to-br from-green-100 via-blue-100 to-amber-100 rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 gap-px">
              {Array.from({ length: 48 }).map((_, i) => {
                const intensity = Math.random();
                return (
                  <div
                    key={i}
                    className="bg-primary/10"
                    style={{ opacity: intensity }}
                  ></div>
                );
              })}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg text-center">
                <div className="text-2xl text-primary mb-1">8 Regions</div>
                <div className="text-sm text-muted-foreground">Impact coverage</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-green-50 border border-green-200 rounded-2xl p-5">
          <div className="flex items-start gap-4">
            <div className="size-12 bg-green-600 rounded-full flex items-center justify-center shrink-0">
              <DollarSign className="size-6 text-white" />
            </div>
            <div>
              <h3 className="text-green-900 mb-1">Keep Making an Impact</h3>
              <p className="text-sm text-green-800 mb-3">
                Your choices support 12 local families and help preserve 3 ecosystems.
              </p>
              <div className="text-xs text-green-700">
                Next milestone: Support 20 communities for a special badge
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
